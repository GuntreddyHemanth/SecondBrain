import {Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from 'dotenv';

dotenv.config()

export const userMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const header = req.headers["authorization"]
    const decoded = jwt.verify(header as string, `${process.env.JWT_PASSWORD}`)
    if (decoded){
        req.userId = (decoded as JwtPayload).id
        next()
    } else {
        res.status(403).json({
            message: "You are not logged in"
        })
    }
}