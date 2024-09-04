import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('encounters')
@ApiTags('encounters')
export class EncountersController {
  @Get()
  getAllEncounters(): string {
    return 'This action returns all encounters';
  }

  @Post()
  createEncounter(): string {
    return 'This action creates a new encounter';
  }

  @Get(':id')
  getEncounter(@Param('id') id: string): string {
    return `This action returns an encounter with id ${id}`;
  }

  @Put(':id')
  updateEncounter(@Param('id') id: string): string {
    return `This action updates an encounter with id ${id}`;
  }

  @Delete(':id')
  deleteEncounter(@Param('id') id: string): string {
    return `This action deletes an encounter with id ${id}`;
  }
}
