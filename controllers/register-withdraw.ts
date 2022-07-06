import { Router, Request, Response} from 'express';
import newWithdraw from '../services/new-withdraw.js';
import validateInputs from '../validators/withdraw-data.js';
const router = Router();

router.post('/', validateInputs, async (req: Request, res: Response) => {
  try {
    const response: any = await newWithdraw(req.body.withdraw);

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
