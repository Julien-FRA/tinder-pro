import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateCandidateDto,
  LoginCandidateDto,
} from '../candidate/dto/candidate.dto';
import {
  CreateRecruiterDto,
  LoginRecruiterDto,
} from '../recruiter/dto/recruiter.dto';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup/candidate')
  @ApiOperation({ summary: 'Inscription candidat' })
  @ApiResponse({ status: 201, description: 'Candidat inscrit avec succès.' })
  @ApiResponse({ status: 400, description: 'Email déjà utilisé.' })
  @ApiResponse({ status: 500, description: 'Erreur serveur.' })
  async signupCandidate(@Body() createCandidateDto: CreateCandidateDto) {
    return this.authService.signupCandidate(createCandidateDto);
  }

  @Public()
  @Post('signup/recruiter')
  @ApiOperation({ summary: 'Inscription recruteur' })
  @ApiResponse({ status: 201, description: 'Recruteur inscrit avec succès.' })
  @ApiResponse({ status: 400, description: 'Email déjà utilisé.' })
  @ApiResponse({ status: 500, description: 'Erreur serveur.' })
  async signupRecruiter(@Body() createRecruiterDto: CreateRecruiterDto) {
    return this.authService.signupRecruiter(createRecruiterDto);
  }

  @Public()
  @Post('login/candidate')
  @ApiOperation({ summary: 'Connexion candidat' })
  @ApiResponse({ status: 200, description: 'Candidat connecté avec succès.' })
  @ApiResponse({ status: 400, description: 'Email ou mot de passe incorrect.' })
  @ApiResponse({ status: 500, description: 'Erreur serveur.' })
  async loginCandidate(@Body() loginCandidateDto: LoginCandidateDto) {
    return this.authService.loginCandidate(loginCandidateDto);
  }

  @Public()
  @Post('login/recruiter')
  @ApiOperation({ summary: 'Connexion recruteur' })
  @ApiResponse({ status: 200, description: 'Recruteur connecté avec succès.' })
  @ApiResponse({ status: 400, description: 'Email ou mot de passe incorrect.' })
  @ApiResponse({ status: 500, description: 'Erreur serveur.' })
  async loginRecruiter(@Body() loginRecruiterDto: LoginRecruiterDto) {
    return this.authService.loginRecruiter(loginRecruiterDto);
  }
}
