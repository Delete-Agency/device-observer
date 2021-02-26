!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define("device-observer",[],n):"object"==typeof exports?exports["device-observer"]=n():e["device-observer"]=n()}(this,(function(){return function(){"use strict";var e={809:function(e,n,t){function r(){return(r=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}function i(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var s;t.r(n),t.d(n,{operators:function(){return s},DeviceObserver:function(){return c}}),function(e){e.equal="=",e.more=">",e.moreOrEqual=">=",e.less="<",e.lessOrEqual="<="}(s||(s={}));var c=function(){function e(n,t){var i=this;!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),o(this,"_devices",[]),o(this,"_deviceChangeCallbacks",[]),o(this,"_resizeCallbacks",[]),o(this,"_debounceTimeoutId",0),o(this,"_currentDevice",{size:0,name:"",index:0}),o(this,"_options",{resizeDebounce:50,mobileFirst:!0}),o(this,"_sortDevices",(function(e){return Object.keys(e).sort((function(n,t){return e[n]-e[t]})).map((function(n,t){return{size:e[n],name:n,index:t}}))})),o(this,"_onWindowResize",(function(){null!==i._debounceTimeoutId&&clearTimeout(i._debounceTimeoutId),i._debounceTimeoutId=setTimeout(i._handleWindowResize,i._options.resizeDebounce)})),o(this,"_handleWindowResize",(function(){var e=i._currentDevice.name,n=i._getCurrentDevice;i._invokeResize(),n&&(i._currentDevice=n,e!==n.name&&i._invokeDeviceChange(e))})),o(this,"isGreaterOrEqual",(function(e){return matchMedia("only screen and (min-width:".concat(e,"px)")).matches})),o(this,"isLowerOrEqual",(function(e){return matchMedia("only screen and (max-width:".concat(e===1/0?1e4:e,"px)")).matches})),o(this,"_getDeviceIndex",(function(e){return i._devices.findIndex((function(n){return n.name===e}))})),this._devices=this._sortDevices(n),t&&(this._options=r(this._options,t));var s=this._getCurrentDevice;s&&(this._currentDevice=s),window.addEventListener("resize",this._onWindowResize)}var n,t;return n=e,(t=[{key:"_getCurrentDevice",get:function(){var e=this;return this._options.mobileFirst?this._devices.find((function(n){var t=n.size;return e.isLowerOrEqual(t)})):this._devices.reverse().find((function(n){var t=n.size;return e.isGreaterOrEqual(t)}))}},{key:"_invokeResize",value:function(){var e=this;this._resizeCallbacks.forEach((function(n){return n(e._currentDevice.name)}))}},{key:"_invokeDeviceChange",value:function(e){var n=this;this._deviceChangeCallbacks.forEach((function(t){return t(n._currentDevice.name,e)}))}},{key:"subscribeOnResize",value:function(e){var n=this;return this._resizeCallbacks.push(e),function(){n._resizeCallbacks=n._resizeCallbacks.filter((function(n){return n!==e}))}}},{key:"subscribeOnChange",value:function(e){var n=this;return this._deviceChangeCallbacks.push(e),function(){n._deviceChangeCallbacks=n._deviceChangeCallbacks.filter((function(n){return n!==e}))}}},{key:"is",value:function(e,n){var t=this._getDeviceIndex(n);if(this._devices[t]){var r=this._currentDevice.index;switch(e){case s.equal:return r===t;case s.more:return r>t;case s.moreOrEqual:return r>=t;case s.less:return r<t;case s.lessOrEqual:return r<=t}}return!1}}])&&i(n.prototype,t),e}()}},n={};function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{}};return e[r](i,i.exports,t),i.exports}return t.d=function(e,n){for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t(809)}()}));
//# sourceMappingURL=index.js.map