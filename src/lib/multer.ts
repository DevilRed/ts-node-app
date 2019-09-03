import multer from 'multer';
import uuid from 'uuid/v4';
import path from 'path';

const storage = multer.diskStorage({
  destination: 'uploads', // folder where to save img
  filename: (req, file, cb) => {
    // generate the filename to avoid name collisions
    cb(null, uuid() + path.extname(file.originalname));
  },
});

export default multer({storage});
