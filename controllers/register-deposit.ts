import { Router, Request, Response} from 'express';
import newDeposit from '../services/new-deposit.js';
import validateInputs from '../validators/deposit-data.js';
const router = Router();

router.post('/', validateInputs, async (req: Request, res: Response) => {
  try {
    const response: any = await newDeposit(req.body.deposit);

    if (response.error) {
      throw new Error(response.error.message);
    }

    res.send(response);
  } catch (error: any) {
    console.error(error);
    //FIXME dev only! stop sending entire error messages to the client and improve error messages
    res.status(error.code || 400).send({ error: error.message });
  }
});

export default router;
