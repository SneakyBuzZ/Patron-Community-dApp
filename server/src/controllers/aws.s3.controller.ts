import {
    GetObjectCommand,
    S3Client,
    PutObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';

const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

const client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: ACCESS_KEY_ID!,
        secretAccessKey: SECRET_ACCESS_KEY!,
    },
});

const putObject = async (
    fileName: string,
    fileType: string,
    buffer: Buffer
) => {
    const cmd = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `patron/${fileName}`,
        ContentType: fileType,
        Body: buffer,
    });

    await client.send(cmd);
};

export const getObject = async (fileName: string) => {
    const cmd = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `patron/${fileName}`,
    });

    const url = await getSignedUrl(client, cmd, { expiresIn: 5 });

    return url;
};

export const uploadObject = async (req: Request, res: Response) => {
    if (!req.file) {
        throw new ApiError(400, 'No file uploaded');
    }

    const fileName = req.file.originalname;
    const fileType = req.file.mimetype;
    const buffer = req.file.buffer;

    try {
        await putObject(fileName, fileType, buffer);
        res.status(200).json(
            new ApiResponse(200, {}, 'File uploaded successfully')
        );
    } catch (error) {
        console.log('GET PRESIGNED URL : AMAZON S3 : Failed to upload file');
        res.status(500).json(new ApiResponse(500, {}, 'Failed to upload file'));
    }
};

export const getPreSignedUrlToUpload = async (req: Request, res: Response) => {
    const { fileName, contentType } = req.query;

    if (true) {
        try {
            // await putObject(String(fileName), String(contentType));

            res.status(200).json(new ApiResponse(200, {}, 'Success'));
        } catch (error) {
            console.log(
                'GET PRESIGNED URL : AMAZON S3 : Failed to  assign pre-signed URL'
            );
        }
    } else {
        return res.status(404).json(new ApiResponse(404, {}, 'User not found'));
    }
};

export const getPreSignedUrlFromBucket = async (
    req: Request,
    res: Response
) => {
    const { fileName } = req.query;

    if (!fileName) {
        throw new ApiError(
            400,
            'GET PRESIGNED URL : AMAZON S3 : fileName is required'
        );
    }

    try {
        const url = await getObject(String(fileName));
        if (url) {
            res.status(200).json(new ApiResponse(200, { url }, 'Success'));
        } else {
            return res
                .status(404)
                .json(new ApiResponse(404, {}, 'File not found'));
        }
    } catch (error) {
        console.log('GET PRESIGNED URL : AMAZON S3 : Failed to fetch URL');
        res.status(500).json(new ApiResponse(500, {}, 'Failed to fetch URL'));
    }
};
