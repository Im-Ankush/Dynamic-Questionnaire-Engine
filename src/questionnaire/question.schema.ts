import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RuleOperator, QuestionType } from '../common/constants/enums';

@Schema({ _id: false })
class SkipLogic {
  @Prop({ required: true })
  field: string;

  @Prop({ required: true, enum: RuleOperator })
  operator: RuleOperator;

  @Prop({ required: true, type: Object })
  value: any;

  @Prop({ required: true })
  jumpToQuestionId: string;
}

@Schema({ _id: false })
export class LoopConfig {
  @Prop({ default: false })
  enabled: boolean;

  @Prop()
  loopField: string; // The field in context that determines how many times to loop (e.g., "company_count")

  @Prop({ type: [String] })
  loopQuestions: string[]; // List of question IDs that form the loop body
}

@Schema()
export class Question {
  @Prop({ required: true, unique: true })
  questionId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, enum: QuestionType })
  type: QuestionType;

  @Prop({ type: [String] })
  options: string[];

  @Prop({ required: true })
  order: number;

  @Prop({ type: SkipLogic })
  skipLogic?: SkipLogic;

  @Prop()
  nextQuestionId?: string;

  @Prop({ type: LoopConfig })
  loop?: LoopConfig;
}

export type QuestionDocument = Question & Document;
export const QuestionSchema = SchemaFactory.createForClass(Question);
