import Logger from '@utils/logger';
import fs from 'fs/promises';
import path from 'path';

const logger = Logger.getLogger();

/**
 * Function to read key from file asynchronously
 * @param {string} filePath - path to the key file
 * @returns {Promise<string|null>} - Promise resolving to key or null
 */
const readKeyFromFile = async (filePath: string): Promise<string> => {
  try {
    // Resolve the full path to the file
    const fullPath = path.resolve(__dirname, `../../${filePath}`);

    // Read the contents of the file asynchronously
    const key = await fs.readFile(fullPath, 'utf8');

    return key;
  } catch (error) {
    logger.error('Error reading key file:', error);
    throw error;
  }
};

export default readKeyFromFile;
