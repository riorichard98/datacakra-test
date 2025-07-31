import { Router } from "express";

import { tripHandler } from "../handler/trip-handler";
import { handlerWrapper as h } from "../middleware/handler-wrapper";
import { adminMiddleware, authMiddleware } from "../middleware/auth-middleware";

const tripRouter = Router();

tripRouter.use(authMiddleware)

tripRouter.get('', h(tripHandler.listTrip)); // list trip

tripRouter.use(adminMiddleware) // admin only
tripRouter.post('', h(tripHandler.insertTrip)); // insert trip
tripRouter.put('', h(tripHandler.updateTrip)) // update trip
tripRouter.delete('/:tripId', h(tripHandler.deleteTrip)); // delete trip

export default tripRouter;