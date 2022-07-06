import { Router, Request, Response} from 'express';
import newTransfer from '../services/new-transfer.js';
import validateInputs from '../validators/transfer-data.js';
const router = Router();

router.post('/', validateInputs, async (req: Request, res: Response) => {
  try {
    const response: any = await newTransfer(req.body.transfer);

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
