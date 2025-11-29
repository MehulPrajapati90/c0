import { Router } from "express";
import type { Router as ExpressRouter } from "express";

const authRouter: ExpressRouter = Router();

authRouter.post('/user/register', register);
authRouter.post('/user/login', login);
authRouter.post('/user/logout', logout);
authRouter.put('/user/update', update);
authRouter.get('/user/me', me);

export default authRouter;