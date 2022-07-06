"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const statements_js_1 = __importDefault(require("../services/statements.js"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const response = await (0, statements_js_1.default)(req.query);
        if (response.error) {
            throw new Error(response.error.message);
        }
        res.send(response);
    }
    catch (error) {
        console.error(error);
        //FIXME dev only! stop sending entire error messages to the client and improve custom messages
        res.status(error.code || 400).send({ error: error.message });
    }
});
exports.default = router;
