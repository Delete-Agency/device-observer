const DEFAULT_RESIZE_DEBOUNCE = 100;

class DeviceObserver {
    constructor() {
        this._devices = {};
        this._ascendingDevicesArray = [];
        this._deviceName = null;
        this._deviceIndex = null;
        this._deviceChangeCallbacks = [];

        this._resizeCallbacks = [];
        this._debounceTimeoutId = null;
    }

    /**
     * @param {Object} devices - Collection of devices and its breakpoints from which they start
     * For example: {
     *   'mobile': 0,
     *   'tablet': 768,
     *   'desktop:' 1024,
     * }
     * @param resizeDebounce
     */
    init(devices, resizeDebounce) {
        this._setDevicesData(devices);
        this._resizeDebounce = resizeDebounce || DEFAULT_RESIZE_DEBOUNCE;
        this._updateDeviceData();
        window.addEventListener('resize', this._onWindowResize.bind(this));
    }

    /**
     * Apply desired format and save to the private variable
     * @param devices
     * @private
     */
    _setDevicesData(devices) {
        // save original devices
        this._devices = devices;
        // prepare an array of devices
        // make sure devices are sorted by breakpoints values [['mobile', 0], ['tablet', 768], ['desktop', 1024]]
        this._ascendingDevicesArray = Object.keys(devices).map((deviceName) => [deviceName, devices[deviceName]]).sort((a, b) => a[1] - b[1]);

        if (this._ascendingDevicesArray.length === 0) {
            throw new Error('No devices specified');
        }
        if (this._ascendingDevicesArray[0][1] !== 0) {
            throw new Error('Smallest device name must have breakpoint equal 0');
        }
    }

    _onWindowResize() {
        if (this._debounceTimeoutId !== null) {
            clearTimeout(this._debounceTimeoutId);
        }

        this._debounceTimeoutId = setTimeout(this._handleWindowResize.bind(this), this._resizeDebounce);
    }

    _handleWindowResize() {
        const oldDeviceType = this._deviceName;
        this._updateDeviceData();
        this._invokeResize();
        if (oldDeviceType !== this._deviceName) {
            this._invokeDeviceChange(this._deviceName, oldDeviceType);
        }
    }

    _checkDeviceNameRegistered(deviceName) {
        if (Object.keys(this._devices).indexOf(deviceName) === -1) {
            throw new Error(`Passes device name ${deviceName} was not found among registered: ${Object.keys(this._devices).join(', ')}`)
        }
    }

    _updateDeviceData() {
        // reverse array because of mobile-first
        // create the new array before reverse not to mutate original one
        const currentDevice = [...this._ascendingDevicesArray].reverse().find(deviceData => this._isGreaterOrEqual(deviceData[1]));
        this._deviceIndex = this._ascendingDevicesArray.indexOf(currentDevice);
        this._deviceName = currentDevice[0];
    }

    _invokeResize() {
        this._resizeCallbacks.forEach(cb => cb());
    }

    _invokeDeviceChange(newDeviceType, oldDeviceType) {
        this._deviceChangeCallbacks.forEach(cb => cb(newDeviceType, oldDeviceType));
    }

    _isGreaterOrEqual(pixelsValue) {
        return matchMedia(`only screen and (min-width:${pixelsValue}px)`).matches;
    }

    _getDeviceNameIndex(deviceName) {
        return this._ascendingDevicesArray.findIndex(deviceData => deviceData[0] === deviceName);
    }

    subscribeOnResize(cb) {
        this._resizeCallbacks.push(cb);

        // return unsubscribe method
        return () => {
            this._resizeCallbacks = this._resizeCallbacks.filter(storedCb => storedCb !== cb);
        };
    }

    subscribeOnChange(cb, getInitialValue = false) {
        this._deviceChangeCallbacks.push(cb);
        if (getInitialValue) {
            cb(this._deviceName);
        }

        // return unsubscribe method
        return () => {
            this._deviceChangeCallbacks = this._deviceChangeCallbacks.filter(storedCb => storedCb !== cb);
        };
    }

    is(operator, deviceName) {
        switch (operator) {
            case '=':
                return this.isMatch(deviceName);
            case '>':
                return this.isGt(deviceName);
            case '>=':
                return this.isGe(deviceName);
            case '<':
                return this.isLt(deviceName);
            case '<=':
                return this.isLe(deviceName);
            default:
                throw new Error('Unexpected operator received. You can use only the following: =, >, >=, <, <=');
        }
    }

    isMatch(deviceName) {
        this._checkDeviceNameRegistered(deviceName);
        return this._deviceName === deviceName;
    }

    isGt(deviceName) {
        this._checkDeviceNameRegistered(deviceName);
        return this._deviceIndex > this._getDeviceNameIndex(deviceName);
    }

    isGe(deviceName) {
        this._checkDeviceNameRegistered(deviceName);
        return this._deviceIndex >= this._getDeviceNameIndex(deviceName);
    }

    isLt(deviceName) {
        this._checkDeviceNameRegistered(deviceName);
        return this._deviceIndex < this._getDeviceNameIndex(deviceName);
    }

    isLe(deviceName) {
        this._checkDeviceNameRegistered(deviceName);
        return this._deviceIndex <= this._getDeviceNameIndex(deviceName);
    }

    // todo consider removing
    /**
     * @param {number} value - width in pixels to compare with
     * @return {boolean}
     */
    isGeCustom(value) {
        return this._isGreaterOrEqual(value);
    }
}

export default (new DeviceObserver());
