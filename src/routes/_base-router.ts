import { Router } from "express";

import authRouter from "./auth-router";

import { invalidRouter } from "../middleware/invalid-route-handler";
import touristRouter from "./tourist-router";
import tripRouter from "./trip-router";

const baseRouter = Router();

baseRouter.use('/auth', authRouter);
baseRouter.use('/tourists', touristRouter);
baseRouter.use('/trips', tripRouter);

baseRouter.all('*', invalidRouter);

export default baseRouter;