import { S3Client } from "@aws-sdk/client-s3"
import { env } from "../config/env"
import { v4 as uuidv4 } from "uuid"
import fs from "fs"

const s3 = new S3Client({
  forcePathStyle: true,
  region: env.AWS_REGION,
  endpoint: env.AWS_S3_ENDPOINT_URL,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  }
})

async function uploadFileToS3(file: any) {
    const uniqueFilename = `${uuidv4()}_${file.originalFilename}`;
  
    const fileContent = fs.createReadStream(file.filepath);
  
    const params = {
      Bucket: 'your-s3-bucket-name',
      Key: `uploads/${uniqueFilename}`,
      Body: fileContent,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };
  
    try {
      const uploadResult = await s3.upload(params).promise();
  
      // Return the file URL
      return uploadResult.Location;
    } catch (error) {
      console.error('Error uploading to S3', error);
      throw new Error('Error uploading file to S3');
    }
  }