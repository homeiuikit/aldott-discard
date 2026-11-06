import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const bucket = process.env.NEON_MEDIA_BUCKET || 'aldott-media';
const client = process.env.AWS_ENDPOINT_URL_S3
  ? new S3Client({
      endpoint: process.env.AWS_ENDPOINT_URL_S3,
      region: process.env.AWS_REGION || 'auto',
      forcePathStyle: true,
      credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
        ? { accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY }
        : undefined,
    })
  : undefined;

export function usesNeonStorage() { return Boolean(client); }

export async function storeMedia(filename: string, bytes: Buffer, contentType: string) {
  if (!client) return false;
  await client.send(new PutObjectCommand({ Bucket: bucket, Key: filename, Body: bytes, ContentType: contentType }));
  return true;
}

export async function deleteStoredMedia(filename: string) {
  if (!client) return false;
  await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: filename }));
  return true;
}

export async function getStoredMedia(filename: string) {
  if (!client) return undefined;
  return client.send(new GetObjectCommand({ Bucket: bucket, Key: filename }));
}
