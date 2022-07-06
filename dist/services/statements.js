"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const { Client } = pg_1.default;
const statements = async (data) => {
    const client = new Client();
    await client.connect();
    try {
        const selectUser = `
      SELECT c.password
      FROM public.clients c
        JOIN public.accounts a ON a.client_id = c.id 
      WHERE a.client_id=$1 OR (a.branch=$2 AND a.account_number=$3)
    `;
        const selectUserResults = await client.query(selectUser, [
            data.id,
            data.branch,
            data.account
        ]);
        const match = await bcrypt_1.default.compare(data.password, selectUserResults.rows[0].password);
        if (!match) {
            throw new Error('Wrong password!');
        }
        const query = `
      WITH all_transactions AS(
        SELECT 
          json_build_object(
            'holder', a.client_id, 
            'branch', a.branch,
            'number', a.account_number,
            'balance', a.balance
          ) AS account_details,
          json_build_object(
            'id', t.id, 
            'amount', t.amount, 
            'type', t.type,
            'credit_part', t.credit_part,
            'debit_part', t.debit_part,
            'date', t.created_at
          ) AS transaction_details
        FROM public.accounts a
          JOIN public.transactions t ON a.client_id IN (t.debit_part, t.credit_part)
        WHERE a.client_id=$1 OR (a.branch=$2 AND a.account_number=$3)
        ORDER BY t.created_at DESC
      )
      SELECT * FROM all_transactions
      WHERE DATE(transaction_details::json#>>'{date}') >= DATE($4) OR true=$5
    `;
        const results = await client.query(query, [
            data.id,
            data.branch,
            data.account,
            data.date,
            data.all,
        ]);
        const transactions = results.rows.map((row) => {
            return row.transaction_details;
        });
        return { account_details: results.rows[0].account_details, transactions };
    }
    catch (error) {
        console.error(error);
        return { error };
    }
    finally {
        await client.end();
    }
};
exports.default = statements;
