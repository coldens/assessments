import { InvalidNumberOfAttempts } from './invalid-number-of-attempts';

export class QuizAttempt {
  readonly value: number;

  static MAX_NUMBER_OF_ATTEMPT = 2;

  constructor(value: number) {
    QuizAttempt.guardIsValidNumberOfAttempts(value);
    this.value = value;
  }

  private static guardIsValidNumberOfAttempts(value: number) {
    if (value > QuizAttempt.MAX_NUMBER_OF_ATTEMPT) {
      throw new InvalidNumberOfAttempts();
    }
  }

  static random(): QuizAttempt {
    const getRandomInt = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min)) + min;
    };

    return new QuizAttempt(getRandomInt(1, QuizAttempt.MAX_NUMBER_OF_ATTEMPT));
  }
}
