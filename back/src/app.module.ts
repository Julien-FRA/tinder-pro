import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CandidateModule } from './modules/candidate/candidate.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { RecruiterModule } from './modules/recruiter/recruiter.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { validate } from './config/env.validation';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    PrismaModule,
    JwtModule,
    AuthModule,
    CandidateModule,
    RecruiterModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
