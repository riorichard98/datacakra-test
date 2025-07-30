import { Request } from "express";

export interface CustomError {
    statusCode?: number;
    message?: string;
}

export interface ErrorResponse {
    errorCode: number;
    message: string;
}

export interface LogicHandler {
    (req: Request): Promise<{ data: any, statusCode?: number }> | { data: any, statusCode: number }
}