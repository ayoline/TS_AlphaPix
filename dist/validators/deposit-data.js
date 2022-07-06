"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const check_digit_1 = __importDefault(require("../utils/check-digit"));
const validateInputs = async (req, res, next) => {
    try {
        const deposit = req.body.data;
        if (!check_digit_1.default.account(deposit.destination.account)) {
            throw new Error('invalid account number');
        }
        if (isNaN(deposit.amount) || !deposit.amount || deposit.amount > 100000) {
            throw new Error('invalid amount');
        }
        req.body.deposit = deposit;
        return next();
    }
    catch (error) {
        //FIXME dev only! stop sending entire error messages to the client and improve custom messages
        res.status(error.code || 400).send({ error: error.message });
    }
};
exports.default = validateInputs;
