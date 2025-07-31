import { GENERAL_ERROR_MESSAGE } from "../constants/general-error-message"
import { TRIP_ERROR_MESSAGE } from "../constants/trip-error-message"
import { InsertTripRequest, ListTripRequest, UpdateTripRequest } from "../joi/interface"
import { throwRequestError } from "../middleware/error-handler"
import prisma from "../models/primsa-client"
import { DeleteTripResponseData, InsertTripResponseData, ListTripResponseData, UpdateTripResponseData } from "./interface"

const insertTrip = async (data: InsertTripRequest): Promise<InsertTripResponseData> => {
    const foundUser = await prisma.user.findFirst({
        where: {
            userId: data.userId
        }
    })
    if (!foundUser) throwRequestError(GENERAL_ERROR_MESSAGE.USER_NOT_FOUND)
    const conflctTripFound = await prisma.trip.findFirst({
        where: {
            userId: data.userId,
            startDate: {
                lt: data.endDate // find trip that already started before new trip ended
            },
            endDate: {
                gt: data.startDate // find trip that not yet finished after new trip started
            }
        }
    })
    if (conflctTripFound) throwRequestError(TRIP_ERROR_MESSAGE.TRIP_TIME_CONFLICT)
    const insertedTrip = await prisma.trip.create({
        data: {
            userId: data.userId as string,
            destination: data.destination,
            endDate: data.endDate,
            startDate: data.startDate,
        }
    })
    return {
        destination: insertedTrip.destination,
        endDate: insertedTrip.endDate,
        startDate: insertedTrip.startDate,
        tripId: insertedTrip.tripId
    }
}

const updateTrip = async (data: UpdateTripRequest): Promise<UpdateTripResponseData> => {
    const foundTrip = await prisma.trip.findFirst({
        where: {
            tripId: data.tripId
        }
    })
    if (!foundTrip) throwRequestError(GENERAL_ERROR_MESSAGE.DATA_NOT_EXISTS)
    const updatedTrip = await prisma.trip.update({
        where: {
            tripId: data.tripId
        },
        data: {
            destination: data.destination,
            endDate: data.endDate,
            startDate: data.startDate
        }
    })
    return {
        updatedTripId: updatedTrip.tripId
    }
}

const deleteTrip = async (tripId: string): Promise<DeleteTripResponseData> => {
    const foundTrip = await prisma.trip.findFirst({
        where: { tripId }
    })
    if (!foundTrip) throwRequestError(GENERAL_ERROR_MESSAGE.DATA_NOT_EXISTS)
    await prisma.trip.delete({
        where: { tripId }
    })
    return { deletedTripId: tripId }
}

const listTrip = async ({ limit, offset }: ListTripRequest, userId: string): Promise<ListTripResponseData> => {
    const listTrip = await prisma.trip.findMany({
        where: { userId },
        skip: offset,
        take: limit,
        orderBy: {
            startDate: 'desc'
        }
    })
    return listTrip.map(e => ({
        destination: e.destination,
        endDate: e.endDate,
        startDate: e.startDate,
        tripId: e.tripId
    }))
}

export const tripUsecase = {
    insertTrip,
    updateTrip,
    deleteTrip,
    listTrip
}