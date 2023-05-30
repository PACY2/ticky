"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("express-async-errors");
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const app = (0, _express.default)();
app.listen(3000, ()=>console.log("The server is running on port 3000"));
