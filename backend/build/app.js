"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transactions_1 = __importDefault(require("./routes/transactions"));
const categories_1 = __importDefault(require("./routes/categories"));
const app = express_1.default();
const MONGODB_URI = process.env.MONGODB_URI || '';
if (!MONGODB_URI)
    console.log('No URI for MongoDB found.');
console.log('connecting to ', MONGODB_URI);
mongoose_1.default.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch(error => {
    console.log('Error while connecting to MongoDB: ', error.message);
});
app.use(cors_1.default());
app.use(express_1.default.json());
app.use('/api/transactions', transactions_1.default);
app.use('/api/categories', categories_1.default);
exports.default = app;
