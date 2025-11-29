import { model, Schema } from "mongoose";

enum MediaContent {
    IMAGE = "IMAGE",
    VIDEO = "VIDEO",
    AUDIO = "AUDIO",
    DOCUMENT = "DOCUMENT",
}

const MessageSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    textContent: {
        type: String,
        trim: true,
        maxlength: 2000,
    },
    mediaContent: {
        url: { type: String, default: null },
        contentType: { type: String, enum: Object.values(MediaContent), default: null },
    }
});

const MessageModel = model("message", MessageSchema);

export default MessageModel;