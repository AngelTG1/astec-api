import { v4 as uuid } from "uuid";

export class AssignmentUUID {
  private readonly value: string;

  constructor(id?: string) {
    this.value = id ?? uuid();
  }

  getValue(): string {
    return this.value;
  }
}
