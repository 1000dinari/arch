import { Config, Event, EventCallback, Plugin, Result } from '@amplitude/analytics-types';
export declare class Timeline {
    queue: [Event, EventCallback][];
    applying: boolean;
    plugins: Plugin[];
    register(plugin: Plugin, config: Config): Promise<void>;
    deregister(pluginName: string): Promise<void>;
    reset(): void;
    push(event: Event): Promise<Result>;
    scheduleApply(timeout: number): void;
    apply(item: [Event, EventCallback] | undefined): Promise<void>;
    flush(): Promise<void>;
}
//# sourceMappingURL=timeline.d.ts.map