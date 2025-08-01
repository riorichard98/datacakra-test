import { Request, Response, NextFunction } from "express"
import { validateRequest } from "../utils/common"
import { listTripSchema, insertTripSchema, updateTripSchema } from "../joi/schema/trip-joi"
import { tripUsecase } from "../usecase/trip-usecase"
import { LogicHandler } from "../middleware/interface"
import { RESPONSE_CODE } from "../constants/response-code"
import { tripAnalyticsUsecase } from "../usecase/trip-analytics-usecase"
import { generateTripHistoryPdf } from "../usecase/generate-trip-pdf"

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

const tripAnalytics: LogicHandler = async (_: Request) => {
    const data = await tripAnalyticsUsecase.getLatestTripAnalytics()
    return { data }
}

const printTripHistoryPDF = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.userId
        const pdfStream = await generateTripHistoryPdf(userId)
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=trip-history.pdf')

        pdfStream.pipe(res)
    } catch (error) {
        next(error)
    }
}

export const tripHandler = {
    insertTrip,
    updateTrip,
    deleteTrip,
    listTrip,
    tripAnalytics,
    printTripHistoryPDF
}