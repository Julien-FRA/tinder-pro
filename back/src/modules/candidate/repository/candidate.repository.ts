import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateCandidateDto } from '../dto/candidate.dto';
import * as bcrypt from 'bcrypt';
import { ConflictException } from 'src/common/exceptions/custom.exception';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class CandidateRepository {
  private readonly logger = new Logger(CandidateRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async createCandidate(createCandidateDto: CreateCandidateDto) {
    try {
      const hashedPassword = await bcrypt.hash(createCandidateDto.password, 12);
      return await this.prisma.candidateUser.create({
        data: {
          firstName: createCandidateDto.firstName,
          lastName: createCandidateDto.lastName,
          email: createCandidateDto.email,
          password: hashedPassword,
          phone: createCandidateDto.phone,
        },
      });
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Error creating candidate: ${err.message}`, err.stack);

      // Handle Prisma unique constraint violation
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email déjà utilisé');
      }

      // Handle bcrypt errors
      if (err.name === 'Error' && err.message.includes('bcrypt')) {
        throw new Error('Erreur lors du hachage du mot de passe');
      }

      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.prisma.candidateUser.findUnique({
        where: { email },
      });
    } catch (error) {
      const err = error as Error;
      this.logger.error(
        `Error finding candidate by email: ${err.message}`,
        err.stack,
      );
      throw error;
    }
  }

  async findById(id: string) {
    try {
      return await this.prisma.candidateUser.findUnique({
        where: { id },
      });
    } catch (error) {
      const err = error as Error;
      this.logger.error(
        `Error finding candidate by ID: ${err.message}`,
        err.stack,
      );
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.candidateUser.findMany();
    } catch (error) {
      const err = error as Error;
      this.logger.error(
        `Error finding all candidates: ${err.message}`,
        err.stack,
      );
      throw error;
    }
  }
}
