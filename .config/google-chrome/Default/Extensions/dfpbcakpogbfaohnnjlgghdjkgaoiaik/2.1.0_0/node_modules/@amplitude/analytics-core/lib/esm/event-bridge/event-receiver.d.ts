import { Config, CoreClient, Event, EventBridgeReceiver } from '@amplitude/analytics-types';
import { EventChannel } from './event-channel';
export declare class AnalyticsEventReceiver implements EventBridgeReceiver {
    private client;
    constructor(client: CoreClient<Config>);
    receive(_channel: EventChannel, event: Event): void;
}
//# sourceMappingURL=event-receiver.d.ts.map