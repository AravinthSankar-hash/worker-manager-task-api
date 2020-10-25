"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Helper = /** @class */ (function () {
    function Helper() {
    }
    Helper.prototype.unless = function (paths, middleware) {
        return function (req, res, next) {
            if (paths.includes(req.path)) {
                return next();
            }
            else {
                return middleware(req, res, next);
            }
        };
    };
    ;
    return Helper;
}());
exports.Helper = Helper;
//# sourceMappingURL=comman.helpers.js.map