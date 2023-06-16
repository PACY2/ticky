const dot = require("dotenv");
dot.config();

const { z } = require("zod");

const schema = z.object({
  // APP
  APP_PORT: z
    .string()
    .regex(/^\d+$/gi)
    .pipe(z.string().transform((v) => Number(v))),

  APP_URL: z.string().url(),

  // JWT
  SECRET_ACCESS: z.string().min(1),
  SECRET_REFRESH: z.string().min(1),
  SECRET_FORGOT_PASSWORD: z.string().min(1),
  SECRET_CONFIRM_EMAIL: z.string().min(1),

  // DURATION
  DURATION_ACCESS: z.string().min(1),
  DURATION_REFRESH: z.string().min(1),
  DURATION_FORGOT_PASSWORD: z.string().min(1),
  DURATION_CONFIRM_EMAIL: z.string().min(1),

  // PASSWORD
  SALT: z.string().regex(/^\d+$/ig).pipe(z.string().transform((v) => Number(v))),

  // SMTP
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.string().min(1),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1)
});

const validation = schema.safeParse(process.env);

if (!validation.success) {
  throw new Error(JSON.stringify(validation.error.issues, null, 4));
}

const config = validation.data;

module.exports = config;
