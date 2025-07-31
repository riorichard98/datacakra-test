import bcrypt from 'bcrypt'

import { ListTouristRequest, UpsertTouristRequest } from "../joi/interface"
import prisma from "../models/primsa-client"
import { DeleteTouristResponseData, ListTouristResponseData, UpsertTouristResponseData } from "./interface"
import { throwRequestError } from '../middleware/error-handler'
import { GENERAL_ERROR_MESSAGE } from '../constants/general-error-message'

const upsertTourist = async (data: UpsertTouristRequest): Promise<UpsertTouristResponseData> => {
    const passwordHash = await bcrypt.hash(data.password, 10)
    const { email, fullName, userId } = await prisma.user.upsert({
        where: {
            email_role: {
                email: data.email,
                role: 'TOURIST'
            }
        },
        update: {
            fullName: data.fullName,
            passwordHash
        },
        create: {
            fullName: data.fullName,
            passwordHash,
            email: data.email,
            role: 'TOURIST'
        }
    })
    return {
        email,
        fullName,
        userId
    }
}

const touristList = async ({ limit, offset }: ListTouristRequest): Promise<ListTouristResponseData> => {
    const foundTourists = await prisma.user.findMany({
        take: limit,
        skip: offset,
        where: {
            role: 'TOURIST'
        }
    })
    return foundTourists.map(e => ({
        userId: e.userId,
        fullName: e.fullName,
        email: e.email
    }))
}

const deleteTourist = async (userId: string): Promise<DeleteTouristResponseData> => {
    const foundTourist = await prisma.user.findFirst({
        where: {
            userId
        }
    })
    if (!foundTourist) throwRequestError(GENERAL_ERROR_MESSAGE.DATA_NOT_EXISTS)
    await prisma.user.delete({
        where: {
            userId,
            role: 'TOURIST'
        }
    })
    return { deletedUserId: userId }
}

export const touristUsecase = {
    upsertTourist,
    touristList,
    deleteTourist
}