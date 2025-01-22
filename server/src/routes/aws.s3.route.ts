import { Router } from 'express';
import {
    getPreSignedUrlFromBucket,
    getPreSignedUrlToUpload,
    uploadObject,
} from '../controllers/aws.s3.controller';
import { upload } from '../utils/multer';

export const s3Router = Router();

s3Router.route('/pre-signed-url').post(upload.single('image'), uploadObject);
s3Router.route('/pre-signed-url').get(getPreSignedUrlFromBucket);

s3Router.route('/pre-signed-url/upload').get(getPreSignedUrlToUpload);
