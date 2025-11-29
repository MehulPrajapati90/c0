import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import { getAllContacts, getChatPartners, getMessagesByUserId, sendMessage } from "../controller/message.controller.js";

const messageRouter: ExpressRouter = Router();

messageRouter.use(arcjetProtection);

messageRouter.get("/chat/contacts", authMiddleware, getAllContacts);
messageRouter.get("/chat/all-chats", authMiddleware, getChatPartners);
messageRouter.get("/chat/:id", authMiddleware, getMessagesByUserId);
messageRouter.post("/chat/send/:id", authMiddleware, sendMessage);

export default messageRouter;