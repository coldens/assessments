import { InvalidArgumentError } from '../../../shared/domain/value-object/invalid-argument-error';

export class AssessmentDuration {
  readonly value: number;

  constructor(value: number) {
    this.guardIsValidDuration(value);
    this.value = value;
  }

  static random() {
    return new AssessmentDuration(Math.floor(Math.random() * 100));
  }

  guardIsValidDuration(value: number) {
    if (value <= 0) {
      throw new InvalidArgumentError(
        `<${value}> no es un valor compatible con la duración de la evaluación`,
      );
    }
  }
}
