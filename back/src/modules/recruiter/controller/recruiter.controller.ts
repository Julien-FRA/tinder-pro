import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RecruiterService } from '../services/recruiter.service';
import { CreateRecruiterDto } from '../dto/recruiter.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Recruiters')
@Controller('recruiters')
export class RecruiterController {
  constructor(private readonly recruiterService: RecruiterService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Créer un nouveau recruteur' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Recruteur créé avec succès',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email déjà utilisé',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Données de validation invalides',
  })
  createRecruiter(@Body() createRecruiterDto: CreateRecruiterDto) {
    return this.recruiterService.createRecruiter(createRecruiterDto);
  }

  @Post('findByEmail')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Trouver un recruteur par email' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Recruteur trouvé',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Recruteur introuvable',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Email invalide',
  })
  findByEmail(@Body('email') email: string) {
    return this.recruiterService.findByEmail(email);
  }

  @Get()
  @ApiOperation({ summary: 'Obtenir tous les recruteurs' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste des recruteurs',
  })
  findAll() {
    return this.recruiterService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Trouver un recruteur par ID' })
  @ApiParam({ name: 'id', description: 'ID du recruteur (UUID)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Recruteur trouvé',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Recruteur introuvable',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ID invalide',
  })
  findById(@Param('id') id: string) {
    return this.recruiterService.findById(id);
  }
}
