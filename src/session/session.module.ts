import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { Session, SessionSchema } from './session.schema';
import { QuestionnaireModule } from '../questionnaire/questionnaire.module';
import { ExecutionModule } from '../execution/execution.module';
import { SessionRepository } from './session.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
    QuestionnaireModule,
    ExecutionModule,
  ],
  controllers: [SessionController],
  providers: [SessionService, SessionRepository],
})
export class SessionModule {}
