import { CoreClient, Config, Event, BaseEvent, EventOptions, Identify, Plugin, Revenue, Result } from '@amplitude/analytics-types';
import { Timeline } from './timeline';
export declare class AmplitudeCore<T extends Config> implements CoreClient<T> {
    initializing: boolean;
    name: string;
    config: T;
    timeline: Timeline;
    protected q: CallableFunction[];
    protected dispatchQ: CallableFunction[];
    constructor(name?: string);
    _init(config: T): Promise<void>;
    runQueuedFunctions(queueName: 'q' | 'dispatchQ'): Promise<void>;
    track(eventInput: BaseEvent | string, eventProperties?: Record<string, any>, eventOptions?: EventOptions): Promise<Result>;
    logEvent: (eventInput: BaseEvent | string, eventProperties?: Record<string, any>, eventOptions?: EventOptions) => Promise<Result>;
    identify(identify: Identify, eventOptions?: EventOptions): Promise<Result>;
    groupIdentify(groupType: string, groupName: string | string[], identify: Identify, eventOptions?: EventOptions): Promise<Result>;
    setGroup(groupType: string, groupName: string | string[], eventOptions?: EventOptions): Promise<Result>;
    revenue(revenue: Revenue, eventOptions?: EventOptions): Promise<Result>;
    add(plugin: Plugin): Promise<void>;
    remove(pluginName: string): Promise<void>;
    dispatchWithCallback(event: Event, callback: (result: Result) => void): void;
    dispatch(event: Event): Promise<Result>;
    process(event: Event): Promise<Result>;
    setOptOut(optOut: boolean): void;
    flush(): Promise<void>;
}
//# sourceMappingURL=core-client.d.ts.map