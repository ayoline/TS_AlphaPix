"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const { Client } = pg_1.default;
const accounts = async (data) => {
    const client = new Client();
    await client.connect();
    try {
        const query = `
      SELECT * FROM public.accounts 
      WHERE 
        id=$1 
        OR client_id=$2 
        OR (branch=$3 AND account_number=$4) 
        OR true=$5
    `;
        const results = await client.query(query, [
            data.id,
            data.client_id,
            data.branch,
            data.account,
            data.all,
        ]);
        return results.rows;
    }
    catch (error) {
        console.error(error);
        return { error };
    }
    finally {
        await client.end();
    }
};
exports.default = accounts;
