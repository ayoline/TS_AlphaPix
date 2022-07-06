"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const { Client } = pg_1.default;
const users = async (data) => {
    const client = new Client();
    await client.connect();
    try {
        const query = `
      SELECT * FROM public.clients 
      WHERE id=$1 OR cpf=$2 OR true=$3
    `;
        const results = await client.query(query, [data.id, data.cpf, data.all]);
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
exports.default = users;
