const db = require("../lib/database.lib");

const validate = (request) => {
  const schema = z.object({
    name: z.string().min(3).max(60),
    phone: z.string().min(10).max(10),
    address: z.string().min(3).max(100),
    email: z
      .string()
      .email()
      .refine(async (email) => !(await db.user.findUnique({ where: { email } })), { message: "Email Address already exists" }),
  });

  return schema.safeParse(request.body);
};

const updatePasswordRequest = {
  validate,
};

module.exports = updatePasswordRequest;
