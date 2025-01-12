import pino from "pino"

const redactOptions = ["DB_DSN", "SECRET_KEY", "ARGON_SECRET_KEY", "ARGON_SALT", "AWS_S3_ENDPOINT_URL", "AWS_REGION", "AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "GOOGLE_EMAIL", "GOOGLE_APP_PASSWORD"];

export const logger = pino({
    redact: redactOptions,
    level: "debug",
    transport: {
        target: "pino-pretty",
    }
});

export const loggerOptions = {
    redact: redactOptions,
    level: "debug",
    transport: {
        target: "pino-pretty",
    },
};