import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CandidateService } from '../services/candidate.service';
import { CreateCandidateDto } from '../dto/candidate.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Candidates')
@Controller('candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Créer un nouveau candidat' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Candidat créé avec succès',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email déjà utilisé',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Données de validation invalides',
  })
  createCandidate(@Body() createCandidateDto: CreateCandidateDto) {
    return this.candidateService.createCandidate(createCandidateDto);
  }

  @Post('findByEmail')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Trouver un candidat par email' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Candidat trouvé',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Candidat introuvable',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Email invalide',
  })
  findByEmail(@Body('email') email: string) {
    return this.candidateService.findByEmail(email);
  }

  @Get()
  @ApiOperation({ summary: 'Obtenir tous les candidats' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste des candidats',
  })
  findAll() {
    return this.candidateService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Trouver un candidat par ID' })
  @ApiParam({ name: 'id', description: 'ID du candidat (UUID)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Candidat trouvé',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Candidat introuvable',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ID invalide',
  })
  findById(@Param('id') id: string) {
    return this.candidateService.findById(id);
  }
}
