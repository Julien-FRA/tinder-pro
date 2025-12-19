import { BadRequestException } from '../exceptions/custom.exception';
import { validateUUID, validateEmail } from './id.validator';

describe('ID Validator', () => {
  describe('validateUUID', () => {
    it('should pass for valid UUID', () => {
      const validUUID = '123e4567-e89b-12d3-a456-426614174000';
      expect(() => validateUUID(validUUID, 'Test ID')).not.toThrow();
    });

    it('should throw BadRequestException for invalid UUID', () => {
      const invalidUUID = 'invalid-uuid';
      expect(() => validateUUID(invalidUUID, 'Test ID')).toThrow(BadRequestException);
    });

    it('should throw BadRequestException for empty string', () => {
      expect(() => validateUUID('', 'Test ID')).toThrow(BadRequestException);
    });

    it('should use default resource name in error message', () => {
      try {
        validateUUID('invalid-uuid');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toContain('ID invalide');
      }
    });
  });

  describe('validateEmail', () => {
    it('should pass for valid email', () => {
      const validEmail = 'test@example.com';
      expect(() => validateEmail(validEmail)).not.toThrow();
    });

    it('should throw BadRequestException for invalid email', () => {
      const invalidEmail = 'invalid-email';
      expect(() => validateEmail(invalidEmail)).toThrow(BadRequestException);
    });

    it('should throw BadRequestException for email without @', () => {
      const invalidEmail = 'testexample.com';
      expect(() => validateEmail(invalidEmail)).toThrow(BadRequestException);
    });

    it('should throw BadRequestException for email without domain', () => {
      const invalidEmail = 'test@';
      expect(() => validateEmail(invalidEmail)).toThrow(BadRequestException);
    });

    it('should throw BadRequestException for empty string', () => {
      expect(() => validateEmail('')).toThrow(BadRequestException);
    });

    it('should have correct error message', () => {
      try {
        validateEmail('invalid-email');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe('Adresse email invalide');
      }
    });
  });
});
