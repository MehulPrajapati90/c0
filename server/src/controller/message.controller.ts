import type { Request, Response } from "express";
import UserModel from "../model/user.model.js";
import MessageModel from "../model/message.model.js";
import cloudinary from "../config/cloudinary.js";

export const getAllContacts = async (req: Request, res: Response) => {
    try {
        const loggedInUserId = req.userId;
        const filteredUsers = await UserModel.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json({
            success: true,
            message: "contacts fetched successfully",
            contacts: filteredUsers
        });
    } catch (error) {
        console.log("Error in getAllContacts:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getMessagesByUserId = async (req: Request, res: Response) => {
    try {
        const myId = req.userId;
        const { id: userToChatId } = req.params;

        const messages = await MessageModel.find({
            $or: [
                {
                    senderId: myId || '',
                    receiverId: userToChatId || ''
                },
                {
                    senderId: userToChatId || '',
                    receiverId: myId || ''
                },
            ],
        });

        res.status(200).json({
            success: true,
            message: "messages fetched successfully",
            messages: messages,
        });
    } catch (e) {
        console.log("Error in getMessages controller: ", e);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

export const getChatPartners = async (req: Request, res: Response) => {
    try {
        const loggedInUserId = req.userId;

        // find all the messages where the logged-in user is either sender or receiver
        const messages = await MessageModel.find({
            $or: [
                {
                    senderId: loggedInUserId || ''
                },
                {
                    receiverId: loggedInUserId || ''
                }
            ],
        });

        const chatPartnerIds = [
            ...new Set(
                messages.map((msg) =>
                    msg.senderId.toString() === loggedInUserId?.toString()
                        ? msg.receiverId.toString()
                        : msg.senderId.toString()
                )
            ),
        ];

        const chatPartners = await UserModel.find({ _id: { $in: chatPartnerIds } }).select("-password");

        res.status(200).json({
            success: true,
            message: "Chat-Partner fetched successfully",
            chatPartners
        });
    } catch (e) {
        console.error("Error in getChatPartners: ", e);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { text, image, type } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.userId;

        if (!text && !image && !type) {
            return res.status(400).json({ success: false, error: "Text or image is required." });
        }
        if (senderId && receiverId && senderId === receiverId) {
            return res.status(400).json({ success: false, message: "Cannot send messages to yourself." });
        }
        const receiverExists = await UserModel.exists({ _id: receiverId });
        if (!receiverExists) {
            return res.status(404).json({ success: false, message: "Receiver not found." });
        }

        let contentUrl;
        if (image) {
            // upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            contentUrl = uploadResponse.secure_url;
        }

        const newMessage = await MessageModel.create({
            receiverId: receiverId || '',
            senderId: senderId || '',
            textContent: text || null,
            mediaContent: {
                contentType: type,
                url: contentUrl || ''
            }
        });

        res.status(201).json({
            success: true,
            message: "message send successfully",
            newMessage
        });
    } catch (e) {
        console.log("Error in sendMessage controller: ", e);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};