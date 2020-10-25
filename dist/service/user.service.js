"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dbConfig_1 = require("../config/dbConfig");
var common_constants_1 = require("../constants/common.constants");
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.saveUser = function (userDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var usersCollection, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, dbConfig_1.DB.dbConnection.collection("users")];
                    case 1:
                        usersCollection = _a.sent();
                        return [2 /*return*/, usersCollection.insert(userDetails)];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, error_1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.fetchAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usersCollection, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, dbConfig_1.DB.dbConnection.collection("users")];
                    case 1:
                        usersCollection = _a.sent();
                        return [2 /*return*/, usersCollection.find({ role: "worker" }).toArray()];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, error_2];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.checkUser = function (userDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var usersCollection, userData, tokenData, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, dbConfig_1.DB.dbConnection.collection("users")];
                    case 1:
                        usersCollection = _a.sent();
                        return [4 /*yield*/, usersCollection.find({ username: userDetails.username }).toArray()];
                    case 2:
                        userData = _a.sent();
                        if (!userData.length) {
                            return [2 /*return*/, [{ data: "User Not found", isActive: false }]];
                        }
                        else if (userDetails.password === userData[0].password) {
                            userData[0].isActive = true;
                            tokenData = {
                                name: userData[0].username,
                                role: userData[0].role
                            };
                            userData[0].token = this.createToken(tokenData);
                            return [2 /*return*/, userData];
                        }
                        else {
                            return [2 /*return*/, [{ data: "Invalid Credentials", isActive: false }]];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, error_3];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.createToken = function (userDetails) {
        return jsonwebtoken_1.default.sign(userDetails, common_constants_1.APP_DATA.PRIVATE_KEY);
    };
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map