import { Injectable, NotFoundException } from '@nestjs/common';
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
    const candidate = await this.candidateRepository.findByEmail(email);

    if (!candidate) {
      throw new NotFoundException('Candidat non trouvé');
    }

    return candidate;
  }

  async findById(id: string): Promise<CandidateResponseDto | null> {
    const candidate = await this.candidateRepository.findById(id);

    if (!candidate) {
      throw new NotFoundException('Candidat non trouvé');
    }

    return new CandidateResponseDto(candidate);
  }

  async findAll(): Promise<CandidateResponseDto[]> {
    const candidates = await this.candidateRepository.findAll();

    if (!candidates || candidates.length === 0) {
      throw new NotFoundException('Aucun candidat trouvé');
    }

    return candidates.map((candidate) => new CandidateResponseDto(candidate));
  }
}
