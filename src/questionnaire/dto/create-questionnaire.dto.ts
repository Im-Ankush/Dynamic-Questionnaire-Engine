import { IsString, IsEnum, IsArray, IsOptional, IsNumber, ValidateNested, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { RuleOperator, QuestionType } from '../../common/constants/enums';

class SkipLogicDto {
  @ApiProperty() @IsString() field: string;
  @ApiProperty({ enum: RuleOperator }) @IsEnum(RuleOperator) operator: RuleOperator;
  @ApiProperty() @IsOptional() value: any;
  @ApiProperty() @IsString() jumpToQuestionId: string;
}

class LoopConfigDto {
  @ApiProperty() @IsBoolean() enabled: boolean;
  @ApiProperty() @IsOptional() @IsString() loopField?: string;
  @ApiProperty({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true }) loopQuestions?: string[];
}

export class QuestionDto {
  @ApiProperty() @IsString() questionId: string;
  @ApiProperty() @IsString() title: string;
  @ApiProperty({ enum: QuestionType }) 
  @IsEnum(QuestionType) type: QuestionType;
  @ApiProperty({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true }) options?: string[];
  @ApiProperty() @IsNumber() order: number;
  @ApiProperty({ type: SkipLogicDto }) @IsOptional() @ValidateNested() @Type(() => SkipLogicDto) skipLogic?: SkipLogicDto;
  @ApiProperty() @IsOptional() @IsString() nextQuestionId?: string;
  @ApiProperty({ type: LoopConfigDto }) @IsOptional() @ValidateNested() @Type(() => LoopConfigDto) loop?: LoopConfigDto;
}

export class CreateQuestionnaireDto {
  @ApiProperty() @IsString() title: string;
  @ApiProperty() @IsOptional() @IsString() description?: string;
  @ApiProperty({ type: [QuestionDto] }) @IsArray() @ValidateNested({ each: true }) @Type(() => QuestionDto) questions: QuestionDto[];
}
