# Device Observer

[Live Demo](https://delete-agency.github.io/device-observer/)

## Motivation

TODO 

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

deviceObserver.subscribeOnChange(() => {
    if(deviceObserver.is('>=', 'tablet')){
        console.log('Tablet and above. Do dome logic')
    }
})
```

## API

### deviceObserver.init(devices, [debounceMs])

Sets options described in Options section

#### options

*Required*<br>
Type: `Object`

### deviceObserver.subscribeOnChange(cb)

Subscribe on device change. Passed callback function will be called every time device is changes 
(in terms of user devices passed as the first argument to deviceObserver.init())

#### cb

*Required*<br>
Type: `Function`


## License
[MIT](https://choosealicense.com/licenses/mit/)