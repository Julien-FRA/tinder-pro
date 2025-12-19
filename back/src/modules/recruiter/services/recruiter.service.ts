import { Injectable } from '@nestjs/common';
import { RecruiterRepository } from '../repository/recruiter.repository';
import { CreateRecruiterDto, RecruiterResponseDto } from '../dto/recruiter.dto';
import { NotFoundException } from 'src/common/exceptions/custom.exception';
import {
  validateUUID,
  validateEmail,
} from 'src/common/validators/id.validator';

@Injectable()
export class RecruiterService {
  constructor(private readonly recruiterRepository: RecruiterRepository) {}

  async createRecruiter(
    createRecruiterDto: CreateRecruiterDto,
  ): Promise<RecruiterResponseDto> {
    // Validate email format
    validateEmail(createRecruiterDto.email);

    const recruiter =
      await this.recruiterRepository.createRecruiter(createRecruiterDto);
    return new RecruiterResponseDto(recruiter);
  }

  async findByEmail(email: string) {
    // Validate email format
    validateEmail(email);

    const recruiter = await this.recruiterRepository.findByEmail(email);

    if (!recruiter) {
      throw new NotFoundException('Recruteur', email);
    }

    return recruiter;
  }

  async findById(id: string): Promise<RecruiterResponseDto> {
    // Validate UUID format
    validateUUID(id, 'ID du recruteur');

    const recruiter = await this.recruiterRepository.findById(id);

    if (!recruiter) {
      throw new NotFoundException('Recruteur', id);
    }

    return new RecruiterResponseDto(recruiter);
  }

  async findAll(): Promise<RecruiterResponseDto[]> {
    const recruiters = await this.recruiterRepository.findAll();
    return recruiters.map((recruiter) => new RecruiterResponseDto(recruiter));
  }
}
