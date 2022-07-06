"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const pg_1 = __importDefault(require("pg"));
const check_digit_1 = __importDefault(require("../utils/check-digit"));
const { Client } = pg_1.default;
const newUser = async (data) => {
    const client = new Client();
    await client.connect();
    try {
        const querySelect = `SELECT * FROM public.clients WHERE cpf=$1`;
        const resultsSelect = await client.query(querySelect, [data.cpf]);
        const user = resultsSelect.rows[0];
        if (user) {
            throw new Error('this user cpf is already registered!');
        }
        // created_at/deleted/balance automatically being set on creation e.g.:
        // ALTER TABLE public.clients ADD COLUMN created_at TIMESTAMP DEFAULT NOW()
        // CREATE USER
        const userID = crypto_1.default.randomUUID();
        const userPassword = bcrypt_1.default.hashSync(data.password, 12);
        const insertUser = `
      INSERT INTO public.clients (id, name, cpf, email, birthdate, password) 
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
        const userData = [userID, data.name, data.cpf, data.email, data.birthdate, userPassword];
        await client.query(insertUser, userData);
        // CREATE ACCOUNT
        const accountID = crypto_1.default.randomUUID();
        // FIXME fun error: "Type string trivially inferred from a string literal, remove type annotation"
        const branch = '0001';
        const rand = String(crypto_1.default.randomInt(11111111, 99999999));
        const accountNum = `${rand}-${check_digit_1.default.account(rand)}`;
        const insertAccount = `
      INSERT INTO public.accounts (id, client_id, branch, account_number) 
      VALUES ($1, $2, $3, $4)
    `;
        const accountData = [accountID, userID, branch, accountNum];
        await client.query(insertAccount, accountData);
        return {
            status: 'success',
            data: {
                name: data.name,
                email: data.email,
                birthdate: data.birthdate,
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
exports.default = newUser;
