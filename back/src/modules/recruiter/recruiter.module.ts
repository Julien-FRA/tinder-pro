import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { RecruiterController } from './controller/recruiter.controller';
import { RecruiterService } from './services/recruiter.service';
import { RecruiterRepository } from './repository/recruiter.repository';

@Module({
  imports: [PrismaModule],
  controllers: [RecruiterController],
  providers: [RecruiterService, RecruiterRepository],
  exports: [RecruiterService],
})
export class RecruiterModule {}
