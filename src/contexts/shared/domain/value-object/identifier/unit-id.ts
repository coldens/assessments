import { InvalidArgumentError } from '../invalid-argument-error';

export class UnitId {
  readonly value: number;

  constructor(value: number) {
    this.ensureIsValidUnitId();
    this.value = value;
  }

  static random() {
    return new UnitId(Math.floor(Math.random() * 100));
  }

  private ensureIsValidUnitId() {
    if (this.value <= 0) {
      throw new InvalidArgumentError(
        `<${this.value}> no es un identificador valido de unidad`,
      );
    }
  }
}
