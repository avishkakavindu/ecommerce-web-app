export type TContextObject = { [key: string]: any };

export type TCustomErrorContent = {
  message: string;
  context?: TContextObject | TContextObject[];
};
export abstract class CustomError extends Error {
  abstract readonly statusCode: number;
  abstract readonly errors: TCustomErrorContent[];
  abstract readonly logging: boolean;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
