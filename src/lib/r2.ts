import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from '@/lib/env';

const endpoint = env.r2Endpoint || (env.r2AccountId ? `https://${env.r2AccountId}.r2.cloudflarestorage.com` : undefined);

export const r2 = endpoint && env.r2AccessKeyId && env.r2SecretAccessKey
  ? new S3Client({
      region: 'auto',
      endpoint,
      credentials: { accessKeyId: env.r2AccessKeyId, secretAccessKey: env.r2SecretAccessKey }
    })
  : null;

export async function createUploadUrl(key: string, contentType: string) {
  if (!r2) throw new Error('Cloudflare R2 no está configurado.');
  return getSignedUrl(r2, new PutObjectCommand({ Bucket: env.r2BucketName, Key: key, ContentType: contentType }), { expiresIn: 300 });
}

export async function createDownloadUrl(key: string) {
  if (!r2) throw new Error('Cloudflare R2 no está configurado.');
  return getSignedUrl(r2, new GetObjectCommand({ Bucket: env.r2BucketName, Key: key }), { expiresIn: 300 });
}
