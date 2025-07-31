import { Response, NextFunction, Request } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken';

import { GENERAL_ERROR_MESSAGE } from "../constants/general-error-message"
import { env } from "../environment/environment";
import prisma from "../models/primsa-client";
import { RESPONSE_CODE } from "../constants/response-code";

export const authMiddleware = async (req: Request, _: Response, next: NextFunction) => {
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken || !bearerToken.startsWith('Bearer ')) throw new Error('invalid token');
        const token = bearerToken.split(' ')[1];
        const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload & { userId: string };
        const userFound = await prisma.user.findUnique({
            where: {
                userId: payload.userId
            }
        })
        if (!userFound) throw new Error('invalid user');
        req.user = userFound;
        next()
    } catch (error) {
        next({
            statusCode: RESPONSE_CODE.UNAUTHORIZED,
            message: GENERAL_ERROR_MESSAGE.UNAUTHORIZED
        })
    }
}

export const adminMiddleware = async (req: Request, _: Response, next: NextFunction) => {
    try {
        if (req.user.role !== 'ADMIN') {
            throw new Error('invalid user');
        }
        next()
    } catch (error) {
        next({
            statusCode: RESPONSE_CODE.FORBIDDEN,
            message: GENERAL_ERROR_MESSAGE.UNAUTHORIZED
        })
    }
}