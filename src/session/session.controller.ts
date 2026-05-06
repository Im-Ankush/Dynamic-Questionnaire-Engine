import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SessionService } from './session.service';
import { StartSessionDto, AnswerQuestionDto } from './dto/session.dto';

@ApiTags('Sessions')
@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('start')
  @ApiOperation({ summary: 'Start a new questionnaire session' })
  async start(@Body() startSessionDto: StartSessionDto) {
    return this.sessionService.start(startSessionDto);
  }

  @Post(':id/answer')
  @ApiOperation({ summary: 'Submit an answer and get next question' })
  async submitAnswer(
    @Param('id') id: string,
    @Body() answerQuestionDto: AnswerQuestionDto,
  ) {
    return this.sessionService.submitAnswer(id, answerQuestionDto);
  }

  @Post(':id/back')
  @ApiOperation({ summary: 'Navigate back to the previous question' })
  async goBack(@Param('id') id: string) {
    return this.sessionService.goBack(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get current session state' })
  async findOne(@Param('id') id: string) {
    return this.sessionService.findOne(id);
  }
}
