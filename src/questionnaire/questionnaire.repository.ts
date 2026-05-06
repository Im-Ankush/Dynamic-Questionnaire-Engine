import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Questionnaire, QuestionnaireDocument } from './questionnaire.schema';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';

@Injectable()
export class QuestionnaireRepository {
  constructor(
    @InjectModel(Questionnaire.name) private questionnaireModel: Model<QuestionnaireDocument>,
  ) {}

  async create(dto: CreateQuestionnaireDto): Promise<QuestionnaireDocument> {
    const created = new this.questionnaireModel(dto);
    return created.save();
  }

  async findAll(): Promise<QuestionnaireDocument[]> {
    return this.questionnaireModel.find({ isActive: true }).exec();
  }

  async findById(id: string): Promise<QuestionnaireDocument | null> {
    return this.questionnaireModel.findById(id).exec();
  }
}
