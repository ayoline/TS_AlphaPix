import pg from 'pg';
const { Client } = pg;
import { User } from '../models/user-interface';

const users: any = async (data: User) => {
  const client = new Client();
  await client.connect();

  try {
    const query = `
      SELECT * FROM public.clients 
      WHERE id=$1 OR cpf=$2 OR true=$3
    `;
    const results = await client.query(query, [data.id, data.cpf, data.all]);

    return results.rows;
  } catch (error) {
    console.error(error);
    return { error };
  } finally {
    await client.end();
  }
};

export default users;
