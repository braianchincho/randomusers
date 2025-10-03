import { promises as fs } from 'fs';
/**
 * Reads a file and returns its content as a string.
 * @param {string} filePath - The path to the file to read.
 * @returns {Promise<string>} A promise that resolves to the file content.
 * @throws {Error} If the file cannot be read.
 */
async function readFileAsString(filePath) {
  if (!filePath || typeof filePath !== 'string') {
    throw new Error('Invalid file path');
  }
  try {
    return await fs.readFile(filePath, { encoding: 'utf8' });
  } catch (error) {
    throw new Error(`Failed to read file: ${error.message}`);
  }
}

/**
 * Sends Swagger JSON with modified host and scheme based on the environment.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {string} filePath - Path to the swagger.json file.
 * @param {boolean} [isProd=false] - Whether the environment is production.
 * @returns {Promise<void>}
 */
async function sendSwaggerInfo(req, res, filePath, isProd = false) {
  try {
    if (!req || !res) {
      throw new Error('Request or response object is missing');
    }
    if (!filePath || typeof filePath !== 'string') {
      throw new Error('Invalid file path');
    }

    // Read and parse the Swagger file
    const data = await readFileAsString(filePath);
    let jsonSwagger;
    try {
      jsonSwagger = JSON.parse(data);
    } catch (error) {
      throw new Error(`Failed to parse JSON: ${error.message}`);
    }

    // Modify Swagger JSON
    jsonSwagger.host = req.get('host');
    jsonSwagger.schemes = [isProd ? 'https' : req.protocol];

    // Send response
    res.json(jsonSwagger);
  } catch (error) {
    console.error('Error in sendSwaggerInfo:', error.message);
    res.status(500).json({
      error: 'Failed to process Swagger file',
      message: error.message,
    });
  }
}

export { sendSwaggerInfo };