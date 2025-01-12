import zennv from "zennv";
import { z } from "zod";

export const env = zennv({
    dotenv: true,
    schema: z.object({
        PORT: z.number().default(5000),
        HOST: z.string().default('0.0.0.0'),
        DB_DSN: z.string(),
        SECRET_KEY: z.string(),
        ARGON_SECRET_KEY: z.string(),
        ARGON_SALT: z.coerce.number(),
        AWS_S3_ENDPOINT_URL: z.string(),
        AWS_REGION: z.string(),
        AWS_ACCESS_KEY_ID: z.string(),
        AWS_SECRET_ACCESS_KEY: z.string(),
        GOOGLE_EMAIL: z.string(),
        GOOGLE_APP_PASSWORD: z.string(),
    }),
});