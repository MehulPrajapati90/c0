import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    fullName: {
        type: String,
        maxlength: 30,
        minlength: 1,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    profileImage: {
        type: String,
    },
    role: {
        type: String,
        default: "user",
        enum: ['user', 'admin']
    },
    password: {
        type: String,
        trim: true,
        minlength: 8,
        required: true
    }
}, {
    timestamps: true
})

const UserModel = model('user', UserSchema);
export default UserModel;