import { Injectable, NotFoundException } from '@nestjs/common';
import { Questionnaire } from './questionnaire.schema';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { QuestionnaireRepository } from './questionnaire.repository';

@Injectable()
export class QuestionnaireService {
  constructor(
    private readonly questionnaireRepository: QuestionnaireRepository,
  ) {}

  async create(createQuestionnaireDto: CreateQuestionnaireDto): Promise<Questionnaire> {
    return this.questionnaireRepository.create(createQuestionnaireDto);
  }

  async findAll(): Promise<Questionnaire[]> {
    return this.questionnaireRepository.findAll();
  }

  async findOne(id: string): Promise<Questionnaire> {
    const questionnaire = await this.questionnaireRepository.findById(id);
    if (!questionnaire) {
      throw new NotFoundException(`Questionnaire with ID ${id} not found`);
    }
    return questionnaire;
  }

  async findQuestion(questionnaireId: string, questionId: string) {
    const questionnaire = await this.findOne(questionnaireId);
    const question = questionnaire.questions.find(q => q.questionId === questionId);
    if (!question) {
      throw new NotFoundException(`Question ${questionId} not found in questionnaire ${questionnaireId}`);
    }
    return question;
  }
}
