export class CreateAssessmentCommand {
  constructor(
    readonly id: string,
    readonly unitId: number,
    readonly duration: number,
  ) {}
}
