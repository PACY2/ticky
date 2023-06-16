const { z } = require("zod");
const db = require("../lib/database.lib");

const validate = (request) => {
  const schema = z
    .object({
      name: z.string().min(3).max(60),
      phone: z.string().min(10).max(10),
      address: z.string().min(3).max(100),
      email: z
        .string()
        .email()
        .refine(async (email) => !(await db.user.findUnique({ where: { email } })), { message: "Email is required" }),
      password: z.string().min(8).max(100),
      password_confirmation: z.string().min(8).max(100),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: "Passwords do not match",
      path: ["password_confirmation"],
    });

  return schema.safeParseAsync(request.body);
};

const signUpRequest = {
  validate,
};

module.exports = signUpRequest;
