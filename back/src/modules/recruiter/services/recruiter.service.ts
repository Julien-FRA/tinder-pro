import { Injectable } from '@nestjs/common';
import { RecruiterRepository } from '../repository/recruiter.repository';
import { CreateRecruiterDto, RecruiterResponseDto } from '../dto/recruiter.dto';

@Injectable()
export class RecruiterService {
  constructor(private readonly recruiterRepository: RecruiterRepository) {}

  async createRecruiter(
    createRecruiterDto: CreateRecruiterDto,
  ): Promise<RecruiterResponseDto> {
    const recruiter =
      await this.recruiterRepository.createRecruiter(createRecruiterDto);
    return new RecruiterResponseDto(recruiter);
  }

  async findByEmail(email: string) {
    return this.recruiterRepository.findByEmail(email);
  }

  async findById(id: string): Promise<RecruiterResponseDto | null> {
    const recruiter = await this.recruiterRepository.findById(id);
    return recruiter ? new RecruiterResponseDto(recruiter) : null;
  }

  async findAll(): Promise<RecruiterResponseDto[]> {
    const recruiters = await this.recruiterRepository.findAll();
    return recruiters.map((recruiter) => new RecruiterResponseDto(recruiter));
  }
}
