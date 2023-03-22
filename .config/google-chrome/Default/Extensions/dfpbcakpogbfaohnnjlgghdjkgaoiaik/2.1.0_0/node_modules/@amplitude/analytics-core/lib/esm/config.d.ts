import { Event, Config as IConfig, Logger as ILogger, InitOptions, LogLevel, Storage, Transport, Plan, IngestionMetadata, ServerZone } from '@amplitude/analytics-types';
import { Logger } from './logger';
export declare const getDefaultConfig: () => {
    flushMaxRetries: number;
    flushQueueSize: number;
    flushIntervalMillis: number;
    logLevel: LogLevel;
    loggerProvider: Logger;
    optOut: boolean;
    serverUrl: string;
    serverZone: ServerZone;
    useBatch: boolean;
};
export declare class Config implements IConfig {
    apiKey: string;
    flushIntervalMillis: number;
    flushMaxRetries: number;
    flushQueueSize: number;
    loggerProvider: ILogger;
    logLevel: LogLevel;
    minIdLength?: number;
    plan?: Plan;
    ingestionMetadata?: IngestionMetadata;
    serverUrl: string | undefined;
    serverZone?: ServerZone;
    transportProvider: Transport;
    storageProvider?: Storage<Event[]>;
    useBatch: boolean;
    private _optOut;
    get optOut(): boolean;
    set optOut(optOut: boolean);
    constructor(options: InitOptions<IConfig>);
}
export declare const getServerUrl: (serverZone: ServerZone, useBatch: boolean) => "https://api2.amplitude.com/2/httpapi" | "https://api.eu.amplitude.com/2/httpapi" | "https://api2.amplitude.com/batch" | "https://api.eu.amplitude.com/batch";
export declare const createServerConfig: (serverUrl?: string, serverZone?: ServerZone, useBatch?: boolean) => {
    serverUrl: string;
    serverZone: undefined;
} | {
    serverZone: ServerZone;
    serverUrl: string;
};
//# sourceMappingURL=config.d.ts.map