import { Router, Request, Response} from 'express';
import newUser from '../services/new-user';
import validateInputs from '../validators/user-data';
const router = Router();

router.post('/', validateInputs, async (req: Request, res: Response) => {
  try {
    const response: any = await newUser(req.body.user);

    if (response.error) {
      throw new Error(response.error.message);
    }

    res.send(response);
  } catch (error: any) {
    console.error(error);
    //FIXME dev only! stop sending entire error messages to the client and improve custom messages
    res.status(error.code || 503).send({ error: error.message });
  }
});

export default router;
