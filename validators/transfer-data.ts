import { Request, Response, NextFunction } from 'express';
import { Transfer } from '../models/transfer-interface.js';
import checkDigit from '../utils/check-digit.js';

const validateInputs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transfer: Transfer = req.body.data;

    if (!checkDigit.account(transfer.origin.account) || !checkDigit.account(transfer.destination.account)) {
      throw new Error('invalid account number');
    }

    if (isNaN(transfer.amount) || !transfer.amount || transfer.amount > 20000) {
      throw new Error('invalid amount');
    }

    req.body.transfer = transfer;

    return next();
  } catch (error: any) {
    //FIXME dev only! stop sending entire error messages to the client and improve custom messages
    res.status(error.code || 400).send({ error: error.message });
  }
};

export default validateInputs;
