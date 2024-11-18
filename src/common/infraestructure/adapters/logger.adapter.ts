import { Logger } from "@nestjs/common";
import { ILoggerAdapter } from "src/common/application/adapters/logger.adapter";

export class LoggerAdapter implements ILoggerAdapter {
    constructor(
        private readonly logger: Logger
    ) {}
    log(obj: any): void {
        this.logger.log(obj)
    }
}