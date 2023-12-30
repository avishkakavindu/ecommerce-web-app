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
  const requiredEnvVariables: Array<keyof IEnvVariables> = ['NODE_ENV', 'PORT', 'HOST', 'DB_URI', 'DB_DATABASE'];

  for (const variable of requiredEnvVariables) {
    const x = process.env[variable];
    if (!process.env[variable] || process.env[variable]!.trim() === '') {
      throw new Error(`Required environment variable ${variable} is missing or empty.`);
    }
  }
}

export default loadEnvVariables;
