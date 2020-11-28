"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const CategorySchemaFields = {
    name: { type: String, required: true, unique: true }
};
const CategorySchema = new mongoose_1.Schema(CategorySchemaFields);
const Category = mongoose_1.model('Category', CategorySchema);
exports.Category = Category;
