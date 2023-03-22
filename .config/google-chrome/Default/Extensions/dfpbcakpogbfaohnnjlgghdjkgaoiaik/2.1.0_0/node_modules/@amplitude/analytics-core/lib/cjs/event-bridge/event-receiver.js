Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsEventReceiver = void 0;
var AnalyticsEventReceiver = /** @class */ (function () {
    function AnalyticsEventReceiver(client) {
        this.client = client;
    }
    AnalyticsEventReceiver.prototype.receive = function (_channel, event) {
        var _this = this;
        this.client.config.loggerProvider.log("Receive event from event bridge ".concat(event.event_type));
        this.client
            .track({
            event_type: event.event_type,
            event_properties: event.event_properties,
            user_properties: event.user_properties,
            groups: event.groups,
            group_properties: event.group_properties,
        })
            // Due to non-awaitable async interface, code is unreachable in test environment
            .catch(
        /* istanbul ignore next */ function (error) {
            _this.client.config.loggerProvider.error(error);
        });
    };
    return AnalyticsEventReceiver;
}());
exports.AnalyticsEventReceiver = AnalyticsEventReceiver;
//# sourceMappingURL=event-receiver.js.map