const authRouter = require("./auth.route");
const { Router } = require("express");

const router = Router();

router.use("/", authRouter);

module.exports = router;
