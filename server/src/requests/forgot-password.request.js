const { z } = require("zod");
const db = require("../lib/database.lib")

const validate = (request) => {
  const schema = z.object({
    email: z
      .string()
      .email()
      .refine(async (email) => await db.user.findUnique({ where: { email } }), { message: "Email address not found" }),
  });

  return schema.safeParseAsync(request.body);
};

const resetPasswordRequest = {
  validate,
};

module.exports = resetPasswordRequest;
