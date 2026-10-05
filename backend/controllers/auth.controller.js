import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import * as UserModel from '../models/user.model.js'
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js'

export const login = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await UserModel.findByEmail(email)
        if(!user){
            return res.status(401).json({message: 'Invalid credentials'})
        }
        const isPasswordValid = await bcrypt.compare(password,user.password_hash)
        if(!isPasswordValid){
            return res.status(401).json({message: 'Invalid credentials'})
        }

        const token = jwt.sign({userId: user.id}, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN})

        res.status(200).json({
            message: 'Login Successful',
            token,
            user: {id: user.id, email}
        })
        
    } catch (error) {
        console.error('Login Error:', error)
        res.status(500).json({message: 'Internal Server Error'})
    }

    
}