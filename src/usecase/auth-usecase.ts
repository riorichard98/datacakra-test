import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '@prisma/client'

import prisma from "../models/primsa-client"
import { LoginRequest } from "../joi/interface/auth-joi"
import { throwRequestError } from "../middleware/error-handler"
import { AUTH_ERROR_MESSAGE } from "../constants/auth-error-message"
import { env } from '../environment/environment'
import { LoginResponseData } from './interface'


const login = async ({ email, password }: LoginRequest): Promise<LoginResponseData> => {
    const emailFound = await prisma.user.findFirst({
        where: { email }
    })
    if (!emailFound) throwRequestError(AUTH_ERROR_MESSAGE.INVALID_EMAIL)
    const isPasswordValid = await bcrypt.compare(password, (emailFound as User).passwordHash)
    if (!isPasswordValid) throwRequestError(AUTH_ERROR_MESSAGE.INVALID_PASSWORD)
    const token = jwt.sign({ userId: (emailFound as User).userId }, env.JWT_SECRET)
    return { token }
}

export const authUsecase = {
    login
}