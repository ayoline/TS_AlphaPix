import { Request, Response, NextFunction } from 'express';
import { Withdraw } from '../models/withdraw-interface';
import checkDigit from '../utils/check-digit';

const validateInputs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const withdraw: Withdraw = req.body.data;

    if (!checkDigit.account(withdraw.origin.account)) {
      throw new Error('invalid account number');
    }

    if (isNaN(withdraw.amount) || !withdraw.amount || withdraw.amount > 5000) {
      throw new Error('invalid amount');
    }

    req.body.withdraw = withdraw;

    return next();
  } catch (error: any) {
    //FIXME dev only! stop sending entire error messages to the client and improve custom messages
    res.status(error.code || 400).send({ error: error.message });
  }
};

export default validateInputs;
