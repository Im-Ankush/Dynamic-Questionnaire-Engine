import { Injectable, BadRequestException } from '@nestjs/common';
import { QuestionnaireService } from '../questionnaire/questionnaire.service';
import { RuleEngineService } from '../rule-engine/rule-engine.service';
import { SessionDocument } from '../session/session.schema';
import { Questionnaire } from '../questionnaire/questionnaire.schema';

@Injectable()
export class ExecutionService {
  constructor(
    private readonly questionnaireService: QuestionnaireService,
    private readonly ruleEngineService: RuleEngineService,
  ) {}

  /**
   * Resolves the next question based on current state and rules.
   */
  async resolveNextQuestion(
    session: SessionDocument,
    questionnaire: Questionnaire,
    currentQuestionId: string,
  ): Promise<string | null> {
    const question = questionnaire.questions.find(q => q.questionId === currentQuestionId);
    if (!question) return null;

    // 1. Handle Loops - if we are currently in a loop
    if (session.currentLoop) {
      const loop = session.currentLoop;
      const currentIdx = loop.loopQuestions.indexOf(currentQuestionId);
      
      // If there's another question in the current loop body
      if (currentIdx !== -1 && currentIdx < loop.loopQuestions.length - 1) {
        return loop.loopQuestions[currentIdx + 1];
      }

      // End of loop body, check iterations
      if (loop.currentIteration < loop.totalIterations - 1) {
        loop.currentIteration += 1;
        session.markModified('currentLoop');
        return loop.loopQuestions[0]; // Restart loop body
      }

      // Loop finished
      session.currentLoop = undefined;
    }

    // 2. Evaluate Skip Logic
    if (question.skipLogic) {
      const isMatch = this.ruleEngineService.evaluate(
        {
          field: question.skipLogic.field,
          operator: question.skipLogic.operator as any,
          value: question.skipLogic.value,
        },
        session.answers,
      );

      if (isMatch) {
        return question.skipLogic.jumpToQuestionId;
      }
    }

    // 3. Check if this question starts a loop
    if (question.loop?.enabled) {
      const iterations = session.answers[question.loop.loopField];
      if (typeof iterations === 'number' && iterations > 0) {
        session.currentLoop = {
          loopQuestionId: currentQuestionId,
          totalIterations: iterations,
          currentIteration: 0,
          loopQuestions: question.loop.loopQuestions,
        };
        return question.loop.loopQuestions[0];
      }
    }

    // 4. Default Next Question
    if (question.nextQuestionId) {
      return question.nextQuestionId;
    }

    // 5. Fallback to next in order
    const currentIndex = questionnaire.questions.findIndex(q => q.questionId === currentQuestionId);
    if (currentIndex !== -1 && currentIndex < questionnaire.questions.length - 1) {
      return questionnaire.questions[currentIndex + 1].questionId;
    }

    return null; // End of questionnaire
  }
}
