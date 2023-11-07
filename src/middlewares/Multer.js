import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

// Definir los tipos de archivos permitidos
const allowedFileTypes = ['profile', 'product', 'document'];

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { fileType } = req.body;

    if (!fileType || !allowedFileTypes.includes(fileType)) {
      return cb(new Error('Tipo de archivo no válido'), null);
    }

    let uploadPath = `uploads/${fileType}s/`;
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueFileName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });

export { upload };
