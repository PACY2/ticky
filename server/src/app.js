require("express-async-errors")
const express = require("express");
const cookieParser = require("cookie-parser");
const config = require("./lib/config.lib");
const router = require("./routes/index");
const morgan = require("morgan")
const errorHandler = require("./middlewares/error-handler.middleware")

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"))

app.use("/api", router);
app.use(errorHandler)

app.listen(config.APP_PORT, () => console.log(`The server is running on port ${config.APP_PORT}`));
