export declare const returnWrapper: <T extends (...args: any) => any>(fn: T) => (...args: Parameters<T>) => {
    promise: ReturnType<T>;
};
//# sourceMappingURL=return-wrapper.d.ts.map