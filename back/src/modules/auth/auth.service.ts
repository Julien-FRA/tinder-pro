import { Injectable, Logger } from '@nestjs/common';
import { CandidateService } from '../candidate/services/candidate.service';
import { RecruiterService } from '../recruiter/services/recruiter.service';
import { JwtService } from '@nestjs/jwt';
import {
  CandidateResponseDto,
  CreateCandidateDto,
  LoginCandidateDto,
} from '../candidate/dto/candidate.dto';
import {
  CreateRecruiterDto,
  LoginRecruiterDto,
  RecruiterResponseDto,
} from '../recruiter/dto/recruiter.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/types/jwt.type';
import {
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from 'src/common/exceptions/custom.exception';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly candidateService: CandidateService,
    private readonly recruiterService: RecruiterService,
    private readonly jwtService: JwtService,
  ) {}

  async signupCandidate(createCandidateDto: CreateCandidateDto) {
    try {
      // Check if email already exists - this will throw NotFoundException if not found
      const existingCandidate = await this.candidateService.findByEmail(
        createCandidateDto.email,
      );
      if (existingCandidate) {
        throw new ConflictException('Email déjà utilisé');
      }
    } catch (error) {
      // If NotFoundException, it means email doesn't exist - proceed with signup
      if (!(error instanceof NotFoundException)) {
        throw error;
      }
    }

    const candidate =
      await this.candidateService.createCandidate(createCandidateDto);
    return this.generateToken(candidate);
  }

  async signupRecruiter(createRecruiterDto: CreateRecruiterDto) {
    try {
      // Check if email already exists - this will throw NotFoundException if not found
      const existingRecruiter = await this.recruiterService.findByEmail(
        createRecruiterDto.email,
      );
      if (existingRecruiter) {
        throw new ConflictException('Email déjà utilisé');
      }
    } catch (error) {
      // If NotFoundException, it means email doesn't exist - proceed with signup
      if (!(error instanceof NotFoundException)) {
        throw error;
      }
    }

    const recruiter =
      await this.recruiterService.createRecruiter(createRecruiterDto);
    return this.generateToken(recruiter);
  }

  async loginCandidate(loginCandidateDto: LoginCandidateDto) {
    try {
      const candidate = await this.candidateService.findByEmail(
        loginCandidateDto.email,
      );

      const isPasswordValid = await bcrypt.compare(
        loginCandidateDto.password,
        candidate.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Email ou mot de passe incorrect');
      }

      return this.generateToken(new CandidateResponseDto(candidate));
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException('Email ou mot de passe incorrect');
      }
      throw error;
    }
  }

  async loginRecruiter(loginRecruiterDto: LoginRecruiterDto) {
    try {
      const recruiter = await this.recruiterService.findByEmail(
        loginRecruiterDto.email,
      );

      const isPasswordValid = await bcrypt.compare(
        loginRecruiterDto.password,
        recruiter.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Email ou mot de passe incorrect');
      }

      return this.generateToken(new RecruiterResponseDto(recruiter));
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException('Email ou mot de passe incorrect');
      }
      throw error;
    }
  }

  private generateToken(user: CandidateResponseDto | RecruiterResponseDto) {
    try {
      const payload: JwtPayload = {
        sub: user.id,
        email: user.email,
      };
      return {
        access_token: this.jwtService.sign(payload),
        user,
      };
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Error generating JWT token: ${err.message}`);
      throw new Error('Erreur lors de la génération du token');
    }
  }
}
