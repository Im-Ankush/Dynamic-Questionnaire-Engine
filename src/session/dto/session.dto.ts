import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StartSessionDto {
  @ApiProperty() @IsString() @IsNotEmpty() userId: string;
  @ApiProperty() @IsString() @IsNotEmpty() questionnaireId: string;
}

export class AnswerQuestionDto {
  @ApiProperty() @IsNotEmpty() answer: any;
  @ApiProperty() @IsOptional() @IsString() answerKey?: string; // Optional key to store answer under (defaults to questionId)
}
