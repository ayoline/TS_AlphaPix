import express, { Express, Request, Response } from 'express';
import accounts from './controllers/accounts';
import registerDeposit from './controllers/register-deposit';
import registerTransfer from './controllers/register-transfer';
import registerUser from './controllers/register-user';
import registerWithdraw from './controllers/register-withdraw';
import statements from './controllers/statements';
import transactions from './controllers/transactions';
import users from './controllers/users';
import 'dotenv/config';

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/ping', (req: Request, res: Response) => {
  res.send('pong');
});

app.use('/accounts', accounts);
app.use('/register-deposit', registerDeposit);
app.use('/register-transfer', registerTransfer);
app.use('/register-user', registerUser);
app.use('/register-withdraw', registerWithdraw);
app.use('/statements', statements);
app.use('/transactions', transactions);
app.use('/users', users);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
