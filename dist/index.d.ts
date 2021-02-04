interface importDevices {
    [key: string]: number;
}
interface ObserverOptions {
    resizeDebounce?: number;
    mobileFirst?: boolean;
}
export declare enum operators {
    equal = "=",
    more = ">",
    moreOrEqual = ">=",
    less = "<",
    lessOrEqual = "<="
}
/**
 * @param {importDevices} devices - Collection of devices and its breakpoints from which they start
 * For example: {
 *   'mobile': 0,
 *   'tablet': 768,
 *   'desktop': 1024,
 * }
 * @param {ObserverOptions} options
 */
export declare class DeviceObserver<Devices extends importDevices> {
    private _devices;
    private _deviceChangeCallbacks;
    private _resizeCallbacks;
    private _debounceTimeoutId;
    private _currentDevice;
    private _options;
    constructor(devices: Devices, options?: ObserverOptions);
    private _sortDevices;
    private _onWindowResize;
    private _handleWindowResize;
    private get _getCurrentDevice();
    private _invokeResize;
    private _invokeDeviceChange;
    /**
     * @param {number} pixelsValue - width in pixels to compare with
     * @return {boolean}
     */
    isGreaterOrEqual: (pixelsValue: number) => boolean;
    /**
     * @param {number} pixelsValue - width in pixels to compare with
     * @return {boolean}
     */
    isLowerOrEqual: (pixelsValue: number) => boolean;
    private _getDeviceIndex;
    subscribeOnResize(cb: (deviceName: keyof Devices) => void): CallableFunction;
    subscribeOnChange(cb: (newDeviceName: keyof Devices, oldDeviceName: keyof Devices) => void): CallableFunction;
    is(operator: operators, deviceName: keyof Devices): boolean;
}
export {};
//# sourceMappingURL=index.d.ts.map