import { config } from 'dotenv';
import { IEnvVariables } from '@interfaces/core.interface';

config({ path: `.env` });

export const {
  NODE_ENV = 'dev',
  PORT = 4000,
  HOST = 'localhost',
  DB_URI = '',
  DB_DATABASE = '',
  CORS_ORIGIN = '*',
  LOG_DIR = 'logs',
  LOG_DATE_PATTERN = 'YYYY-MM-DD-HH',
  LOG_FILE_NAME_PATTERN = `%DATE%.log`,
  LOG_MAX_FILES = 14,
  SALT_WORK_FACTOR = 10,
  JWT_EXPIRY = '15m',
  REFRESH_EXPIRY = '1y',
  PUBLIC_KEY_PATH = 'keys/public-key.pem',
  PRIVATE_KEY_PATH = 'keys/private-key.pem',
  MEDIA_DIR = 'media/',

  // Add more variables here...
} = process.env as unknown as IEnvVariables;

/**
 * Loads and validates environment variables.
 * @returns {void}
 * @throws {Error} - Throws error if required environment variables are missing or empty.
 */
function loadEnvVariables(): void {
  config();

  // Check required environment variables
  const requiredEnvVariables: Array<keyof IEnvVariables> = [
    'NODE_ENV',
    'PORT',
    'HOST',
    'DB_URI',
    'DB_DATABASE',
    'PUBLIC_KEY_PATH',
    'PRIVATE_KEY_PATH',
  ];

  for (const variable of requiredEnvVariables) {
    if (!process.env[variable] || process.env[variable]!.trim() === '') {
      throw new Error(`Required environment variable ${variable} is missing or empty.`);
    }
  }
}

export default loadEnvVariables;
