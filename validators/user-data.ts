import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user-interface';
import checkDigit from '../utils/check-digit';

const validateInputs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User = req.body.data;

    const regex: {name: RegExp, cpf: RegExp, email: RegExp, birthdate: RegExp} = {
      name: /[a-zA-Z\xC0-\uFFFF]/,
      cpf: /^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/,
      email: /^\w+([.-]?\w+)+@\w+([.:]?\w+)+(\.[a-zA-Z0-9]{2,4})+$/,
      birthdate: /^([1-2][0-9]{3})-([0-9]{2})-([0-9]{2})$/,
    };

    if (!checkDigit.cpf(user.cpf)) {
      throw new Error('invalid cpf');
    }

    const birthdate_: Date = new Date(user.birthdate);
    const sixteenAgo_: Date = new Date(Date.now() - 16 * 365 * 24 * 3600 * 1000);

    if (birthdate_ > sixteenAgo_) {
      throw new Error(
        'You must be at least 16 years old to create an account with us. Sorry kid :('
      );
    }

    if (
      !regex.name.test(user.name) ||
      !regex.cpf.test(user.cpf) ||
      !regex.email.test(user.email) ||
      !regex.birthdate.test(user.birthdate)
    ) {
      throw new Error('invalid inputs');
    }

    req.body.user = user;

    return next();
  } catch (error: any) {
    //FIXME dev only! stop sending entire error messages to the client and improve custom messages
    res.status(error.code || 400).send({ error: error.message });
  }
};

export default validateInputs;
