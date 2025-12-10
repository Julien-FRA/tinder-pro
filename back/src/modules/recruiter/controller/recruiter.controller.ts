import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RecruiterService } from '../services/recruiter.service';
import { CreateRecruiterDto } from '../dto/recruiter.dto';

@Controller('recruiters')
export class RecruiterController {
  constructor(private readonly recruiterService: RecruiterService) {}

  @Post('create')
  createRecruiter(@Body() createRecruiterDto: CreateRecruiterDto) {
    return this.recruiterService.createRecruiter(createRecruiterDto);
  }

  @Post('findByEmail')
  findByEmail(@Body('email') email: string) {
    return this.recruiterService.findByEmail(email);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.recruiterService.findById(id);
  }

  @Get('findAll')
  findAll() {
    return this.recruiterService.findAll();
  }
}
