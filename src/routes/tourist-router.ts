import { Router } from "express";

import { touristHandler } from "../handler/tourist-handler";
import { handlerWrapper as h } from "../middleware/handler-wrapper";
import { adminMiddleware, authMiddleware } from "../middleware/auth-middleware";

const touristRouter = Router();

touristRouter.use(authMiddleware)
touristRouter.use(adminMiddleware)  // admin only

touristRouter.post('', h(touristHandler.upsertTourist)) // upsert tourist
touristRouter.get('', h(touristHandler.touristList)) // list tourist
touristRouter.delete('/:userId', h(touristHandler.deleteTourist)) // delete tourist

export default touristRouter;