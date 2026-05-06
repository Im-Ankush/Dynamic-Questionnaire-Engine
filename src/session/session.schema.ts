import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ _id: false })
export class LoopState {
  @Prop()
  loopQuestionId: string; // The start of the loop

  @Prop()
  totalIterations: number;

  @Prop()
  currentIteration: number;

  @Prop({ type: [String] })
  loopQuestions: string[];
}

@Schema({ timestamps: true })
export class Session {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: Types.ObjectId, ref: 'Questionnaire', required: true })
  questionnaireId: string;

  @Prop({ required: true })
  currentQuestionId: string;

  @Prop({ type: Object, default: {} })
  answers: Record<string, any>;

  @Prop({ type: [String], default: [] })
  history: string[]; // Stack of question IDs for "back" navigation

  @Prop({ type: LoopState })
  currentLoop?: LoopState;

  @Prop({ default: false })
  isCompleted: boolean;
}

export type SessionDocument = Session & Document;
export const SessionSchema = SchemaFactory.createForClass(Session);
