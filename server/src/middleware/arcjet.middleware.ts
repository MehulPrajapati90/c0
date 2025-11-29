import type { NextFunction, Request, Response } from "express";
import { isSpoofedBot } from "@arcjet/inspect";
import aj from "../config/arcject.js";

export const arcjetProtection = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Ensure socket.remoteAddress is a string (Express type allows undefined)
        // if (!req.socket.remoteAddress) {
        //     // fall back to req.ip or a safe default
        //     (req as any).socket = { ...req.socket, remoteAddress: req.ip || "127.0.0.1" };
        // }

        const decision = await aj.protect(req as unknown as any);

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ message: "Rate limit exceeded. Please try again later." });
            // } else if (decision.reason.isBot()) {
            //     return res.status(403).json({ message: "Bot access denied." });
            // } else {
            //     return res.status(403).json({
            //         message: "Access denied by security policy.",
            //     });
            }
        }

        // check for spoofed bots
        if (decision.results.some(isSpoofedBot)) {
            return res.status(403).json({
                error: "Spoofed bot detected",
                message: "Malicious bot activity detected.",
            });
        }

        next();
    } catch (error) {
        console.log("Arcjet Protection Error:", error);
        next();
    }
};