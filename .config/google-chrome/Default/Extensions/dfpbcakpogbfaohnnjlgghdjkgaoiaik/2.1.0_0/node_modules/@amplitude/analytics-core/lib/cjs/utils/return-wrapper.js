Object.defineProperty(exports, "__esModule", { value: true });
exports.returnWrapper = void 0;
var tslib_1 = require("tslib");
var returnWrapper = function (fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return ({
            promise: fn.apply(void 0, tslib_1.__spreadArray([], tslib_1.__read(args), false)),
        });
    };
};
exports.returnWrapper = returnWrapper;
//# sourceMappingURL=return-wrapper.js.map