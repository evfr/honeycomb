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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DbService_1 = __importDefault(require("./DbService"));
class UserService {
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield DbService_1.default.getDb();
            const dbUser = yield this.db.collection("users").findOne({ id: userId });
            if (dbUser) {
                const user = {
                    name: dbUser.name,
                    pass: ''
                };
                return user;
            }
            return null;
        });
    }
    getUserByNameAndPass(name, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield DbService_1.default.getDb();
            const dbUser = yield this.db.collection("users").findOne({ name, pass });
            if (dbUser) {
                const user = {
                    name: dbUser.name,
                    pass: ''
                };
                return user;
            }
            return null;
        });
    }
    createUser(name, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield DbService_1.default.getDb();
            const newUser = { name, pass };
            yield this.db.collection("users").insertOne(newUser);
            return newUser;
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map