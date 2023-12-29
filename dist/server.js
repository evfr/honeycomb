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
const express_1 = __importDefault(require("express"));
const perf_hooks_1 = require("perf_hooks");
const UserController_1 = __importDefault(require("./controllers/UserController"));
const PDFController_1 = __importDefault(require("./controllers/PDFController"));
const DbService_1 = __importDefault(require("./services/DbService"));
class Server {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.configureMiddleware();
        this.configureRoutes();
    }
    configureMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        // middleware to measure response time
        this.app.use((req, res, next) => {
            const start = perf_hooks_1.performance.now();
            res.on('finish', () => {
                const end = perf_hooks_1.performance.now();
                const responseTime = end - start;
                console.log(`Response time: ${responseTime} ms`);
            });
            next();
        });
        // logging middleware for incoming requests
        this.app.use((req, res, next) => {
            const timestamp = new Date().toISOString();
            const method = req.method;
            const url = req.originalUrl;
            console.log(`[${timestamp}] ${method} ${url}`);
            // Continue with the request handling
            next();
        });
        // Error handling middleware
        this.app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Something went wrong!');
        });
    }
    configureRoutes() {
        const userController = new UserController_1.default();
        const pdfController = new PDFController_1.default();
        this.app.post('/signup', userController.signUp);
        this.app.post('/login', userController.login);
        this.app.post('/fillform', userController.authenticate, pdfController.fillForm);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield DbService_1.default.getDb();
            this.app.listen(this.port, () => {
                console.log(`Server is running on port ${this.port}`);
            });
        });
    }
}
const port = 3000;
const server = new Server(port);
server.start();
//# sourceMappingURL=server.js.map