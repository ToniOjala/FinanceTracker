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
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
const express_1 = __importDefault(require("express"));
const category_1 = require("../models/category");
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield category_1.Category.find({});
    response.json(categories);
}));
router.get('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_1.Category.findById(request.params.id);
    if (category)
        response.send(category);
    response.status(404);
}));
router.post('/', (request, response) => {
    const newCategory = utils_1.toNewCategory(request.body);
    const createdCategory = category_1.Category.create(newCategory);
    response.json(createdCategory);
});
exports.default = router;
