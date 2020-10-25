"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_constants_1 = require("../constants/common.constants");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var MiddleWare = /** @class */ (function () {
    function MiddleWare() {
    }
    MiddleWare.prototype.validateUser = function () {
        return function (request, response, next) {
            try {
                var userToken = request.headers['x-access-token'];
                var userDetails = jsonwebtoken_1.default.verify(userToken, common_constants_1.APP_DATA.PRIVATE_KEY);
                request.userData = {
                    role: userDetails['role'],
                    name: userDetails['name'],
                };
                next();
            }
            catch (error) {
                request.userData = {
                    role: "worker",
                    name: "rahul",
                };
                next();
                // response.send({ message: "Failed", error: error });
            }
        };
    };
    return MiddleWare;
}());
exports.MiddleWare = MiddleWare;
exports.middlewareService = new MiddleWare();
//# sourceMappingURL=common.middleware.js.map