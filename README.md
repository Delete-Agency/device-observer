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
const devices = {
	'mobile': 0,
	'tablet': 768,
	'desktop': 1024,
}

const deviceObserver = new DeviceObserver(devices)

deviceObserver.subscribeOnResize(() => {
	// this will triggered not more than ones at 50ms by default
	console.log('Do some logic on every resize');
});

deviceObserver.subscribeOnChange((newDevice, oldDevice) => {

	if (deviceObserver.is('<', 'desktop')) {
		console.log('Do some logic for smaller devices');
	} else {
		console.log('Do some logic for bigger devices');
	}
});
```

## API

### constructor(devices, options = {})
Sets options described in Options section


#### options
*Required*<br>
Type: `Object`


##### resizeDebounce 
Debounce time in milliseconds for handling window resize event.<br>  
Default value - `50`.<br> 
Type: number


##### mobileFirst
Whether to use mobileFirst approach in current device determining.<br> 
Default value - `true`.<br> 
Type: `Boolean`


### subscribeOnResize(cb)
Subscribe on viewport changing with debounce time. Passed callback function will be called every time viewport is changes


#### cb
*Required*<br>
Type: `(currentDevice) => void`


### subscribeOnChange(cb)
Subscribe on device change. Passed callback function will be called every time device is changes 
(in terms of user devices passed as the first argument to deviceObserver.init())


#### cb
*Required*<br>
Type: `(newDevice, oldDevice) => void`<br> 


### is(operator, deviceName) 
Returns `Boolean`

Just an alias for the above methods


#### operator
*Required*<br>
Type: `string`<br> 
Allowed values: '=', '>', '>=', '<', '<='

#### deviceName
*Required*<br>
Type: `string`


## License
[MIT](https://choosealicense.com/licenses/mit/)