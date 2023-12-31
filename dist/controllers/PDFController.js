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
const PDFService_1 = __importDefault(require("../services/PDFService"));
const GoogleDriveService_1 = __importDefault(require("../services/GoogleDriveService"));
class PDFController {
    constructor() {
        this.fillForm = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user.user;
                const { name, address, day, month, year, activities, favouriteActivity } = req.body;
                if (!name || !address || !day || !month || !year || !activities || !favouriteActivity) {
                    res.status(400).json({ message: 'Bad request. missing field' });
                    return;
                }
                const userForm = { name, address, day, month, year, activities, favouriteActivity };
                const pdfFile = yield this.pdfService.fillForm(user, userForm);
                const url = yield this.googleService.upload(pdfFile);
                res.json({ url });
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error' });
            }
        });
        this.pdfService = new PDFService_1.default();
        this.googleService = new GoogleDriveService_1.default();
    }
}
exports.default = PDFController;
//# sourceMappingURL=PDFController.js.map