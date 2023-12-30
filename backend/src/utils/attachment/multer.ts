import path from 'path';
import { Request } from 'express';
import multer from 'multer';
import { MEDIA_DIR } from 'configs/envValidator';
import HttpException from 'exceptions/httpException';
import { RESPONSES } from 'constants/responses';

// Set storage for uploaded files
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, MEDIA_DIR);
  },
  filename: (req, file, cb) => {
    const fileName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName); // Define file names (e.g., fieldName-timestamp.extension)
  },
});

// Define allowed file types and maximum size
const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif'];

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      cb(new HttpException({ code: 422, message: RESPONSES.INVALID_FILE_TYPE, userMessage: 'Invalid file type' }));
    }
  },
});

export default upload;
