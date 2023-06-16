const { z } = require("zod");
const db = require("../lib/database.lib");

const validate = (request) => {
  const schema = z.object({
    email: z
      .string()
      .email()
      .refine(async (email) => await db.user.findUnique({ where: { email } }), { message: "Email address not found" }),
    password: z.string().min(8).max(100),
  });

  return schema.safeParseAsync(request.body);
};

const signInRequest = {
  validate,
};

module.exports = signInRequest;
