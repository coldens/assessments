import { v4 } from 'uuid';
import * as validate from 'uuid-validate';
import { InvalidArgumentError } from './invalid-argument-error';

export class Uuid {
  readonly value: string;

  constructor(value: string) {
    this.ensureIsValidUuid(value);

    this.value = value;
  }

  static random(): Uuid {
    return new Uuid(v4());
  }

  private ensureIsValidUuid(id: string): void {
    if (!validate(id, 4)) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> no soporta el valor <${id}>`,
      );
    }
  }
}
