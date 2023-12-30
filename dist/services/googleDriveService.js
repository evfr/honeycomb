"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const stream = __importStar(require("stream"));
class GoogleDriveService {
    static init() {
        if (GoogleDriveService.drive)
            return;
        const credentialsPath = '../../credentials.json';
        const credentials = require(credentialsPath);
        const auth = new googleapis_1.google.auth.JWT({
            email: credentials.client_email,
            key: credentials.private_key,
            scopes: ['https://www.googleapis.com/auth/drive'],
        });
        GoogleDriveService.drive = googleapis_1.google.drive({ version: 'v3', auth });
    }
    upload(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileMetadata = {
                name: file.filename,
                parents: ['1xwu9IzXZ2Ihemp1ViDJszapO3n5lvo6q'],
            };
            // Use the 'drive.files.create' method to upload the modified PDF file
            const res = yield GoogleDriveService.drive.files.create({
                requestBody: fileMetadata,
                media: {
                    mimeType: 'application/pdf',
                    body: stream.Readable.from(file.bytes),
                },
                fields: 'id',
            });
            return `https://drive.google.com/file/d/${res.data.id}/view?usp=drive_link`;
        });
    }
}
exports.default = GoogleDriveService;
//# sourceMappingURL=GoogleDriveService.js.map