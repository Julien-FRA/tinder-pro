import { Injectable, UnauthorizedException } from '@nestjs/common';
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

@Injectable()
export class AuthService {
  constructor(
    private readonly candidateService: CandidateService,
    private readonly recruiterService: RecruiterService,
    private readonly jwtService: JwtService,
  ) {}

  async signupCandidate(createCandidateDto: CreateCandidateDto) {
    const existingCandidate = await this.candidateService.findByEmail(
      createCandidateDto.email,
    );
    if (existingCandidate) {
      throw new UnauthorizedException('Email déjà utilisé');
    }

    const candidate =
      await this.candidateService.createCandidate(createCandidateDto);
    return this.generateToken(candidate, 'candidate');
  }

  async signupRecruiter(createRecruiterDto: CreateRecruiterDto) {
    const existingRecruiter = await this.recruiterService.findByEmail(
      createRecruiterDto.email,
    );
    if (existingRecruiter) {
      throw new UnauthorizedException('Email déjà utilisé');
    }

    const recruiter =
      await this.recruiterService.createRecruiter(createRecruiterDto);
    return this.generateToken(recruiter, 'recruiter');
  }

  async loginCandidate(loginCandidateDto: LoginCandidateDto) {
    const candidate = await this.candidateService.findByEmail(
      loginCandidateDto.email,
    );
    if (
      !candidate ||
      !(await bcrypt.compare(loginCandidateDto.password, candidate.password))
    ) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    return this.generateToken(candidate, 'candidate');
  }

  async loginRecruiter(loginRecruiterDto: LoginRecruiterDto) {
    const recruiter = await this.recruiterService.findByEmail(
      loginRecruiterDto.email,
    );
    if (
      !recruiter ||
      !(await bcrypt.compare(loginRecruiterDto.password, recruiter.password))
    ) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    return this.generateToken(recruiter, 'recruiter');
  }

  private generateToken(
    user: CandidateResponseDto | RecruiterResponseDto,
    role: 'candidate' | 'recruiter',
  ) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
