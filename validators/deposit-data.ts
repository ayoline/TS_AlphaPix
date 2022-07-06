import { Request, Response, NextFunction } from 'express';
import { Deposit } from '../models/deposit-interface';
import checkDigit from '../utils/check-digit';

const validateInputs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deposit: Deposit = req.body.data;

    if (!checkDigit.account(deposit.destination.account)) {
      throw new Error('invalid account number');
    }

    if (isNaN(deposit.amount) || !deposit.amount || deposit.amount > 100000) {
      throw new Error('invalid amount');
    }

    req.body.deposit = deposit;

    return next();
  } catch (error: any) {
    //FIXME dev only! stop sending entire error messages to the client and improve custom messages
    res.status(error.code || 400).send({ error: error.message });
  }
};

export default validateInputs;
