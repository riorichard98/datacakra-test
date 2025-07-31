import { Request } from "express"
import { validateRequest } from "../utils/common"
import { upsertTouristSchema, listTouristSchema } from "../joi/schema/tourist-joi"
import { touristUsecase } from "../usecase/tourist-usecase"
import { LogicHandler } from "../middleware/interface"

const upsertTourist: LogicHandler = async (req: Request) => {
    const validatedBody = validateRequest(upsertTouristSchema, req.body)
    const data = await touristUsecase.upsertTourist(validatedBody)
    return { data }
}

const touristList: LogicHandler = async (req: Request) => {
    const validatedQuery = validateRequest(listTouristSchema, req.query)
    const data = await touristUsecase.touristList(validatedQuery)
    return { data }
}

const deleteTourist: LogicHandler = async (req: Request) => {
    const data = await touristUsecase.deleteTourist(req.params.userId)
    return { data }
}

export const touristHandler = {
    upsertTourist,
    touristList,
    deleteTourist
}