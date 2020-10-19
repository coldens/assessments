import { InvalidArgumentError } from '../../../shared/domain/value-object/invalid-argument-error';

export class QuizTimeLeft {
  readonly value: number;

  constructor(value: number) {
    this.guardIsValidDuration(value);
    this.value = value;
  }

  guardIsValidDuration(value: number) {
    if (value < 0) {
      throw new InvalidArgumentError(
        `<${value}> el tiempo restante no puede ser menor a 0`,
      );
    }
  }

  static random() {
    return new QuizTimeLeft(Math.random() * 30);
  }
}
