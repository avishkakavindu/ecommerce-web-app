import jwt from 'jsonwebtoken';

export interface IEnvVariables {
  NODE_ENV: string;
  PORT: number;
  HOST: string;
  DB_URI: string;
  DB_DATABASE: string;
  CORS_ORIGIN: string;
  LOG_DIR: string;
  LOG_DATE_PATTERN: string;
  LOG_FILE_NAME_PATTERN: string;
  LOG_MAX_FILES: number;
  SALT_WORK_FACTOR: number;
  JWT_EXPIRY: string; // TODO introduce types
  REFRESH_EXPIRY: string; // TODO introduce types
  PUBLIC_KEY_PATH: string;
  PRIVATE_KEY_PATH: string;
}

export interface IVerifyJwtResult {
  valid: boolean;
  expired: boolean;
  decoded: string | jwt.JwtPayload;
}
