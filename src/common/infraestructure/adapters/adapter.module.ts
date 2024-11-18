import { Module } from "@nestjs/common";
import { LoggerAdapter } from "./logger.adapter";
import { ErrorHandlerAdapter } from "./errorhandle.adapter";

@Module({
    providers: [LoggerAdapter, ErrorHandlerAdapter],
    exports: [LoggerAdapter, ErrorHandlerAdapter]
})
export class AdapterModule { }