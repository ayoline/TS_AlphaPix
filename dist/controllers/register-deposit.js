"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const new_deposit_js_1 = __importDefault(require("../services/new-deposit.js"));
const deposit_data_js_1 = __importDefault(require("../validators/deposit-data.js"));
const router = (0, express_1.Router)();
router.post('/', deposit_data_js_1.default, async (req, res) => {
    try {
        const response = await (0, new_deposit_js_1.default)(req.body.deposit);
        if (response.error) {
            throw new Error(response.error.message);
        }
        res.send(response);
    }
    catch (error) {
        console.error(error);
        //FIXME dev only! stop sending entire error messages to the client and improve error messages
        res.status(error.code || 400).send({ error: error.message });
    }
});
exports.default = router;
