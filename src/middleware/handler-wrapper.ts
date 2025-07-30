import { Request, Response, NextFunction } from "express";

import { LogicHandler } from "./interface";

export const handlerWrapper = (handler: LogicHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const handledLogic = await handler(req)
            res.status(handledLogic.statusCode || 200).json(handledLogic.data)
        } catch (error) {
            next(error)
        }
    }
}
