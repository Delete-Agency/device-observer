# Device Observer

When you style you components in CSS using media queries it's quite often when for a particular component CSS 
is just not powerful enough to fulfill you needs.
Then you have to use JS for that purpose so you copy your breakpoint and use something like 
window.addEventListener('resize', ...) and rely on window.outerWidth/innerWidth.

Besides in some cases window.outerWidth/innerWidth can be inconsistent in different browsers (see [here](https://delete-agency.github.io/device-observer/examples/window-width-test.html))
so relying on them is not very safe, adding another addEventListener and "window.innerWidth > 1280" 
just makes your code less maintainable.

Device Observer allows you to configure your breakpoints once and then write media queries conditions in JS the same way you are used to in CSS
<br>It uses window.matchMedia that always returns correct results.
Supports both mobile and desktop-first approaches (can be configured via options).

[Live Demo](https://delete-agency.github.io/device-observer/)

## Installation

Use the package manager [npm](https://docs.npmjs.com/about-npm/) for installation.

```
$ npm install @deleteagency/device-observer
```

## Usage

```js
import deviceObserver from  '@deleteagency/device-observer';

deviceObserver.init({
    'mobile': 0,
    'tablet': 768,
    'desktop': 1024
});

if(deviceObserver.is('>=', 'tablet')){
    console.log('Tablet and above. Do dome logic')
}

deviceObserver.subscribeOnChange((newDevice, oldDevice) => {
    if(deviceObserver.is('<', 'tablet')){
        console.log('Small device was detected. Do dome logic')
    }
})
```

## API

### init(devices, options = {})
Sets options described in Options section

#### options
*Required*<br>
Type: `Object`

##### resizeDebounce 
Debounce time in milliseconds for handling window resize event. Default value - `50`. 

##### mobileFirst
Whether to use mobileFirst approach in current device determining. Default value - `true`

### subscribeOnChange(cb)
Subscribe on device change. Passed callback function will be called every time device is changes 
(in terms of user devices passed as the first argument to deviceObserver.init())

#### cb
*Required*<br>
Type: `Function`

Callback function what has the following signature: `function cb(newDeviceName, oldDeviceName)`

### isMatch(deviceName), isGt(deviceName), isGe(deviceName), isLt(deviceName), isLe(deviceName)
Returns `Boolean`

Returns whether current device matches (is greater then, is greater or even, is lower then, is lower or even) passed device name

#### deviceName
*Required*<br>
Type: `string`

### is(operator, deviceName) 
Returns `Boolean`

Just an alias for the above methods

#### operator
*Required*<br>
Type: `string`

Allowed values: '=', '>', '>=', '<', '<='

#### deviceName
*Required*<br>
Type: `string`

## License
[MIT](https://choosealicense.com/licenses/mit/)