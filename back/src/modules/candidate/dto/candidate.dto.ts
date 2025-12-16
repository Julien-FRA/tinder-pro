import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCandidateDto {
  @ApiProperty({ description: 'Prénom du candidat', example: 'John' })
  @IsString({ message: 'Votre nom doit être une chaine de caractère.' })
  @MinLength(3, { message: 'Votre nom doit faire au moins 3 caractères.' })
  @MaxLength(20, { message: 'Votre nom doit faire au maximum 20 caractères.' })
  firstName: string;

  @ApiProperty({ description: 'Nom du candidat', example: 'Doe' })
  @IsString({ message: 'Votre prénom doit être une chaine de caractère.' })
  @MinLength(3, { message: 'Votre prénom doit faire au moins 3 caractères.' })
  @MaxLength(20, {
    message: 'Votre prénom doit faire au maximum 20 caractères.',
  })
  lastName: string;

  @ApiProperty({
    description: 'Email du candidat',
    example: 'john.doe@example.com',
  })
  @IsEmail({}, { message: "L'email doit être une adresse email valide." })
  email: string;

  @ApiProperty({
    description: 'Mot de passe',
    example: 'password123',
    minLength: 3,
  })
  @IsString({
    message: 'Votre mot de passe doit être une chaine de caractère.',
  })
  @MinLength(3, {
    message: 'Votre mot de passe doit faire au moins 3 caractères.',
  })
  @MaxLength(50, {
    message: 'Votre mot de passe doit faire au maximum 50 caractères.',
  })
  password: string;

  @ApiProperty({
    description: 'Téléphone du candidat',
    example: '+33612345678',
    required: false,
  })
  phone?: string | null;
}

export class CandidateResponseDto {
  @ApiProperty({ description: 'ID du candidat', example: '1' })
  id: string;

  @ApiProperty({ description: 'Prénom du candidat', example: 'John' })
  firstName: string;

  @ApiProperty({ description: 'Nom du candidat', example: 'Doe' })
  lastName: string;

  @ApiProperty({
    description: 'Email du candidat',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Téléphone du candidat',
    example: '+33612345678',
    required: false,
  })
  phone?: string | null;

  @ApiProperty({
    description: 'Date de création',
    example: '2025-11-09T20:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date de mise à jour',
    example: '2025-11-09T20:00:00.000Z',
  })
  updatedAt: Date;

  constructor(candidate: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = candidate.id;
    this.firstName = candidate.firstName;
    this.lastName = candidate.lastName;
    this.email = candidate.email;
    this.phone = candidate.phone;
    this.createdAt = candidate.createdAt;
    this.updatedAt = candidate.updatedAt;
  }
}

export class LoginCandidateDto {
  @ApiProperty({
    description: 'Email du candidat',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Mot de passe',
    example: 'password123',
  })
  password: string;
}
