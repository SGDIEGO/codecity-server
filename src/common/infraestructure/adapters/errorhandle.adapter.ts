import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { IErrorHandlerAdapter } from "src/common/application";

@Injectable()
export class ErrorHandlerAdapter implements IErrorHandlerAdapter {
    handleControllerError(logger: Logger, error: any): void {
        if (error.status == 500) {
            logger.log(error);
            throw {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error, please check server logs!',
            }
        } else {
            throw error;
        }
    }
}