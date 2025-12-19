import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';
import { ResponseInterceptor } from '../src/common/interceptors/response.interceptor';

interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp: string;
  path: string;
}

describe('Error Handling (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Apply the same global pipes and filters as in main.ts
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new ResponseInterceptor());

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Validation Errors', () => {
    it('should return 400 for missing required fields', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/signup/candidate')
        .send({
          email: 'test@example.com',
          // Missing required fields
        })
        .expect(400);

      expect(response.body).toHaveProperty('statusCode', 400);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('path');
    });

    it('should return 400 for invalid email format', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/signup/candidate')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'invalid-email', // Invalid email
          password: 'password123',
        })
        .expect(400);

      const body = response.body as ErrorResponse;
      expect(body).toHaveProperty('statusCode', 400);
      const message = Array.isArray(body.message)
        ? body.message.join(' ')
        : body.message;
      expect(message).toContain('email');
    });

    it('should return 400 for invalid UUID', async () => {
      const response = await request(app.getHttpServer())
        .get('/candidates/invalid-uuid')
        .expect(400);

      const body = response.body as ErrorResponse;
      expect(body).toHaveProperty('statusCode', 400);
      expect(body.message).toContain('invalide');
    });
  });

  describe('Not Found Errors', () => {
    it('should return 404 for non-existent candidate', async () => {
      const validUUID = '123e4567-e89b-12d3-a456-426614174000';
      const response = await request(app.getHttpServer())
        .get(`/candidates/${validUUID}`)
        .expect(404);

      const body = response.body as ErrorResponse;
      expect(body).toHaveProperty('statusCode', 404);
      expect(body.message).toContain('introuvable');
    });
  });

  describe('Response Format', () => {
    it('should have consistent error response format', async () => {
      const response = await request(app.getHttpServer())
        .get('/candidates/invalid-uuid')
        .expect(400);

      const body = response.body as ErrorResponse;
      // Check that all required fields are present
      expect(body).toHaveProperty('statusCode');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('error');
      expect(body).toHaveProperty('timestamp');
      expect(body).toHaveProperty('path');

      // Check timestamp format
      expect(new Date(body.timestamp).toISOString()).toBe(body.timestamp);
    });
  });
});
