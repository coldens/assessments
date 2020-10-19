import { StringValueObject } from '../../../shared/domain/value-object/string-value-object';
import { InvalidArgumentError } from '../../../shared/domain/value-object/invalid-argument-error';

export class QuestionContent extends StringValueObject {
  static readonly MIN_LENGTH = 15;

  constructor(value: string) {
    super(value);
    this.guardQuestionContent(value);
  }

  private guardQuestionContent(value: string) {
    if (value.length < QuestionContent.MIN_LENGTH) {
      throw new InvalidArgumentError(
        `El contenido de la pregunta es demasiado corta: <${value}>`,
      );
    }
  }
}
