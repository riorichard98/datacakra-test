import { Request } from "express"
import { validateRequest } from "../utils/common"
import { loginSchema } from "../joi/schema/auth-joi"
import { authUsecase } from "../usecase/auth-usecase"
import { LogicHandler } from "../middleware/interface"

const login: LogicHandler = async (req: Request) => {
    const validatedBody = validateRequest(loginSchema, req.body)
    const data = await authUsecase.login(validatedBody)
    return { data }
}

export const authHandler = {
    login
}