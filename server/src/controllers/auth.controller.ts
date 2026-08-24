import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

class AuthController {

    static createUser = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;
            const checkEmail = await User.findOne({ email });

            if (checkEmail) {
                return res.status(400).json({ message: 'Email already exists' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({
                name,
                email,
                password: hashedPassword
            })

            const savedUser = await user.save();
            res.status(201).json({
                message: 'User created successfully',
                user: {
                    id: savedUser._id,
                    name: savedUser.name,
                    email: savedUser.email,
                }
            });

        } catch (error) {
            res.status(500).json({ message: 'Failed to create user', error: error });
        }
    }

    static loginUser = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if (!isPasswordCorrect) {
                return res.status(400).json({ message: 'Invalid password' });
            }

            const token = jwt.sign({
                id: user._id.toString(),
                email: user.email
            },
                process.env.JWT_SECRET as string,
                { expiresIn: '1h' }
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 1000
            });

            res.status(200).json({
                message: "User logged in successfully"
            });

        } catch (error) {
            res.status(500).json({ message: 'Failed to login user', error: error });
        }
    }

    static getMe = async (req: Request, res: Response) => {
        try {
            const { id, email } = req.user;

            res.status(200).json(
                {
                    "message": "User data fetched successfully",
                    "user": {
                        "id": id,
                        "email": email
                    }
                }
            )

        } catch (error) {
            res.status(500).json({ message: "Failed to fetch user data" })
        }
    }

    static logoutUser = async (req: Request, res: Response) => {
        try {
            res.clearCookie("token");

            res.status(200).json({ "message": "User logged out successfully" })

        } catch (error) {
            res.status(500).json({ message: 'Failed to logout User' })
        }
    }

}

export default AuthController;