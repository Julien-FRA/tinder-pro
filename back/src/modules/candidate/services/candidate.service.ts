import { Injectable } from '@nestjs/common';
import { CandidateRepository } from '../repository/candidate.repository';
import { CandidateResponseDto, CreateCandidateDto } from '../dto/candidate.dto';

@Injectable()
export class CandidateService {
  constructor(private readonly candidateRepository: CandidateRepository) {}

  async createCandidate(
    createCandidateDto: CreateCandidateDto,
  ): Promise<CandidateResponseDto> {
    const candidate =
      await this.candidateRepository.createCandidate(createCandidateDto);
    return new CandidateResponseDto(candidate);
  }

  async findByEmail(email: string) {
    return this.candidateRepository.findByEmail(email);
  }

  async findById(id: string): Promise<CandidateResponseDto | null> {
    const candidate = await this.candidateRepository.findById(id);
    return candidate ? new CandidateResponseDto(candidate) : null;
  }

  async findAll(): Promise<CandidateResponseDto[]> {
    const candidates = await this.candidateRepository.findAll();
    return candidates.map((candidate) => new CandidateResponseDto(candidate));
  }
}
