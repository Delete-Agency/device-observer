const DEFAULT_RESIZE_DEBOUNCE = 50;

interface DeviceInfo<devices> {
    size: number;
    name: keyof devices;
    index: number;
}

interface importDevices {
    [key: string]: number;
}

interface ObserverOptions {
    resizeDebounce?: number;
    mobileFirst?: boolean;
}

export enum operators {
    equal = '=',
    more = '>',
    moreOrEqual = '>=',
    less = '<',
    lessOrEqual = '<='
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

export class DeviceObserver<Devices extends importDevices> {
    private _devices: DeviceInfo<Devices>[] = [];
    private _deviceChangeCallbacks: CallableFunction[] = [];
    private _resizeCallbacks: CallableFunction[] = [];
    private _debounceTimeoutId: number = 0;
    private _currentDevice: DeviceInfo<Devices> = { size: 0, name: '', index: 0 };
    private _options: ObserverOptions = { resizeDebounce: DEFAULT_RESIZE_DEBOUNCE, mobileFirst: true };

    constructor(devices: Devices, options?: ObserverOptions) {
        this._devices = this._sortDevices(devices);
        if (options) this._options = Object.assign(this._options, options);
        const device = this._getCurrentDevice;
        if (device) this._currentDevice = device;
        window.addEventListener('resize', this._onWindowResize);
    }

    private _sortDevices = (devices: Devices) => Object
            .keys(devices)
            .sort((a, b) => devices[a] - devices[b])
            .map((name, index) => ({
                size: devices[name], name, index
            }));

    private _onWindowResize = () => {
        if (this._debounceTimeoutId !== null) {
            clearTimeout(this._debounceTimeoutId);
        }

        this._debounceTimeoutId = setTimeout(this._handleWindowResize, this._options.resizeDebounce);
    }

    private _handleWindowResize = (): void => {
        const oldDeviceName = this._currentDevice.name;
        const newDevice = this._getCurrentDevice;
        this._invokeResize();
        if (newDevice) {
            this._currentDevice = newDevice;
            if (oldDeviceName !== newDevice.name) {
                this._invokeDeviceChange(oldDeviceName);
            }
        }
    }

    private get _getCurrentDevice() {
        return this._options.mobileFirst
            ? [...this._devices]
                .reverse()
                .find(({ size }) => this.isGreaterOrEqual(size))
            : this._devices
                .find(({ size }) => this.isLowerOrEqual(size));
    }

    private _invokeResize(): void {
        this._resizeCallbacks.forEach(cb => cb(this._currentDevice.name));
    }

    private _invokeDeviceChange(oldDeviceName: keyof Devices): void {
        this._deviceChangeCallbacks.forEach(cb => cb(this._currentDevice.name, oldDeviceName));
    }

    /**
     * @param {number} pixelsValue - width in pixels to compare with
     * @return {boolean}
     */

    public isGreaterOrEqual = (pixelsValue: number): boolean =>
        matchMedia(`only screen and (min-width:${pixelsValue}px)`).matches;


    /**
     * @param {number} pixelsValue - width in pixels to compare with
     * @return {boolean}
     */

    public isLowerOrEqual = (pixelsValue: number): boolean =>
        matchMedia(`only screen and (max-width:${pixelsValue === Infinity ? 10000 : pixelsValue}px)`).matches;

    private _getDeviceIndex = (deviceName: keyof Devices): number =>
        this._devices.findIndex(device => device.name === deviceName);


    public subscribeOnResize(cb: (deviceName: keyof Devices) => void): CallableFunction {
        this._resizeCallbacks.push(cb);

        // return unsubscribe method
        return () => {
            this._resizeCallbacks = this._resizeCallbacks.filter(storedCb => storedCb !== cb);
        };
    }

    public subscribeOnChange(cb: (newDeviceName: keyof Devices, oldDeviceName: keyof Devices) => void): CallableFunction {
        this._deviceChangeCallbacks.push(cb);

        // return unsubscribe method
        return () => {
            this._deviceChangeCallbacks = this._deviceChangeCallbacks.filter(storedCb => storedCb !== cb);
        };
    }

    public is(operator: operators, deviceName: keyof Devices): boolean {
        const _index = this._getDeviceIndex(deviceName);
        if (this._devices[_index]) {
            const { index } = this._currentDevice;
            switch (operator) {
                case operators.equal: return index === _index
                case operators.more: return index > _index
                case operators.moreOrEqual: return index >= _index
                case operators.less: return index < _index
                case operators.lessOrEqual: return index <= _index
            }
        }
        return false;
    }
}
