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
const transaction_1 = require("../models/transaction");
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield transaction_1.Transaction.find({}).populate('category', { name: 1 });
    response.json(transactions);
}));
router.get('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield transaction_1.Transaction.findById(request.params.id).populate('category', { name: 1 });
    if (transaction)
        response.send(transaction);
    response.status(404);
}));
router.post('/', (request, response) => {
    const newTransaction = utils_1.toNewTransaction(request.body);
    const createdTransaction = transaction_1.Transaction.create(newTransaction);
    response.json(createdTransaction);
});
exports.default = router;
