"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const check_digit_js_1 = __importDefault(require("../utils/check-digit.js"));
const validateInputs = async (req, res, next) => {
    try {
        const transfer = req.body.data;
        if (!check_digit_js_1.default.account(transfer.origin.account) || !check_digit_js_1.default.account(transfer.destination.account)) {
            throw new Error('invalid account number');
        }
        if (isNaN(transfer.amount) || !transfer.amount || transfer.amount > 20000) {
            throw new Error('invalid amount');
        }
        req.body.transfer = transfer;
        return next();
    }
    catch (error) {
        //FIXME dev only! stop sending entire error messages to the client and improve custom messages
        res.status(error.code || 400).send({ error: error.message });
    }
};
exports.default = validateInputs;
