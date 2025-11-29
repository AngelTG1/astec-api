export class ClientAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClientAlreadyExistsError";
  }
}
