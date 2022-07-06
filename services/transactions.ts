import pg from 'pg';
const { Client } = pg;
import { Transaction } from '../models/transaction-interface';

const transactions: any = async (data: Transaction) => {
  const client = new Client();
  await client.connect();

  try {
    const query = `
      SELECT * FROM public.transactions
      WHERE
        id=$1 
        OR debit_part=$2 
        OR credit_part=$3 
        OR DATE(created_at) >= DATE($4) 
        OR true=$5
      ORDER BY 7 DESC
      `;
    const results = await client.query(query, [
      data.id,
      data.debit_part,
      data.credit_part,
      data.date,
      data.all,
    ]);

    return results.rows;
  } catch (error) {
    console.error(error);
    return { error };
  } finally {
    await client.end();
  }
};

export default transactions;
