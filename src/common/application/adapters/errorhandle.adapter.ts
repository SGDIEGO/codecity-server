import { Logger } from "@nestjs/common";
import { ILoggerAdapter } from "./logger.adapter";

export interface IErrorHandlerAdapter {
    handleControllerError(logger: ILoggerAdapter, error: any): void;
}