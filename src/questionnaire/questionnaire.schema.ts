import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Question, QuestionSchema } from './question.schema';

@Schema({ timestamps: true })
export class Questionnaire {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: [QuestionSchema], default: [] })
  questions: Question[];

  @Prop({ default: true })
  isActive: boolean;
}

export type QuestionnaireDocument = Questionnaire & Document;
export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);
