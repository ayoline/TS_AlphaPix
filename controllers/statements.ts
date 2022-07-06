import { Router, Request, Response} from 'express';
import statements from '../services/statements.js';
const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const response: any = await statements(req.query);

    if (response.error) {
      throw new Error(response.error.message);
    }

    res.send(response);
  } catch (error: any) {
    console.error(error);
    //FIXME dev only! stop sending entire error messages to the client and improve custom messages
    res.status(error.code || 400).send({ error: error.message });
  }
});

export default router;
