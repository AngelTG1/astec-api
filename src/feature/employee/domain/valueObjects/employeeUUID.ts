import { v4 as uuid } from "uuid";

export class EmployeeUUID {
  private readonly value: string;

  constructor(id?: string) {
    this.value = id ?? uuid();
  }

  getValue(): string {
    return this.value;
  }
}
