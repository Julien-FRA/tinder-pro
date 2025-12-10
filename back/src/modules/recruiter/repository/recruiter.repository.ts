import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateRecruiterDto } from '../dto/recruiter.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RecruiterRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createRecruiter(createRecruiterDto: CreateRecruiterDto) {
    const hashedPassword = await bcrypt.hash(createRecruiterDto.password, 12);
    return this.prismaService.recruiterUser.create({
      data: {
        enterprise: createRecruiterDto.enterprise,
        name: createRecruiterDto.name,
        email: createRecruiterDto.email,
        password: hashedPassword,
        phone: createRecruiterDto.phone,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prismaService.recruiterUser.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return this.prismaService.recruiterUser.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return this.prismaService.recruiterUser.findMany();
  }
}
