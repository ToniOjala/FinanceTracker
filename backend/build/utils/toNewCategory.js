"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("./validation");
const toNewCategory = (object) => {
    const newCategory = {
        name: parseName(object.name)
    };
    return newCategory;
};
const parseName = (name) => {
    if (!name || !validation_1.isString(name))
        throw new Error('Incoorrect or missing name: ' + name);
    return name;
};
exports.default = toNewCategory;
