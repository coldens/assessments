export class CorrectAnswer {
  constructor(readonly value: boolean) {}

  static random() {
    const value = Math.random() > 0.5;
    return new CorrectAnswer(value);
  }
}
