import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Session, SessionDocument } from './session.schema';
import { QuestionnaireService } from '../questionnaire/questionnaire.service';
import { ExecutionService } from '../execution/execution.service';
import { StartSessionDto, AnswerQuestionDto } from './dto/session.dto';
import { SessionRepository } from './session.repository';

@Injectable()
export class SessionService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly questionnaireService: QuestionnaireService,
    private readonly executionService: ExecutionService,
  ) {}

  async start(dto: StartSessionDto): Promise<Session> {
    const questionnaire = await this.questionnaireService.findOne(dto.questionnaireId);
    if (questionnaire.questions.length === 0) {
      throw new BadRequestException('Questionnaire has no questions');
    }

    return this.sessionRepository.create({
      userId: dto.userId,
      questionnaireId: dto.questionnaireId,
      currentQuestionId: questionnaire.questions[0].questionId,
      history: [],
      answers: {},
    });
  }

  async submitAnswer(sessionId: string, dto: AnswerQuestionDto): Promise<Session> {
    const session = await this.sessionRepository.findById(sessionId);
    if (!session) throw new NotFoundException('Session not found');
    if (session.isCompleted) throw new BadRequestException('Session already completed');

    const questionnaire = await this.questionnaireService.findOne(session.questionnaireId.toString());
    
    // ... logic remains same but using sessionRepository.save(session)
    const currentQuestion = questionnaire.questions.find(q => q.questionId === session.currentQuestionId);

    // Save answer
    const answerKey = dto.answerKey || session.currentQuestionId;
    
    // Support for loop indexing in answers (e.g., companies[0].name)
    if (session.currentLoop) {
      const idx = session.currentLoop.currentIteration;
      const baseKey = session.currentLoop.loopQuestionId; // e.g. "company_details"
      if (!session.answers[baseKey]) session.answers[baseKey] = [];
      if (!session.answers[baseKey][idx]) session.answers[baseKey][idx] = {};
      session.answers[baseKey][idx][answerKey] = dto.answer;
    } else {
      session.answers[answerKey] = dto.answer;
    }
    
    session.markModified('answers');

    // Add to history
    session.history.push(session.currentQuestionId);

    // Resolve next question
    const nextQuestionId = await this.executionService.resolveNextQuestion(
      session,
      questionnaire,
      session.currentQuestionId,
    );

    if (nextQuestionId) {
      session.currentQuestionId = nextQuestionId;
    } else {
      session.isCompleted = true;
    }

    return this.sessionRepository.save(session);
  }

  async goBack(sessionId: string): Promise<Session> {
    const session = await this.sessionRepository.findById(sessionId);
    if (!session) throw new NotFoundException('Session not found');
    if (session.history.length === 0) throw new BadRequestException('No history to go back to');

    const previousQuestionId = session.history.pop();
    session.currentQuestionId = previousQuestionId;
    session.isCompleted = false;

    return this.sessionRepository.save(session);
  }

  async findOne(id: string): Promise<Session> {
    const session = await this.sessionRepository.findById(id);
    if (!session) throw new NotFoundException('Session not found');
    return session;
  }
}
