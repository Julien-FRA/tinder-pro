import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove non-whitelisted properties
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
      transform: true, // Automatically transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true, // Enable implicit type conversion
      },
    }),
  );

  // Enable global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Enable global response interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Application démarrée sur http://localhost:${port}`);
  console.log(
    `📚 Documentation Swagger disponible sur http://localhost:${port}/api`,
  );
}
void bootstrap();
