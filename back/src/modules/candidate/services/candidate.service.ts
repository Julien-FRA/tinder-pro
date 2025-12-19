import { Injectable } from '@nestjs/common';
import { CandidateRepository } from '../repository/candidate.repository';
import { CandidateResponseDto, CreateCandidateDto } from '../dto/candidate.dto';
import { NotFoundException } from 'src/common/exceptions/custom.exception';
import {
  validateUUID,
  validateEmail,
} from 'src/common/validators/id.validator';

@Injectable()
export class CandidateService {
  constructor(private readonly candidateRepository: CandidateRepository) {}

  async createCandidate(
    createCandidateDto: CreateCandidateDto,
  ): Promise<CandidateResponseDto> {
    // Validate email format
    validateEmail(createCandidateDto.email);

    const candidate =
      await this.candidateRepository.createCandidate(createCandidateDto);
    return new CandidateResponseDto(candidate);
  }

  async findByEmail(email: string) {
    // Validate email format
    validateEmail(email);

    const candidate = await this.candidateRepository.findByEmail(email);

    if (!candidate) {
      throw new NotFoundException('Candidat', email);
    }

    return candidate;
  }

  async findById(id: string): Promise<CandidateResponseDto> {
    // Validate UUID format
    validateUUID(id, 'ID du candidat');

    const candidate = await this.candidateRepository.findById(id);

    if (!candidate) {
      throw new NotFoundException('Candidat', id);
    }

    return new CandidateResponseDto(candidate);
  }

  async findAll(): Promise<CandidateResponseDto[]> {
    const candidates = await this.candidateRepository.findAll();
    return candidates.map((candidate) => new CandidateResponseDto(candidate));
  }
}
