import { config } from 'dotenv';

import { IEnvVariables } from '@interfaces/core.interface';

export const {
  NODE_ENV = 'dev',
  PORT = 4000,
  HOST = 'localhost',
  DB_URI = '',
  DB_DATABASE = '',
  // Add more variables here...
} = process.env as unknown as IEnvVariables;

/**
 * Loads and validates environment variables.
 * @returns {EnvVariables} - Object containing validated environment variables.
 * @throws {Error} - Throws error if required environment variables are missing or empty.
 */
function loadEnvVariables(): IEnvVariables {
  config();

  // Check required environment variables
  const requiredEnvVariables: Array<keyof IEnvVariables> = ['NODE_ENV', 'PORT', 'HOST', 'DB_URI', 'DB_DATABASE'];
  for (const variable of requiredEnvVariables) {
    if (!process.env[variable] || process.env[variable]!.trim() === '') {
      throw new Error(`Required environment variable ${variable} is missing or empty.`);
    }
  }

  return {
    NODE_ENV,
    PORT: parseInt(PORT as unknown as string, 10), // Parse PORT as number
    HOST,
    DB_URI,
    DB_DATABASE,
    // Add more variables here...
  };
}

export default loadEnvVariables;