const { z } = require("zod");

const validate = (request) => {
  const schema = z
    .object({
      password: z.string().min(8).max(100),
      password_confirmation: z.string().min(8).max(100),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: "Password confirmation must match password",
      path: ["password_confirmation"],
    });

  return schema.safeParse(request.body);
};

const updateProfileRequest = {
  validate,
};

module.exports = updateProfileRequest;
