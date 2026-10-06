import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env.js'

export const protect = (req, res, next) => {
    
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Unauthorized, no token provided'})
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(403).json({message: 'Failed to authenticate token'})
    }
}