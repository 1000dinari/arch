import { Config, LogConfig } from '@amplitude/analytics-types';
import { AmplitudeCore } from '../core-client';
export declare const getStacktrace: (ignoreDepth?: number) => string[];
export declare const getClientLogConfig: (client: AmplitudeCore<Config>) => () => LogConfig;
export declare const getValueByStringPath: (obj: any, path: string) => any;
export declare const getClientStates: (client: AmplitudeCore<Config>, paths: Array<string>) => () => {
    [key: string]: any;
};
export declare const debugWrapper: <T extends any[], R>(fn: (...args: T) => R, fnName: string, getLogConfig: () => LogConfig, getStates?: (() => {
    [key: string]: any;
}) | undefined, fnContext?: any) => (...args: T) => R;
//# sourceMappingURL=debug.d.ts.map