import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CandidateService } from '../services/candidate.service';
import { CreateCandidateDto } from '../dto/candidate.dto';

@Controller('candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post('create')
  createCandidate(@Body() createCandidateDto: CreateCandidateDto) {
    return this.candidateService.createCandidate(createCandidateDto);
  }

  @Post('findByEmail')
  findByEmail(@Body('email') email: string) {
    return this.candidateService.findByEmail(email);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.candidateService.findById(id);
  }

  @Get('findAll')
  findAll() {
    return this.candidateService.findAll();
  }
}
