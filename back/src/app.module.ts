import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CandidateModule } from './modules/candidate/candidate.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { RecruiterModule } from './modules/recruiter/recruiter.module';

@Module({
  imports: [PrismaModule, CandidateModule, RecruiterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
