import { NextFunction, Request, Response } from "express";
import { CustomError, ErrorResponse } from "./interface";
import { RESPONSE_CODE } from "../constants/response-code";

export const errorHandler = (err: CustomError | Error, _: Request, res: Response, __: NextFunction) => {
  const errorCode = (err as CustomError).statusCode || RESPONSE_CODE.INTERNAL_SERVER_ERROR;
  const message = (err as CustomError).message || 'Internal Server Error';

  // Log full error details for debugging in 500 errors
  if (errorCode === 500) {
    console.error('Internal Server Error:', {
      message: (err as Error).message,
      stack: (err as Error).stack,
      additionalDetails: err, // Log any additional error properties
    });
  }

  const responseJson: ErrorResponse = { errorCode, message };
  res.status(errorCode).json(responseJson);
};

export const throwRequestError = (message: string, statusCode = RESPONSE_CODE.BAD_REQUEST): void => {
  throw ({
    statusCode,
    message
  })
}