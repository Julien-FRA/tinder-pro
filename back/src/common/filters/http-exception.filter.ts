import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '../../generated/prisma/client';

/**
 * Global exception filter to handle all types of errors
 * Provides standardized error responses with appropriate HTTP status codes
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Erreur interne du serveur';
    let error = 'Internal Server Error';

    // Handle HTTP exceptions (including our custom exceptions)
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const response = exceptionResponse as Record<string, unknown>;
        message = (response.message as string | string[]) || message;
        error = (response.error as string) || error;
      }
    }
    // Handle Prisma errors
    else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = this.handlePrismaError(exception);
      status = prismaError.status;
      message = prismaError.message;
      error = prismaError.error;
    }
    // Handle validation errors from Prisma
    else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Erreur de validation des données';
      error = 'Bad Request';
    }
    // Handle generic errors
    else if (exception instanceof Error) {
      message = exception.message || message;
      this.logger.error(
        `Unexpected error: ${exception.message}`,
        exception.stack,
      );
    }

    // Log the error for debugging
    const messageStr = Array.isArray(message) ? message.join(', ') : message;
    this.logger.error(
      `${request.method} ${request.url} - Status: ${status} - Message: ${messageStr}`,
    );

    // Send standardized error response
    response.status(status).json({
      statusCode: status,
      message,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  /**
   * Handle Prisma-specific errors and convert them to appropriate HTTP errors
   */
  private handlePrismaError(exception: Prisma.PrismaClientKnownRequestError): {
    status: number;
    message: string;
    error: string;
  } {
    switch (exception.code) {
      case 'P2002': {
        // Unique constraint violation
        const target = (exception.meta?.target as string[]) || [];
        const field = target[0] || 'champ';
        return {
          status: HttpStatus.CONFLICT,
          message: `${field} déjà utilisé`,
          error: 'Conflict',
        };
      }
      case 'P2025': {
        // Record not found
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Ressource introuvable',
          error: 'Not Found',
        };
      }
      case 'P2003': {
        // Foreign key constraint failed
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Référence invalide',
          error: 'Bad Request',
        };
      }
      case 'P2014': {
        // Required relation violation
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Relation requise manquante',
          error: 'Bad Request',
        };
      }
      default: {
        this.logger.error(`Unhandled Prisma error code: ${exception.code}`);
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Erreur de base de données',
          error: 'Internal Server Error',
        };
      }
    }
  }
}
