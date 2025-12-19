import { Injectable, NotFoundException } from '@nestjs/common';
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
    const recruiter = await this.recruiterRepository.findByEmail(email);

    if (!recruiter) {
      throw new NotFoundException('Recruteur non trouvé');
    }

    return recruiter;
  }

  async findById(id: string): Promise<RecruiterResponseDto | null> {
    const recruiter = await this.recruiterRepository.findById(id);

    if (!recruiter) {
      throw new NotFoundException('Recruteur non trouvé');
    }

    return new RecruiterResponseDto(recruiter);
  }

  async findAll(): Promise<RecruiterResponseDto[]> {
    const recruiters = await this.recruiterRepository.findAll();

    if (!recruiters || recruiters.length === 0) {
      throw new NotFoundException('Aucun recruteur trouvé');
    }

    return recruiters.map((recruiter) => new RecruiterResponseDto(recruiter));
  }
}
