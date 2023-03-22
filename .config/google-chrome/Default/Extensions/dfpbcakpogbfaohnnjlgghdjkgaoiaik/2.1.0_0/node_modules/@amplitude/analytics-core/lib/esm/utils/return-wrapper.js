import { __read, __spreadArray } from "tslib";
export var returnWrapper = function (fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return ({
            promise: fn.apply(void 0, __spreadArray([], __read(args), false)),
        });
    };
};
//# sourceMappingURL=return-wrapper.js.map