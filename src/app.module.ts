import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { SessionModule } from './session/session.module';
import { RuleEngineModule } from './rule-engine/rule-engine.module';
import { ExecutionModule } from './execution/execution.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    QuestionnaireModule,
    SessionModule,
    RuleEngineModule,
    ExecutionModule,
  ],
})
export class AppModule {}
