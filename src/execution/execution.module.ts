import { Module } from '@nestjs/common';
import { ExecutionService } from './execution.service';
import { QuestionnaireModule } from '../questionnaire/questionnaire.module';

@Module({
  imports: [QuestionnaireModule],
  providers: [ExecutionService],
  exports: [ExecutionService],
})
export class ExecutionModule {}
