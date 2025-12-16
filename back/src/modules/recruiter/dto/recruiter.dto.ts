import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRecruiterDto {
  @ApiProperty({ description: "Nom de l'entreprise", example: 'Google' })
  @IsString({
    message: "Le nom de l'entreprise doit être une chaine de caractère.",
  })
  @MinLength(3, {
    message: "Le nom de l'entreprise doit faire au moins 3 caractères.",
  })
  @MaxLength(20, {
    message: "Le nom de l'entreprise doit faire au maximum 20 caractères.",
  })
  enterprise: string;

  @ApiProperty({
    description: 'Nom du recruteur',
    example: 'Doe',
  })
  @IsString({ message: 'Votre nom doit être une chaine de caractère.' })
  @MinLength(3, { message: 'Votre nom doit faire au moins 3 caractères.' })
  @MaxLength(20, { message: 'Votre nom doit faire au maximum 20 caractères.' })
  name: string;

  @ApiProperty({
    description: "Email de l'entreprise",
    example: 'contact@google.com',
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
    description: 'Téléphone du recruteur',
    example: '+33612345678',
    required: false,
  })
  phone: string | null;
}

export class RecruiterResponseDto {
  @ApiProperty({ description: 'ID du recruteur', example: '1' })
  id: string;

  @ApiProperty({ description: "Nom de l'entreprise", example: 'Google' })
  enterprise: string;

  @ApiProperty({ description: 'Nom du recruteur', example: 'Doe' })
  name: string;

  @ApiProperty({
    description: 'Email du recruteur',
    example: 'contact@google.com',
  })
  email: string;

  @ApiProperty({
    description: 'Téléphone du recruteur',
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

  constructor(recruiter: {
    id: string;
    enterprise: string;
    name: string;
    email: string;
    phone?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = recruiter.id;
    this.enterprise = recruiter.enterprise;
    this.name = recruiter.name;
    this.email = recruiter.email;
    this.phone = recruiter.phone;
    this.createdAt = recruiter.createdAt;
    this.updatedAt = recruiter.updatedAt;
  }
}

export class LoginRecruiterDto {
  @ApiProperty({
    description: "Email de l'entreprise",
    example: 'contact@google.com',
  })
  email: string;

  @ApiProperty({
    description: 'Mot de passe',
    example: 'password123',
  })
  password: string;
}
