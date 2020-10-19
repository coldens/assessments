export class CreateQuizCommand {
  constructor(
    readonly quizId: string,
    readonly assessmentId: string,
    readonly studentId: string,
    readonly attempt: number,
    readonly merchantId: string,
  ) {}
}
