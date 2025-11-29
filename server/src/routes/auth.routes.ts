import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import { login, logout, me, register, update } from "../controller/auth.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const authRouter: ExpressRouter = Router();

authRouter.use(arcjetProtection);

authRouter.post('/user/register', register);
authRouter.post('/user/login', login);
authRouter.post('/user/logout', authMiddleware, logout);
authRouter.put('/user/update', authMiddleware, update);
authRouter.get('/user/me', authMiddleware, me);

export default authRouter;