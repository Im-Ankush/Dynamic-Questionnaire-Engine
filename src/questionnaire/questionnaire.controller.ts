import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QuestionnaireService } from './questionnaire.service';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';

@ApiTags('Questionnaires')
@Controller('questionnaires')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new questionnaire definition' })
  @ApiResponse({ status: 201, description: 'Questionnaire created successfully' })
  async create(@Body() createQuestionnaireDto: CreateQuestionnaireDto) {
    return this.questionnaireService.create(createQuestionnaireDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all active questionnaires' })
  async findAll() {
    return this.questionnaireService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get questionnaire by ID' })
  async findOne(@Param('id') id: string) {
    return this.questionnaireService.findOne(id);
  }
}
