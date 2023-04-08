export class InvalidArgumentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidArgumentError';
  }
}

export class ComponentNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ComponentNotFoundError';
  }
}

export class DataNotAvailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DataNotAvailableError';
  }
}
