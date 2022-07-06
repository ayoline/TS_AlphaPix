"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const pg_1 = __importDefault(require("pg"));
const { Client } = pg_1.default;
const newWithdraw = async (data) => {
    const client = new Client();
    await client.connect();
    try {
        const selectOriginQuery = `
    SELECT a.*, c.password 
    FROM public.accounts a
      JOIN public.clients c ON c.id = a.client_id
    WHERE a.account_number = $1 AND a.branch = $2
    `;
        const originResult = await client.query(selectOriginQuery, [
            data.origin.account,
            data.origin.branch,
        ]);
        const originAccount = originResult.rows[0];
        const match = await bcrypt_1.default.compare(data.password, originAccount.password);
        if (!match) {
            throw new Error('Wrong password!');
        }
        if (!originAccount) {
            throw new Error("we couldn't find the account");
        }
        if (originAccount.balance < Number(data.amount) + 4) {
            throw new Error('insufficient balance');
        }
        const updateOriginQuery = `
      UPDATE public.accounts 
      SET balance = $1 
      WHERE account_number = $2 AND branch = $3
    `;
        await client.query(updateOriginQuery, [
            Number(originAccount.balance) - Number(data.amount) - 4,
            data.origin.account,
            data.origin.branch,
        ]);
        // CREATE TRANSACTION RECORD
        const transactionID = crypto_1.default.randomUUID();
        const insertTransaction = `
      INSERT INTO public.transactions 
      (id, amount, type, external, credit_part, debit_part)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
        const transactionData = [
            transactionID,
            Number(data.amount) + 4,
            'withdraw',
            false,
            null,
            originAccount.client_id,
        ];
        await client.query(insertTransaction, transactionData);
        return {
            status: 'success',
            data: {
                transactionID,
                amount: Number(data.amount),
                fee: 4,
            },
        };
    }
    catch (error) {
        await client.query('ROLLBACK');
        return { error };
    }
    finally {
        await client.end();
    }
};
exports.default = newWithdraw;
