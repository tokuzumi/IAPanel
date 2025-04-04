import { S3Client } from '@aws-sdk/client-s3'

export const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export const s3Config = {
  bucket: process.env.AWS_BUCKET!,
  region: process.env.AWS_DEFAULT_REGION!,
  usePathStyle: process.env.AWS_USE_PATH_STYLE_ENDPOINT === 'true',
} 