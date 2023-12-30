import { CustomError, TContextObject } from './CustomError';

export default class HttpException extends CustomError {
  private static readonly _statusCode = 400;
  private readonly _code: number;
  private readonly _userMessage: string;
  private readonly _context: TContextObject | TContextObject[];

  constructor(params?: { code?: number; message?: string; userMessage?: string; context?: TContextObject | TContextObject[] }) {
    const { code, message } = params || {};

    super(message || 'Bad request');
    this._code = code || HttpException._statusCode;
    this._context = params?.context || {};
    this._userMessage = params?.userMessage || '';

    Object.setPrototypeOf(this, HttpException.prototype);
  }

  get errors(): {
    message: string;
    userMessage?: string;
    context: {
      [key: string]: any;
    };
  }[] {
    return [{ message: this.message, userMessage: this._userMessage, context: this._context }];
  }

  get statusCode(): number {
    return this._code;
  }
}
