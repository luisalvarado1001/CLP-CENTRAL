export const env = {
  databaseUrl: process.env.DATABASE_URL,
  databaseUrlUnpooled: process.env.DATABASE_URL_UNPOOLED,
  clerkPublishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  clerkSecretKey: process.env.CLERK_SECRET_KEY,
  adminEmail: process.env.ADMIN_EMAIL || 'comercial@clpautomotriz.com',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  r2AccountId: process.env.R2_ACCOUNT_ID,
  r2AccessKeyId: process.env.R2_ACCESS_KEY_ID,
  r2SecretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  r2BucketName: process.env.R2_BUCKET_NAME || 'clp-central-documentos',
  r2Endpoint: process.env.R2_ENDPOINT
};

export const integrations = {
  neon: Boolean(env.databaseUrl),
  clerk: Boolean(env.clerkPublishableKey && env.clerkSecretKey),
  r2: Boolean(env.r2AccountId && env.r2AccessKeyId && env.r2SecretAccessKey)
};
