import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import type { Request, Response } from "express";
import UserModel from "../model/user.model.js";

const RegisterSchema = z.object({
    name: z.string("Name should be a valid string"),
    email: z.email("Not a valid email"),
    password: z.string("Password should be a valid string")
})

const LoginSchema = z.object({
    email: z.email("Not a valid email"),
    password: z.string("Password should be a valid string")
})

const UpdateSchema = z.object({
    name: z.string("Not a valid string"),
    email: z.email("Invalid email address"),
    image: z.string("Not a valid string")
})

type RegisterInfer = z.infer<typeof RegisterSchema>;
type LoginInfer = z.infer<typeof LoginSchema>;
type UpdateInfer = z.infer<typeof UpdateSchema>;

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password }: RegisterInfer = RegisterSchema.parse(req.body);

        const isExisted = await UserModel.findOne({
            email: email
        })

        if (isExisted) {
            return res.status(500).json({
                success: false,
                message: "User Already Exist"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const profileImage = await fetch(`https://ui-avatars.com/api/?background=random&name=${name}`).then(res => res.url);

        const user = await UserModel.create({
            fullName: name,
            email: email,
            password: hashPassword,
            profileImage: profileImage
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "24h" });

        res.cookie("token", token);

        res.status(201).json({
            success: true,
            message: "Register Successfully"
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Failed to register"
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password }: LoginInfer = LoginSchema.parse(req.body);

        const isExisted = await UserModel.findOne({
            email: email
        });

        if (!isExisted) {
            return res.status(404).json({
                success: false,
                message: "User not exist!"
            })
        };

        const checkPass = await bcrypt.compare(password, isExisted.password);

        if (!checkPass) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials!"
            })
        };

        const token = jwt.sign({ id: isExisted._id }, process.env.JWT_SECRET!, { expiresIn: "24h" })

        res.cookie("token", token);

        res.status(200).json({
            sucess: true,
            message: "User Logined Successfully"
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "failed to login"
        })
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token");
        res.status(200).json({
            success: true,
            message: "User LoggedOut successfully"
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "failed to logout user"
        })
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const { name, image, email }: UpdateInfer = UpdateSchema.parse(req.body);

        const updateUser = await UserModel.updateOne({ email }, {
            $set: {
                fullName: name,
                profileImage: image,
            },
        });

        res.status(200).json({
            success: true,
            message: "user updated successfully"
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "failed to update user"
        })
    }
}

export const me = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        res.status(200).json({
            success: true,
            message: "user fetched successfully",
            user: user
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "failed to fetch user"
        })
    }
}