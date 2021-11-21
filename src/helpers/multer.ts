import multer from 'multer'
import path from 'path'
import { ErrorUnprocessableEntity } from './errors';

export default multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        console.log(file, 'ext')
        let ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            cb(new ErrorUnprocessableEntity('File type not supported', '@Multer Helper'))
            return;
        }
        cb(null, true)
    }
})

