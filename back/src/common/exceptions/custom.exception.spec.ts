import { HttpStatus } from '@nestjs/common';
import {
  CustomException,
  NotFoundException,
  ConflictException,
  BadRequestException,
  UnauthorizedException,
} from './custom.exception';

describe('CustomException', () => {
  describe('CustomException', () => {
    it('should create a custom exception with message and status code', () => {
      const exception = new CustomException(
        'Test error',
        HttpStatus.BAD_REQUEST,
      );
      expect(exception.message).toBe('Test error');
      expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('NotFoundException', () => {
    it('should create a not found exception with resource name and ID', () => {
      const exception = new NotFoundException('Candidat', '123');
      expect(exception.message).toBe("Candidat avec l'ID 123 introuvable");
      expect(exception.getStatus()).toBe(HttpStatus.NOT_FOUND);
    });

    it('should create a not found exception with only resource name', () => {
      const exception = new NotFoundException('Candidat');
      expect(exception.message).toBe('Candidat introuvable');
      expect(exception.getStatus()).toBe(HttpStatus.NOT_FOUND);
    });
  });

  describe('ConflictException', () => {
    it('should create a conflict exception', () => {
      const exception = new ConflictException('Email déjà utilisé');
      expect(exception.message).toBe('Email déjà utilisé');
      expect(exception.getStatus()).toBe(HttpStatus.CONFLICT);
    });
  });

  describe('BadRequestException', () => {
    it('should create a bad request exception', () => {
      const exception = new BadRequestException('Invalid input');
      expect(exception.message).toBe('Invalid input');
      expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('UnauthorizedException', () => {
    it('should create an unauthorized exception with custom message', () => {
      const exception = new UnauthorizedException('Invalid credentials');
      expect(exception.message).toBe('Invalid credentials');
      expect(exception.getStatus()).toBe(HttpStatus.UNAUTHORIZED);
    });

    it('should create an unauthorized exception with default message', () => {
      const exception = new UnauthorizedException();
      expect(exception.message).toBe('Non autorisé');
      expect(exception.getStatus()).toBe(HttpStatus.UNAUTHORIZED);
    });
  });
});
