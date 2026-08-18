import { createEnv } from '@t3-oss/env-core';
import { configDotenv } from 'dotenv';
import * as z from 'zod';

const APP_STAGE = process.env.APP_STAGE ?? 'dev';

export const isDevelopment = APP_STAGE === 'dev';
export const isProduction = !APP_STAGE;

// prettier-ignore
if (isDevelopment)
  configDotenv();

export const env = createEnv({
  server: {
    APP_STAGE: z.enum(['dev', 'prod']),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.url(),
  },

  runtimeEnv: process.env,

  emptyStringAsUndefined: true,
});

export type ENV = typeof env;
