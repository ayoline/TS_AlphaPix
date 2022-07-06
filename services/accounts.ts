import pg from 'pg';
import { Account } from '../models/account-interface';
const { Client } = pg;

const accounts: any = async (data: Account) => {
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
  } catch (error) {
    console.error(error);
    return { error };
  } finally {
    await client.end();
  }
};

export default accounts;
