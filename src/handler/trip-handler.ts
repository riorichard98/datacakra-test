import { Request } from "express"
import { validateRequest } from "../utils/common"
import { listTripSchema, insertTripSchema, updateTripSchema } from "../joi/schema/trip-joi"
import { tripUsecase } from "../usecase/trip-usecase"
import { LogicHandler } from "../middleware/interface"
import { RESPONSE_CODE } from "../constants/response-code"

const insertTrip: LogicHandler = async (req: Request) => {
    const validatedBody = validateRequest(insertTripSchema, req.body)
    const data = await tripUsecase.insertTrip(validatedBody)
    return { data, statusCode: RESPONSE_CODE.CREATED }
}

const updateTrip: LogicHandler = async (req: Request) => {
    const validatedBody = validateRequest(updateTripSchema, req.body)
    const data = await tripUsecase.updateTrip(validatedBody)
    return { data }
}

const deleteTrip: LogicHandler = async (req: Request) => {
    const data = await tripUsecase.deleteTrip(req.params.tripId)
    return { data }
}

const listTrip: LogicHandler = async (req: Request) => {
    const validatedQuery = validateRequest(listTripSchema, req.query)
    const data = await tripUsecase.listTrip(validatedQuery, req.user.userId)
    return { data }
}

export const tripHandler = {
    insertTrip,
    updateTrip,
    deleteTrip,
    listTrip
}