
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    S3Client,
    PutObjectCommand,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DmsService {
    private client: S3Client;
    private logger: Logger;
    private bucketName = this.configService.get('S3_BUCKET_NAME');

    constructor(
        private readonly configService: ConfigService,
    ) {
        const s3_region = this.configService.get('S3_REGION');

        if (!s3_region) {
            this.logger.warn('S3_REGION not found in environment variables');
            throw new Error('S3_REGION not found in environment variables');
        }

        this.client = new S3Client({
            region: s3_region,
            credentials: {
                accessKeyId: this.configService.get('S3_ACCESS_KEY'),
                secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY'),
            },
            forcePathStyle: true,
        });

    }

    async uploadSingleFile({
        file,
        isPublic = true,
    }: {
        file: any;
        isPublic: boolean;
    }) {
        try {
            const key = `${uuidv4()}`;
            const command = new PutObjectCommand({
                Bucket: this.bucketName,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: isPublic ? 'public-read' : 'private',

                Metadata: {
                    originalName: file.originalname,
                },
            });

            const uploadResult = await this.client.send(command);
            console.log(uploadResult)
            return
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

}