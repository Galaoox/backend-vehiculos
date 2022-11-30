import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Solo se aceptan imagenes'), false);
    }
    callback(null, true);
};

export const editFileName = (req, file, callback) => {
    const fileExtName = extname(file.originalname);
    const randomName = uuidv4();
    callback(null, `${randomName}${fileExtName}`);
};

export const generateFileName = (file) => {
    const fileExtName = extname(file.fieldname);
    const randomName = uuidv4();
    return `${randomName}${fileExtName}`;
};

export const deleteFile = (filePath) => {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};
