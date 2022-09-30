/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var transitionalDefaults = __webpack_require__(/*! ../defaults/transitional */ "./node_modules/axios/lib/defaults/transitional.js");
var AxiosError = __webpack_require__(/*! ../core/AxiosError */ "./node_modules/axios/lib/core/AxiosError.js");
var CanceledError = __webpack_require__(/*! ../cancel/CanceledError */ "./node_modules/axios/lib/cancel/CanceledError.js");
var parseProtocol = __webpack_require__(/*! ../helpers/parseProtocol */ "./node_modules/axios/lib/helpers/parseProtocol.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData) && utils.isStandardBrowserEnv()) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);

    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      var transitional = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError(
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function(cancel) {
        if (!request) {
          return;
        }
        reject(!cancel || (cancel && cancel.type) ? new CanceledError() : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    if (!requestData) {
      requestData = null;
    }

    var protocol = parseProtocol(fullPath);

    if (protocol && [ 'http', 'https', 'file' ].indexOf(protocol) === -1) {
      reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults/index.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Expose Cancel & CancelToken
axios.CanceledError = __webpack_require__(/*! ./cancel/CanceledError */ "./node_modules/axios/lib/cancel/CanceledError.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
axios.VERSION = (__webpack_require__(/*! ./env/data */ "./node_modules/axios/lib/env/data.js").version);
axios.toFormData = __webpack_require__(/*! ./helpers/toFormData */ "./node_modules/axios/lib/helpers/toFormData.js");

// Expose AxiosError class
axios.AxiosError = __webpack_require__(/*! ../lib/core/AxiosError */ "./node_modules/axios/lib/core/AxiosError.js");

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "./node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports["default"] = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var CanceledError = __webpack_require__(/*! ./CanceledError */ "./node_modules/axios/lib/cancel/CanceledError.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;

  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;

  // eslint-disable-next-line func-names
  this.promise.then(function(cancel) {
    if (!token._listeners) return;

    var i;
    var l = token._listeners.length;

    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });

  // eslint-disable-next-line func-names
  this.promise.then = function(onfulfilled) {
    var _resolve;
    // eslint-disable-next-line func-names
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);

    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };

    return promise;
  };

  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new CanceledError(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `CanceledError` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Subscribe to the cancel signal
 */

CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }

  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};

/**
 * Unsubscribe from the cancel signal
 */

CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CanceledError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CanceledError.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var AxiosError = __webpack_require__(/*! ../core/AxiosError */ "./node_modules/axios/lib/core/AxiosError.js");
var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function CanceledError(message) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED);
  this.name = 'CanceledError';
}

utils.inherits(CanceledError, AxiosError, {
  __CANCEL__: true
});

module.exports = CanceledError;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var buildFullPath = __webpack_require__(/*! ./buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var validator = __webpack_require__(/*! ../helpers/validator */ "./node_modules/axios/lib/helpers/validator.js");

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(configOrUrl, config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof configOrUrl === 'string') {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  var fullPath = buildFullPath(config.baseURL, config.url);
  return buildURL(fullPath, config.params, config.paramsSerializer);
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method: method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url: url,
        data: data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/AxiosError.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/core/AxiosError.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);
  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}

utils.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});

var prototype = AxiosError.prototype;
var descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED'
// eslint-disable-next-line func-names
].forEach(function(code) {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = function(error, code, config, request, response, customProps) {
  var axiosError = Object.create(prototype);

  utils.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  });

  AxiosError.call(axiosError, error.message, code, config, request, response);

  axiosError.name = error.name;

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

module.exports = AxiosError;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults/index.js");
var CanceledError = __webpack_require__(/*! ../cancel/CanceledError */ "./node_modules/axios/lib/cancel/CanceledError.js");

/**
 * Throws a `CanceledError` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new CanceledError();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  var mergeMap = {
    'url': valueFromConfig2,
    'method': valueFromConfig2,
    'data': valueFromConfig2,
    'baseURL': defaultToConfig2,
    'transformRequest': defaultToConfig2,
    'transformResponse': defaultToConfig2,
    'paramsSerializer': defaultToConfig2,
    'timeout': defaultToConfig2,
    'timeoutMessage': defaultToConfig2,
    'withCredentials': defaultToConfig2,
    'adapter': defaultToConfig2,
    'responseType': defaultToConfig2,
    'xsrfCookieName': defaultToConfig2,
    'xsrfHeaderName': defaultToConfig2,
    'onUploadProgress': defaultToConfig2,
    'onDownloadProgress': defaultToConfig2,
    'decompress': defaultToConfig2,
    'maxContentLength': defaultToConfig2,
    'maxBodyLength': defaultToConfig2,
    'beforeRedirect': defaultToConfig2,
    'transport': defaultToConfig2,
    'httpAgent': defaultToConfig2,
    'httpsAgent': defaultToConfig2,
    'cancelToken': defaultToConfig2,
    'socketPath': defaultToConfig2,
    'responseEncoding': defaultToConfig2,
    'validateStatus': mergeDirectKeys
  };

  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var AxiosError = __webpack_require__(/*! ./AxiosError */ "./node_modules/axios/lib/core/AxiosError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError(
      'Request failed with status code ' + response.status,
      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults/index.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults/index.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/defaults/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ../helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");
var AxiosError = __webpack_require__(/*! ../core/AxiosError */ "./node_modules/axios/lib/core/AxiosError.js");
var transitionalDefaults = __webpack_require__(/*! ./transitional */ "./node_modules/axios/lib/defaults/transitional.js");
var toFormData = __webpack_require__(/*! ../helpers/toFormData */ "./node_modules/axios/lib/helpers/toFormData.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ../adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ../adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: transitionalDefaults,

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }

    var isObjectPayload = utils.isObject(data);
    var contentType = headers && headers['Content-Type'];

    var isFileList;

    if ((isFileList = utils.isFileList(data)) || (isObjectPayload && contentType === 'multipart/form-data')) {
      var _FormData = this.env && this.env.FormData;
      return toFormData(isFileList ? {'files[]': data} : data, _FormData && new _FormData());
    } else if (isObjectPayload || contentType === 'application/json') {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: __webpack_require__(/*! ./env/FormData */ "./node_modules/axios/lib/helpers/null.js")
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),

/***/ "./node_modules/axios/lib/defaults/transitional.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/defaults/transitional.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};


/***/ }),

/***/ "./node_modules/axios/lib/env/data.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/env/data.js ***!
  \********************************************/
/***/ ((module) => {

module.exports = {
  "version": "0.27.2"
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return utils.isObject(payload) && (payload.isAxiosError === true);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/null.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/null.js ***!
  \************************************************/
/***/ ((module) => {

// eslint-disable-next-line strict
module.exports = null;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseProtocol.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseProtocol.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function parseProtocol(url) {
  var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/toFormData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/toFormData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Convert a data object to FormData
 * @param {Object} obj
 * @param {?Object} [formData]
 * @returns {Object}
 **/

function toFormData(obj, formData) {
  // eslint-disable-next-line no-param-reassign
  formData = formData || new FormData();

  var stack = [];

  function convertValue(value) {
    if (value === null) return '';

    if (utils.isDate(value)) {
      return value.toISOString();
    }

    if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
      return typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  function build(data, parentKey) {
    if (utils.isPlainObject(data) || utils.isArray(data)) {
      if (stack.indexOf(data) !== -1) {
        throw Error('Circular reference detected in ' + parentKey);
      }

      stack.push(data);

      utils.forEach(data, function each(value, key) {
        if (utils.isUndefined(value)) return;
        var fullKey = parentKey ? parentKey + '.' + key : key;
        var arr;

        if (value && !parentKey && typeof value === 'object') {
          if (utils.endsWith(key, '{}')) {
            // eslint-disable-next-line no-param-reassign
            value = JSON.stringify(value);
          } else if (utils.endsWith(key, '[]') && (arr = utils.toArray(value))) {
            // eslint-disable-next-line func-names
            arr.forEach(function(el) {
              !utils.isUndefined(el) && formData.append(fullKey, convertValue(el));
            });
            return;
          }
        }

        build(value, fullKey);
      });

      stack.pop();
    } else {
      formData.append(parentKey, convertValue(data));
    }
  }

  build(obj);

  return formData;
}

module.exports = toFormData;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var VERSION = (__webpack_require__(/*! ../env/data */ "./node_modules/axios/lib/env/data.js").version);
var AxiosError = __webpack_require__(/*! ../core/AxiosError */ "./node_modules/axios/lib/core/AxiosError.js");

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};

/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new AxiosError(
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        AxiosError.ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}

module.exports = {
  assertOptions: assertOptions,
  validators: validators
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

// eslint-disable-next-line func-names
var kindOf = (function(cache) {
  // eslint-disable-next-line func-names
  return function(thing) {
    var str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  };
})(Object.create(null));

function kindOfTest(type) {
  type = type.toLowerCase();
  return function isKindOf(thing) {
    return kindOf(thing) === type;
  };
}

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return Array.isArray(val);
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
var isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (kindOf(val) !== 'object') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
var isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
var isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
var isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
var isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} thing The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(thing) {
  var pattern = '[object FormData]';
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) ||
    toString.call(thing) === pattern ||
    (isFunction(thing.toString) && thing.toString() === pattern)
  );
}

/**
 * Determine if a value is a URLSearchParams object
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
var isURLSearchParams = kindOfTest('URLSearchParams');

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 */

function inherits(constructor, superConstructor, props, descriptors) {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  props && Object.assign(constructor.prototype, props);
}

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function} [filter]
 * @returns {Object}
 */

function toFlatObject(sourceObj, destObj, filter) {
  var props;
  var i;
  var prop;
  var merged = {};

  destObj = destObj || {};

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if (!merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = Object.getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
}

/*
 * determines whether a string ends with the characters of a specified string
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 * @returns {boolean}
 */
function endsWith(str, searchString, position) {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  var lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}


/**
 * Returns new array from array like object
 * @param {*} [thing]
 * @returns {Array}
 */
function toArray(thing) {
  if (!thing) return null;
  var i = thing.length;
  if (isUndefined(i)) return null;
  var arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
}

// eslint-disable-next-line func-names
var isTypedArray = (function(TypedArray) {
  // eslint-disable-next-line func-names
  return function(thing) {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && Object.getPrototypeOf(Uint8Array));

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM,
  inherits: inherits,
  toFlatObject: toFlatObject,
  kindOf: kindOf,
  kindOfTest: kindOfTest,
  endsWith: endsWith,
  toArray: toArray,
  isTypedArray: isTypedArray,
  isFileList: isFileList
};


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/App.css":
/*!***********************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/App.css ***!
  \***********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n    background-color: gainsboro;\n    font-family: Noto Sans, sans-serif;\n    --yellow-color: #F1B000;\n    --light-yellow-color: #F5C300;\n    --gray-color: rgb(148, 144, 144, 0.3);\n    --light-gray-color: #767675;\n}\n\n.main-form {\n    display: flex;\n}\n\n.categories_and_orders-block {\n    margin-left: 30px;\n}", "",{"version":3,"sources":["webpack://./src/App.css"],"names":[],"mappings":"AAAA;IACI,2BAA2B;IAC3B,kCAAkC;IAClC,uBAAuB;IACvB,6BAA6B;IAC7B,qCAAqC;IACrC,2BAA2B;AAC/B;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,iBAAiB;AACrB","sourcesContent":["body {\n    background-color: gainsboro;\n    font-family: Noto Sans, sans-serif;\n    --yellow-color: #F1B000;\n    --light-yellow-color: #F5C300;\n    --gray-color: rgb(148, 144, 144, 0.3);\n    --light-gray-color: #767675;\n}\n\n.main-form {\n    display: flex;\n}\n\n.categories_and_orders-block {\n    margin-left: 30px;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/Ingredient/Ingredient.css":
/*!*****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/Ingredient/Ingredient.css ***!
  \*****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".item {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    margin-bottom: 40px;\n}\n\n.item-image {\n    width: 180px;\n    height: 180px;\n    background-color: white;\n    border-radius: 100%;\n    border: 10px solid var(--yellow-color);\n    margin-top: 10px;\n    box-shadow: 0px 0px 10px 0px gray;\n}\n\n.item-name {\n    display: flex;\n    justify-content: center;\n    width: 180px;\n    margin-top: 10px;\n    margin-bottom: 5px;\n    border-bottom: 2px solid var(--light-gray-color);\n    text-align: center;\n    font-weight: 600;\n    font-size: 20px;\n    padding-bottom: 10px;\n}\n\n.item-price-block {\n    display: flex;\n    margin-bottom: 0;\n    color: #D96746;\n    font-weight: 600;\n    font-size: 17px;\n}\n\n.price-text,\n.price-value,\n.price-currency {\n    margin-bottom: 0;\n    margin-left: 3px;\n    margin-right: 3px;\n}\n\n.amount-block {\n    width: 115px;\n    display: flex;\n    justify-content: space-between;\n}\n\n.minus-icon {\n    cursor: pointer;\n    background-color: var(--gray-color);\n    width: 20px;\n    height: 20px;\n    border-radius: 100%;\n    box-shadow: 0px 0px 10px 0px gray;\n}\n\n\n.item-counter {\n    width: 40px;\n    height: 20px;\n    text-align: center;\n    border-radius: 5px;\n    border: none;\n    box-shadow: 0px 0px 10px 0px gray;\n}\n\n.plus-icon {\n    cursor: pointer;\n    width: 20px;\n    height: 20px;\n    background-color: var(--gray-color);\n    border-radius: 100%;\n    box-shadow: 0px 0px 10px 0px gray;\n}\n\n.item-button {\n    cursor: pointer;\n    width: 130px;\n    height: 30px;\n    margin-top: 10px;\n    background-color: var(--yellow-color);\n    color: white;\n    font-weight: 600;\n    font-size: 15px;\n    border-style: none;\n    border-bottom: 1px solid black;\n    border-radius: 3px;\n}\n\n.item-button-active {\n    cursor: pointer;\n    width: 130px;\n    height: 30px;\n    margin-top: 10px;\n    background-color: rgb(51, 221, 51);\n    color: white;\n    font-weight: 600;\n    font-size: 15px;\n    border-style: none;\n    border-bottom: 1px solid black;\n    border-radius: 3px;\n}", "",{"version":3,"sources":["webpack://./src/Ingredient/Ingredient.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,mBAAmB;AACvB;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,sCAAsC;IACtC,gBAAgB;IAChB,iCAAiC;AACrC;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,YAAY;IACZ,gBAAgB;IAChB,kBAAkB;IAClB,gDAAgD;IAChD,kBAAkB;IAClB,gBAAgB;IAChB,eAAe;IACf,oBAAoB;AACxB;;AAEA;IACI,aAAa;IACb,gBAAgB;IAChB,cAAc;IACd,gBAAgB;IAChB,eAAe;AACnB;;AAEA;;;IAGI,gBAAgB;IAChB,gBAAgB;IAChB,iBAAiB;AACrB;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,8BAA8B;AAClC;;AAEA;IACI,eAAe;IACf,mCAAmC;IACnC,WAAW;IACX,YAAY;IACZ,mBAAmB;IACnB,iCAAiC;AACrC;;;AAGA;IACI,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,kBAAkB;IAClB,YAAY;IACZ,iCAAiC;AACrC;;AAEA;IACI,eAAe;IACf,WAAW;IACX,YAAY;IACZ,mCAAmC;IACnC,mBAAmB;IACnB,iCAAiC;AACrC;;AAEA;IACI,eAAe;IACf,YAAY;IACZ,YAAY;IACZ,gBAAgB;IAChB,qCAAqC;IACrC,YAAY;IACZ,gBAAgB;IAChB,eAAe;IACf,kBAAkB;IAClB,8BAA8B;IAC9B,kBAAkB;AACtB;;AAEA;IACI,eAAe;IACf,YAAY;IACZ,YAAY;IACZ,gBAAgB;IAChB,kCAAkC;IAClC,YAAY;IACZ,gBAAgB;IAChB,eAAe;IACf,kBAAkB;IAClB,8BAA8B;IAC9B,kBAAkB;AACtB","sourcesContent":[".item {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    margin-bottom: 40px;\n}\n\n.item-image {\n    width: 180px;\n    height: 180px;\n    background-color: white;\n    border-radius: 100%;\n    border: 10px solid var(--yellow-color);\n    margin-top: 10px;\n    box-shadow: 0px 0px 10px 0px gray;\n}\n\n.item-name {\n    display: flex;\n    justify-content: center;\n    width: 180px;\n    margin-top: 10px;\n    margin-bottom: 5px;\n    border-bottom: 2px solid var(--light-gray-color);\n    text-align: center;\n    font-weight: 600;\n    font-size: 20px;\n    padding-bottom: 10px;\n}\n\n.item-price-block {\n    display: flex;\n    margin-bottom: 0;\n    color: #D96746;\n    font-weight: 600;\n    font-size: 17px;\n}\n\n.price-text,\n.price-value,\n.price-currency {\n    margin-bottom: 0;\n    margin-left: 3px;\n    margin-right: 3px;\n}\n\n.amount-block {\n    width: 115px;\n    display: flex;\n    justify-content: space-between;\n}\n\n.minus-icon {\n    cursor: pointer;\n    background-color: var(--gray-color);\n    width: 20px;\n    height: 20px;\n    border-radius: 100%;\n    box-shadow: 0px 0px 10px 0px gray;\n}\n\n\n.item-counter {\n    width: 40px;\n    height: 20px;\n    text-align: center;\n    border-radius: 5px;\n    border: none;\n    box-shadow: 0px 0px 10px 0px gray;\n}\n\n.plus-icon {\n    cursor: pointer;\n    width: 20px;\n    height: 20px;\n    background-color: var(--gray-color);\n    border-radius: 100%;\n    box-shadow: 0px 0px 10px 0px gray;\n}\n\n.item-button {\n    cursor: pointer;\n    width: 130px;\n    height: 30px;\n    margin-top: 10px;\n    background-color: var(--yellow-color);\n    color: white;\n    font-weight: 600;\n    font-size: 15px;\n    border-style: none;\n    border-bottom: 1px solid black;\n    border-radius: 3px;\n}\n\n.item-button-active {\n    cursor: pointer;\n    width: 130px;\n    height: 30px;\n    margin-top: 10px;\n    background-color: rgb(51, 221, 51);\n    color: white;\n    font-weight: 600;\n    font-size: 15px;\n    border-style: none;\n    border-bottom: 1px solid black;\n    border-radius: 3px;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/MainHeader/MainHeader.css":
/*!*****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/MainHeader/MainHeader.css ***!
  \*****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".header {\n    display: flex;\n    justify-content: end;\n}\n\n.login_and_register-button {\n    cursor: pointer;\n    height: 30px;\n    font-family: Noto Sans, sans-serif;\n    background-color: white;\n    border-radius: 5px;\n    border: 1px solid black[];\n}\n\n.login_and_register-button:hover {\n    background-color: #F5C300;\n}\n\n.headline {\n    height: 30px;\n    margin-top: 15px;\n    text-align: center;\n}", "",{"version":3,"sources":["webpack://./src/MainHeader/MainHeader.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,oBAAoB;AACxB;;AAEA;IACI,eAAe;IACf,YAAY;IACZ,kCAAkC;IAClC,uBAAuB;IACvB,kBAAkB;IAClB,yBAAyB;AAC7B;;AAEA;IACI,yBAAyB;AAC7B;;AAEA;IACI,YAAY;IACZ,gBAAgB;IAChB,kBAAkB;AACtB","sourcesContent":[".header {\n    display: flex;\n    justify-content: end;\n}\n\n.login_and_register-button {\n    cursor: pointer;\n    height: 30px;\n    font-family: Noto Sans, sans-serif;\n    background-color: white;\n    border-radius: 5px;\n    border: 1px solid black[];\n}\n\n.login_and_register-button:hover {\n    background-color: #F5C300;\n}\n\n.headline {\n    height: 30px;\n    margin-top: 15px;\n    text-align: center;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/MenuBlock/MenuBlock.css":
/*!***************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/MenuBlock/MenuBlock.css ***!
  \***************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".menu-block {\n    width: 80%;\n}\n\n.items-block {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n}\n\n.logo {\n    width: 200px;\n}", "",{"version":3,"sources":["webpack://./src/MenuBlock/MenuBlock.css"],"names":[],"mappings":"AAAA;IACI,UAAU;AACd;;AAEA;IACI,aAAa;IACb,qCAAqC;AACzC;;AAEA;IACI,YAAY;AAChB","sourcesContent":[".menu-block {\n    width: 80%;\n}\n\n.items-block {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n}\n\n.logo {\n    width: 200px;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/MenuCategories/MenuCategories.css":
/*!*************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/MenuCategories/MenuCategories.css ***!
  \*************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".menu-categories {\n    cursor: pointer;\n    width: 300px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    background-color: white;\n    margin-bottom: 20px;\n}\n\n\n.category {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 100%;\n    height: 45px;\n    margin: 0;\n    font-size: 20px;\n}\n\n.category:hover {\n    background-color: #F6D846;\n}\n\n.category-active {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 100%;\n    height: 45px;\n    margin: 0;\n    font-size: 20px;\n    background-color: var(--light-yellow-color);\n}", "",{"version":3,"sources":["webpack://./src/MenuCategories/MenuCategories.css"],"names":[],"mappings":"AAAA;IACI,eAAe;IACf,YAAY;IACZ,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,uBAAuB;IACvB,mBAAmB;AACvB;;;AAGA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,WAAW;IACX,YAAY;IACZ,SAAS;IACT,eAAe;AACnB;;AAEA;IACI,yBAAyB;AAC7B;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,WAAW;IACX,YAAY;IACZ,SAAS;IACT,eAAe;IACf,2CAA2C;AAC/C","sourcesContent":[".menu-categories {\n    cursor: pointer;\n    width: 300px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    background-color: white;\n    margin-bottom: 20px;\n}\n\n\n.category {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 100%;\n    height: 45px;\n    margin: 0;\n    font-size: 20px;\n}\n\n.category:hover {\n    background-color: #F6D846;\n}\n\n.category-active {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 100%;\n    height: 45px;\n    margin: 0;\n    font-size: 20px;\n    background-color: var(--light-yellow-color);\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/MenuItem/MenuItem.css":
/*!*************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/MenuItem/MenuItem.css ***!
  \*************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".item {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    margin-bottom: 40px;\n}\n\n.item-image {\n    width: 180px;\n    height: 180px;\n    background-color: white;\n    border-radius: 100%;\n    border: 10px solid var(--yellow-color);\n    margin-top: 10px;\n    box-shadow: 0px 0px 10px 0px gray;\n}\n\n.item-name {\n    display: flex;\n    justify-content: center;\n    width: 180px;\n    margin-top: 10px;\n    margin-bottom: 5px;\n    border-bottom: 2px solid var(--light-gray-color);\n    text-align: center;\n    font-weight: 600;\n    font-size: 20px;\n    padding-bottom: 10px;\n}\n\n.item-composition {\n    display: flex;\n    justify-content: center;\n    width: 180px;\n    height: 25px;\n    margin-top: 0;\n    margin-bottom: 10px;\n    color: #448BC8;\n    border-bottom: 2px solid var(--light-gray-color);\n    text-align: center;\n    font-weight: 600;\n    font-size: 10px;\n    text-decoration: underline;\n    padding-bottom: 30px;\n}\n\n.item-price-block {\n    display: flex;\n    margin-bottom: 0;\n    color: #D96746;\n    font-weight: 600;\n    font-size: 17px;\n}\n\n.price-text,\n.price-value,\n.price-currency {\n    margin-bottom: 0;\n    margin-left: 3px;\n    margin-right: 3px;\n}\n\n.item-amount {\n    margin-top: 5px;\n    margin-bottom: 0;\n    font-weight: 600;\n    font-size: 12px;\n}\n\n.amount-block {\n    width: 115px;\n    display: flex;\n    justify-content: space-between;\n}\n\n.minus-icon {\n    cursor: pointer;\n    background-color: var(--gray-color);\n    width: 20px;\n    height: 20px;\n    border-radius: 100%;\n    box-shadow: 0px 0px 10px 0px gray;\n}\n\n\n.item-counter {\n    width: 40px;\n    height: 20px;\n    text-align: center;\n    border-radius: 5px;\n    border: none;\n    box-shadow: 0px 0px 10px 0px gray;\n}\n\n.plus-icon {\n    cursor: pointer;\n    width: 20px;\n    height: 20px;\n    background-color: var(--gray-color);\n    border-radius: 100%;\n    box-shadow: 0px 0px 10px 0px gray;\n}\n\n.item-button {\n    cursor: pointer;\n    width: 130px;\n    height: 30px;\n    margin-top: 10px;\n    background-color: var(--yellow-color);\n    color: white;\n    font-weight: 600;\n    font-size: 15px;\n    border-style: none;\n    border-bottom: 1px solid black;\n    border-radius: 3px;\n}\n\n.item-button-active {\n    cursor: pointer;\n    width: 130px;\n    height: 30px;\n    margin-top: 10px;\n    background-color: rgb(51, 221, 51);\n    color: white;\n    font-weight: 600;\n    font-size: 15px;\n    border-style: none;\n    border-bottom: 1px solid black;\n    border-radius: 3px;\n}", "",{"version":3,"sources":["webpack://./src/MenuItem/MenuItem.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,mBAAmB;AACvB;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,sCAAsC;IACtC,gBAAgB;IAChB,iCAAiC;AACrC;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,YAAY;IACZ,gBAAgB;IAChB,kBAAkB;IAClB,gDAAgD;IAChD,kBAAkB;IAClB,gBAAgB;IAChB,eAAe;IACf,oBAAoB;AACxB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,YAAY;IACZ,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,cAAc;IACd,gDAAgD;IAChD,kBAAkB;IAClB,gBAAgB;IAChB,eAAe;IACf,0BAA0B;IAC1B,oBAAoB;AACxB;;AAEA;IACI,aAAa;IACb,gBAAgB;IAChB,cAAc;IACd,gBAAgB;IAChB,eAAe;AACnB;;AAEA;;;IAGI,gBAAgB;IAChB,gBAAgB;IAChB,iBAAiB;AACrB;;AAEA;IACI,eAAe;IACf,gBAAgB;IAChB,gBAAgB;IAChB,eAAe;AACnB;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,8BAA8B;AAClC;;AAEA;IACI,eAAe;IACf,mCAAmC;IACnC,WAAW;IACX,YAAY;IACZ,mBAAmB;IACnB,iCAAiC;AACrC;;;AAGA;IACI,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,kBAAkB;IAClB,YAAY;IACZ,iCAAiC;AACrC;;AAEA;IACI,eAAe;IACf,WAAW;IACX,YAAY;IACZ,mCAAmC;IACnC,mBAAmB;IACnB,iCAAiC;AACrC;;AAEA;IACI,eAAe;IACf,YAAY;IACZ,YAAY;IACZ,gBAAgB;IAChB,qCAAqC;IACrC,YAAY;IACZ,gBAAgB;IAChB,eAAe;IACf,kBAAkB;IAClB,8BAA8B;IAC9B,kBAAkB;AACtB;;AAEA;IACI,eAAe;IACf,YAAY;IACZ,YAAY;IACZ,gBAAgB;IAChB,kCAAkC;IAClC,YAAY;IACZ,gBAAgB;IAChB,eAAe;IACf,kBAAkB;IAClB,8BAA8B;IAC9B,kBAAkB;AACtB","sourcesContent":[".item {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    margin-bottom: 40px;\n}\n\n.item-image {\n    width: 180px;\n    height: 180px;\n    background-color: white;\n    border-radius: 100%;\n    border: 10px solid var(--yellow-color);\n    margin-top: 10px;\n    box-shadow: 0px 0px 10px 0px gray;\n}\n\n.item-name {\n    display: flex;\n    justify-content: center;\n    width: 180px;\n    margin-top: 10px;\n    margin-bottom: 5px;\n    border-bottom: 2px solid var(--light-gray-color);\n    text-align: center;\n    font-weight: 600;\n    font-size: 20px;\n    padding-bottom: 10px;\n}\n\n.item-composition {\n    display: flex;\n    justify-content: center;\n    width: 180px;\n    height: 25px;\n    margin-top: 0;\n    margin-bottom: 10px;\n    color: #448BC8;\n    border-bottom: 2px solid var(--light-gray-color);\n    text-align: center;\n    font-weight: 600;\n    font-size: 10px;\n    text-decoration: underline;\n    padding-bottom: 30px;\n}\n\n.item-price-block {\n    display: flex;\n    margin-bottom: 0;\n    color: #D96746;\n    font-weight: 600;\n    font-size: 17px;\n}\n\n.price-text,\n.price-value,\n.price-currency {\n    margin-bottom: 0;\n    margin-left: 3px;\n    margin-right: 3px;\n}\n\n.item-amount {\n    margin-top: 5px;\n    margin-bottom: 0;\n    font-weight: 600;\n    font-size: 12px;\n}\n\n.amount-block {\n    width: 115px;\n    display: flex;\n    justify-content: space-between;\n}\n\n.minus-icon {\n    cursor: pointer;\n    background-color: var(--gray-color);\n    width: 20px;\n    height: 20px;\n    border-radius: 100%;\n    box-shadow: 0px 0px 10px 0px gray;\n}\n\n\n.item-counter {\n    width: 40px;\n    height: 20px;\n    text-align: center;\n    border-radius: 5px;\n    border: none;\n    box-shadow: 0px 0px 10px 0px gray;\n}\n\n.plus-icon {\n    cursor: pointer;\n    width: 20px;\n    height: 20px;\n    background-color: var(--gray-color);\n    border-radius: 100%;\n    box-shadow: 0px 0px 10px 0px gray;\n}\n\n.item-button {\n    cursor: pointer;\n    width: 130px;\n    height: 30px;\n    margin-top: 10px;\n    background-color: var(--yellow-color);\n    color: white;\n    font-weight: 600;\n    font-size: 15px;\n    border-style: none;\n    border-bottom: 1px solid black;\n    border-radius: 3px;\n}\n\n.item-button-active {\n    cursor: pointer;\n    width: 130px;\n    height: 30px;\n    margin-top: 10px;\n    background-color: rgb(51, 221, 51);\n    color: white;\n    font-weight: 600;\n    font-size: 15px;\n    border-style: none;\n    border-bottom: 1px solid black;\n    border-radius: 3px;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/ModalWindowAuthorization/ModalWindowAuthorization.css":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/ModalWindowAuthorization/ModalWindowAuthorization.css ***!
  \*********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".modal-authorization-window {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    position: fixed;\n    left: 0;\n    top: 0;\n    background-color: rgba(0, 0, 0, 0.6);\n}\n\n.modal-authorization-content {\n    width: 350px;\n    height: 470px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    background-color: gainsboro;\n    border-radius: 5px;\n}\n\n.modal-header-block {\n    width: 100%;\n    display: flex;\n    background-color: var(--yellow-color);\n    border-top-right-radius: 5px;\n    border-top-left-radius: 5px;\n}\n\n.modal-authorization-header {\n    height: 50px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    font-size: 28px;\n    font-weight: 300;\n    color: white;\n    margin: 0;\n}\n\n.close-icon {\n    width: 20px;\n    height: 20px;\n    cursor: pointer;\n}\n\n.modal-tabs-authorization-block {\n    height: 50px;\n    margin-top: 15px;\n}\n\n.modal-authorization-tabs {\n    width: 250px;\n    height: 30px;\n    display: flex;\n    justify-content: center;\n    background-color: white;\n    cursor: pointer;\n    border-radius: 5px;\n    overflow: hidden;\n}\n\n.input-block {\n    display: flex;\n    flex-direction: column;\n}\n\n.authorization-input {\n    width: 300px;\n    height: 35px;\n    font-size: 18px;\n    margin-top: 30px;\n    border-radius: 5px;\n    border: none;\n}\n\n.authorization-button {\n    background-color: #F5C300;\n    width: 80%;\n    height: 40px;\n    font-size: 23px;\n    color: white;\n    margin-top: auto;\n    margin-bottom: 30px;\n    border-radius: 5px;\n    border: none;\n}\n\n.authorization-button:hover {\n    cursor: pointer;\n}", "",{"version":3,"sources":["webpack://./src/ModalWindowAuthorization/ModalWindowAuthorization.css"],"names":[],"mappings":"AAAA;IACI,WAAW;IACX,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,eAAe;IACf,OAAO;IACP,MAAM;IACN,oCAAoC;AACxC;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,2BAA2B;IAC3B,kBAAkB;AACtB;;AAEA;IACI,WAAW;IACX,aAAa;IACb,qCAAqC;IACrC,4BAA4B;IAC5B,2BAA2B;AAC/B;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,WAAW;IACX,eAAe;IACf,gBAAgB;IAChB,YAAY;IACZ,SAAS;AACb;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,eAAe;AACnB;;AAEA;IACI,YAAY;IACZ,gBAAgB;AACpB;;AAEA;IACI,YAAY;IACZ,YAAY;IACZ,aAAa;IACb,uBAAuB;IACvB,uBAAuB;IACvB,eAAe;IACf,kBAAkB;IAClB,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,sBAAsB;AAC1B;;AAEA;IACI,YAAY;IACZ,YAAY;IACZ,eAAe;IACf,gBAAgB;IAChB,kBAAkB;IAClB,YAAY;AAChB;;AAEA;IACI,yBAAyB;IACzB,UAAU;IACV,YAAY;IACZ,eAAe;IACf,YAAY;IACZ,gBAAgB;IAChB,mBAAmB;IACnB,kBAAkB;IAClB,YAAY;AAChB;;AAEA;IACI,eAAe;AACnB","sourcesContent":[".modal-authorization-window {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    position: fixed;\n    left: 0;\n    top: 0;\n    background-color: rgba(0, 0, 0, 0.6);\n}\n\n.modal-authorization-content {\n    width: 350px;\n    height: 470px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    background-color: gainsboro;\n    border-radius: 5px;\n}\n\n.modal-header-block {\n    width: 100%;\n    display: flex;\n    background-color: var(--yellow-color);\n    border-top-right-radius: 5px;\n    border-top-left-radius: 5px;\n}\n\n.modal-authorization-header {\n    height: 50px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    font-size: 28px;\n    font-weight: 300;\n    color: white;\n    margin: 0;\n}\n\n.close-icon {\n    width: 20px;\n    height: 20px;\n    cursor: pointer;\n}\n\n.modal-tabs-authorization-block {\n    height: 50px;\n    margin-top: 15px;\n}\n\n.modal-authorization-tabs {\n    width: 250px;\n    height: 30px;\n    display: flex;\n    justify-content: center;\n    background-color: white;\n    cursor: pointer;\n    border-radius: 5px;\n    overflow: hidden;\n}\n\n.input-block {\n    display: flex;\n    flex-direction: column;\n}\n\n.authorization-input {\n    width: 300px;\n    height: 35px;\n    font-size: 18px;\n    margin-top: 30px;\n    border-radius: 5px;\n    border: none;\n}\n\n.authorization-button {\n    background-color: #F5C300;\n    width: 80%;\n    height: 40px;\n    font-size: 23px;\n    color: white;\n    margin-top: auto;\n    margin-bottom: 30px;\n    border-radius: 5px;\n    border: none;\n}\n\n.authorization-button:hover {\n    cursor: pointer;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/ModalWindowSandwich/ModalWindowSandwich.css":
/*!***********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/ModalWindowSandwich/ModalWindowSandwich.css ***!
  \***********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".modal-sandwich-window {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    position: fixed;\n    left: 0;\n    top: 0;\n    background-color: rgba(0, 0, 0, 0.6);\n}\n\n.modal-sandwich-content {\n    width: 900px;\n    height: 570px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    background-color: gainsboro;\n    border-radius: 5px;\n}\n\n.modal-header-block {\n    width: 100%;\n    display: flex;\n    background-color: var(--yellow-color);\n    border-top-right-radius: 5px;\n    border-top-left-radius: 5px;\n}\n\n.modal-header {\n    height: 50px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    font-weight: 300;\n    color: white;\n    margin: 0;\n}\n\n.close-icon {\n    width: 20px;\n    height: 20px;\n    cursor: pointer;\n}\n\n.modal-tabs-block {\n    height: 50px;\n    margin-top: 15px;\n}\n\n.modal-tabs {\n    width: 800px;\n    height: 50px;\n    display: flex;\n    justify-content: center;\n    background-color: white;\n    cursor: pointer;\n    border-radius: 5px;\n    overflow: hidden;\n}\n\n.tab {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    padding-left: 30px;\n    padding-right: 30px;\n}\n\n.tab-active {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    padding-left: 30px;\n    padding-right: 30px;\n    color: white;\n    background-color: #D96746;\n}\n\n.arrows-block {\n    display: flex;  \n    justify-content: space-between;\n    width: 800px;\n    margin-top: 10px;\n    margin-bottom: 10px;\n}\n\n.arrow {\n    cursor: pointer;\n    width: 100px;\n    height: 30px;\n    background-color: #D96746;\n    color: white;\n    border: none;\n    border-radius: 5px;\n    font-size: 16px;\n}\n\n.tab-content-block {\n    background-color: gainsboro;\n    width: 85%;\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    overflow: auto;\n}\n\n.modal-item {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    margin-bottom: 40px;\n}\n\n.modal-item-active {\n    cursor: pointer;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    margin-bottom: 40px;\n    background-color: var(--yellow-color);\n}\n\n.modal-item:hover {\n    cursor: pointer;\n    background-color: #F6D846;\n}\n\n.image-block {\n    width: 200px;\n    height: 270px;\n    display: flex;\n    align-items: flex-end;\n    justify-content: center;\n}\n\n.result-image {\n    width: 150px;\n    height: 150px;\n    border-radius: 100%;\n    border: 10px solid var(--yellow-color);\n}\n\n.final-order-block {\n    width: 450px;\n    height: 270px;\n    margin-left: 30px;\n}\n\n.final-order-ready {\n    font-size: 20px;\n    border-bottom: 2px solid var(--light-gray-color);\n}\n\n.final-order-size,\n.final-order-bread,\n.final-order-vegetables,\n.final-order-sauces {\n    margin: 0;\n    display: flex;\n    font-size: 14px;\n    margin-top: 10px;\n}\n\n.final-order-filling {\n    display: flex;\n    font-size: 14px;\n    border-bottom: 2px solid var(--light-gray-color);\n    padding-bottom: 20px;\n    margin-top: 10px;\n}\n\n.final-order-size-text,\n.final-order-bread-text,\n.final-order-vegetables-text,\n.final-order-sauces-text,\n.final-order-filling-text {\n    margin: 0;\n}\n\n.final-order-size-value,\n.final-order-bread-value,\n.final-order-vegetables-value,\n.final-order-sauces-value,\n.final-order-filling-value  {\n    margin: 0;\n    margin-left: 5px;\n}\n\n.final-order-title {\n    padding-top: 20px;\n    font-size: 20px;\n    margin: 0;\n}\n\n.modal-footer {\n    width: 100%;\n    padding-bottom: 20px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    background-color: white;\n    margin-top: auto;\n    border-bottom-right-radius: 5px;\n    border-bottom-left-radius: 5px;\n}\n\n.modal-order-block {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}", "",{"version":3,"sources":["webpack://./src/ModalWindowSandwich/ModalWindowSandwich.css"],"names":[],"mappings":"AAAA;IACI,WAAW;IACX,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,eAAe;IACf,OAAO;IACP,MAAM;IACN,oCAAoC;AACxC;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,2BAA2B;IAC3B,kBAAkB;AACtB;;AAEA;IACI,WAAW;IACX,aAAa;IACb,qCAAqC;IACrC,4BAA4B;IAC5B,2BAA2B;AAC/B;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,WAAW;IACX,gBAAgB;IAChB,YAAY;IACZ,SAAS;AACb;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,eAAe;AACnB;;AAEA;IACI,YAAY;IACZ,gBAAgB;AACpB;;AAEA;IACI,YAAY;IACZ,YAAY;IACZ,aAAa;IACb,uBAAuB;IACvB,uBAAuB;IACvB,eAAe;IACf,kBAAkB;IAClB,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,WAAW;IACX,YAAY;IACZ,SAAS;IACT,kBAAkB;IAClB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,WAAW;IACX,YAAY;IACZ,SAAS;IACT,kBAAkB;IAClB,mBAAmB;IACnB,YAAY;IACZ,yBAAyB;AAC7B;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,YAAY;IACZ,gBAAgB;IAChB,mBAAmB;AACvB;;AAEA;IACI,eAAe;IACf,YAAY;IACZ,YAAY;IACZ,yBAAyB;IACzB,YAAY;IACZ,YAAY;IACZ,kBAAkB;IAClB,eAAe;AACnB;;AAEA;IACI,2BAA2B;IAC3B,UAAU;IACV,aAAa;IACb,qCAAqC;IACrC,cAAc;AAClB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,mBAAmB;AACvB;;AAEA;IACI,eAAe;IACf,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,mBAAmB;IACnB,qCAAqC;AACzC;;AAEA;IACI,eAAe;IACf,yBAAyB;AAC7B;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,aAAa;IACb,qBAAqB;IACrB,uBAAuB;AAC3B;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,sCAAsC;AAC1C;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,iBAAiB;AACrB;;AAEA;IACI,eAAe;IACf,gDAAgD;AACpD;;AAEA;;;;IAII,SAAS;IACT,aAAa;IACb,eAAe;IACf,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,eAAe;IACf,gDAAgD;IAChD,oBAAoB;IACpB,gBAAgB;AACpB;;AAEA;;;;;IAKI,SAAS;AACb;;AAEA;;;;;IAKI,SAAS;IACT,gBAAgB;AACpB;;AAEA;IACI,iBAAiB;IACjB,eAAe;IACf,SAAS;AACb;;AAEA;IACI,WAAW;IACX,oBAAoB;IACpB,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,uBAAuB;IACvB,gBAAgB;IAChB,+BAA+B;IAC/B,8BAA8B;AAClC;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;AACvB","sourcesContent":[".modal-sandwich-window {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    position: fixed;\n    left: 0;\n    top: 0;\n    background-color: rgba(0, 0, 0, 0.6);\n}\n\n.modal-sandwich-content {\n    width: 900px;\n    height: 570px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    background-color: gainsboro;\n    border-radius: 5px;\n}\n\n.modal-header-block {\n    width: 100%;\n    display: flex;\n    background-color: var(--yellow-color);\n    border-top-right-radius: 5px;\n    border-top-left-radius: 5px;\n}\n\n.modal-header {\n    height: 50px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    font-weight: 300;\n    color: white;\n    margin: 0;\n}\n\n.close-icon {\n    width: 20px;\n    height: 20px;\n    cursor: pointer;\n}\n\n.modal-tabs-block {\n    height: 50px;\n    margin-top: 15px;\n}\n\n.modal-tabs {\n    width: 800px;\n    height: 50px;\n    display: flex;\n    justify-content: center;\n    background-color: white;\n    cursor: pointer;\n    border-radius: 5px;\n    overflow: hidden;\n}\n\n.tab {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    padding-left: 30px;\n    padding-right: 30px;\n}\n\n.tab-active {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    padding-left: 30px;\n    padding-right: 30px;\n    color: white;\n    background-color: #D96746;\n}\n\n.arrows-block {\n    display: flex;  \n    justify-content: space-between;\n    width: 800px;\n    margin-top: 10px;\n    margin-bottom: 10px;\n}\n\n.arrow {\n    cursor: pointer;\n    width: 100px;\n    height: 30px;\n    background-color: #D96746;\n    color: white;\n    border: none;\n    border-radius: 5px;\n    font-size: 16px;\n}\n\n.tab-content-block {\n    background-color: gainsboro;\n    width: 85%;\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    overflow: auto;\n}\n\n.modal-item {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    margin-bottom: 40px;\n}\n\n.modal-item-active {\n    cursor: pointer;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    margin-bottom: 40px;\n    background-color: var(--yellow-color);\n}\n\n.modal-item:hover {\n    cursor: pointer;\n    background-color: #F6D846;\n}\n\n.image-block {\n    width: 200px;\n    height: 270px;\n    display: flex;\n    align-items: flex-end;\n    justify-content: center;\n}\n\n.result-image {\n    width: 150px;\n    height: 150px;\n    border-radius: 100%;\n    border: 10px solid var(--yellow-color);\n}\n\n.final-order-block {\n    width: 450px;\n    height: 270px;\n    margin-left: 30px;\n}\n\n.final-order-ready {\n    font-size: 20px;\n    border-bottom: 2px solid var(--light-gray-color);\n}\n\n.final-order-size,\n.final-order-bread,\n.final-order-vegetables,\n.final-order-sauces {\n    margin: 0;\n    display: flex;\n    font-size: 14px;\n    margin-top: 10px;\n}\n\n.final-order-filling {\n    display: flex;\n    font-size: 14px;\n    border-bottom: 2px solid var(--light-gray-color);\n    padding-bottom: 20px;\n    margin-top: 10px;\n}\n\n.final-order-size-text,\n.final-order-bread-text,\n.final-order-vegetables-text,\n.final-order-sauces-text,\n.final-order-filling-text {\n    margin: 0;\n}\n\n.final-order-size-value,\n.final-order-bread-value,\n.final-order-vegetables-value,\n.final-order-sauces-value,\n.final-order-filling-value  {\n    margin: 0;\n    margin-left: 5px;\n}\n\n.final-order-title {\n    padding-top: 20px;\n    font-size: 20px;\n    margin: 0;\n}\n\n.modal-footer {\n    width: 100%;\n    padding-bottom: 20px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    background-color: white;\n    margin-top: auto;\n    border-bottom-right-radius: 5px;\n    border-bottom-left-radius: 5px;\n}\n\n.modal-order-block {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/Order/Order.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/Order/Order.css ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".order {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    background-color: #F6D846;\n    margin-top: 20px;\n}\n\n.order-head {\n    display: flex;\n    align-items: center;\n    width: 100%;\n    height: 70px;\n    background-color: var(--light-yellow-color);\n    overflow: hidden;\n}\n\n.basket-icon {\n    width: 40px;\n    height: 40px;\n    margin-left: 15px;\n    filter:\n        drop-shadow(3px 5px 1.7px #c39c10) drop-shadow(4px 6px 1.7px #c39c10) drop-shadow(5px 7px 1.7px #c39c10) drop-shadow(6px 8px 1.7px #c39c10) drop-shadow(7px 9px 1.7px #c39c10) drop-shadow(8px 10px 1.7px #c39c10) drop-shadow(9px 11px 1.7px #c39c10);\n}\n\n.head-title {\n    padding-right: 20px;\n    margin-top: 0;\n    margin-bottom: 0;\n    margin-left: 20px;\n    font-weight: 600;\n    font-size: 35px;\n    color: white;\n}\n\n.order-headers {\n    display: flex;\n    justify-content: space-between;\n    width: 250px;\n    border-bottom: 2px solid var(--yellow-color);\n    font-weight: 600;\n    font-size: 12px;\n}\n\n.order-items {\n    display: flex;\n    justify-content: space-between;\n    width: 250px;\n    border-bottom: 2px solid var(--yellow-color);\n    font-size: 12px;\n}\n\n.title-header,\n.order-title,\n.sandwich-title {\n    width: 100px;\n}\n\n.order-price,\n.price-header {\n    width: 70px;\n    display: flex;\n    justify-content: right;\n    align-items: center;\n    text-align: right;\n}\n\n.price-header {\n    padding-right: 20px;\n}\n\n.order-header,\n.order-amount,\n.amount-header {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 48px;\n    text-align: center;\n}\n\n.sandwich-title:hover {\n    cursor: pointer;\n    text-decoration: underline;\n}\n\n.delete-icon {\n    width: 15px;\n    cursor: pointer;\n}\n\n.sum {\n    display: flex;\n    font-weight: 600;\n    font-size: 18px;\n}\n\n.sum-text,\n.sum-currency {\n    margin-left: 5px;\n    margin-right: 5px;\n}\n\n.order-button {\n    cursor: pointer;\n    width: 170px;\n    height: 30px;\n    background-color: #808080;\n    margin-bottom: 25px;\n    font-weight: 600;\n    color: white;\n    border-style: none;\n    border-bottom: 1px solid black;\n    border-radius: 3px;\n}", "",{"version":3,"sources":["webpack://./src/Order/Order.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,mBAAmB;IACnB,yBAAyB;IACzB,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,WAAW;IACX,YAAY;IACZ,2CAA2C;IAC3C,gBAAgB;AACpB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,iBAAiB;IACjB;8PAC0P;AAC9P;;AAEA;IACI,mBAAmB;IACnB,aAAa;IACb,gBAAgB;IAChB,iBAAiB;IACjB,gBAAgB;IAChB,eAAe;IACf,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,YAAY;IACZ,4CAA4C;IAC5C,gBAAgB;IAChB,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,YAAY;IACZ,4CAA4C;IAC5C,eAAe;AACnB;;AAEA;;;IAGI,YAAY;AAChB;;AAEA;;IAEI,WAAW;IACX,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,iBAAiB;AACrB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;;;IAGI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,WAAW;IACX,kBAAkB;AACtB;;AAEA;IACI,eAAe;IACf,0BAA0B;AAC9B;;AAEA;IACI,WAAW;IACX,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,gBAAgB;IAChB,eAAe;AACnB;;AAEA;;IAEI,gBAAgB;IAChB,iBAAiB;AACrB;;AAEA;IACI,eAAe;IACf,YAAY;IACZ,YAAY;IACZ,yBAAyB;IACzB,mBAAmB;IACnB,gBAAgB;IAChB,YAAY;IACZ,kBAAkB;IAClB,8BAA8B;IAC9B,kBAAkB;AACtB","sourcesContent":[".order {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    background-color: #F6D846;\n    margin-top: 20px;\n}\n\n.order-head {\n    display: flex;\n    align-items: center;\n    width: 100%;\n    height: 70px;\n    background-color: var(--light-yellow-color);\n    overflow: hidden;\n}\n\n.basket-icon {\n    width: 40px;\n    height: 40px;\n    margin-left: 15px;\n    filter:\n        drop-shadow(3px 5px 1.7px #c39c10) drop-shadow(4px 6px 1.7px #c39c10) drop-shadow(5px 7px 1.7px #c39c10) drop-shadow(6px 8px 1.7px #c39c10) drop-shadow(7px 9px 1.7px #c39c10) drop-shadow(8px 10px 1.7px #c39c10) drop-shadow(9px 11px 1.7px #c39c10);\n}\n\n.head-title {\n    padding-right: 20px;\n    margin-top: 0;\n    margin-bottom: 0;\n    margin-left: 20px;\n    font-weight: 600;\n    font-size: 35px;\n    color: white;\n}\n\n.order-headers {\n    display: flex;\n    justify-content: space-between;\n    width: 250px;\n    border-bottom: 2px solid var(--yellow-color);\n    font-weight: 600;\n    font-size: 12px;\n}\n\n.order-items {\n    display: flex;\n    justify-content: space-between;\n    width: 250px;\n    border-bottom: 2px solid var(--yellow-color);\n    font-size: 12px;\n}\n\n.title-header,\n.order-title,\n.sandwich-title {\n    width: 100px;\n}\n\n.order-price,\n.price-header {\n    width: 70px;\n    display: flex;\n    justify-content: right;\n    align-items: center;\n    text-align: right;\n}\n\n.price-header {\n    padding-right: 20px;\n}\n\n.order-header,\n.order-amount,\n.amount-header {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 48px;\n    text-align: center;\n}\n\n.sandwich-title:hover {\n    cursor: pointer;\n    text-decoration: underline;\n}\n\n.delete-icon {\n    width: 15px;\n    cursor: pointer;\n}\n\n.sum {\n    display: flex;\n    font-weight: 600;\n    font-size: 18px;\n}\n\n.sum-text,\n.sum-currency {\n    margin-left: 5px;\n    margin-right: 5px;\n}\n\n.order-button {\n    cursor: pointer;\n    width: 170px;\n    height: 30px;\n    background-color: #808080;\n    margin-bottom: 25px;\n    font-weight: 600;\n    color: white;\n    border-style: none;\n    border-bottom: 1px solid black;\n    border-radius: 3px;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/App.css":
/*!*********************!*\
  !*** ./src/App.css ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_App_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./App.css */ "./node_modules/css-loader/dist/cjs.js!./src/App.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_App_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_App_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_App_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_App_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/Ingredient/Ingredient.css":
/*!***************************************!*\
  !*** ./src/Ingredient/Ingredient.css ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_Ingredient_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./Ingredient.css */ "./node_modules/css-loader/dist/cjs.js!./src/Ingredient/Ingredient.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_Ingredient_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_Ingredient_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_Ingredient_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_Ingredient_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/MainHeader/MainHeader.css":
/*!***************************************!*\
  !*** ./src/MainHeader/MainHeader.css ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_MainHeader_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./MainHeader.css */ "./node_modules/css-loader/dist/cjs.js!./src/MainHeader/MainHeader.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_MainHeader_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_MainHeader_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_MainHeader_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_MainHeader_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/MenuBlock/MenuBlock.css":
/*!*************************************!*\
  !*** ./src/MenuBlock/MenuBlock.css ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_MenuBlock_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./MenuBlock.css */ "./node_modules/css-loader/dist/cjs.js!./src/MenuBlock/MenuBlock.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_MenuBlock_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_MenuBlock_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_MenuBlock_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_MenuBlock_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/MenuCategories/MenuCategories.css":
/*!***********************************************!*\
  !*** ./src/MenuCategories/MenuCategories.css ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_MenuCategories_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./MenuCategories.css */ "./node_modules/css-loader/dist/cjs.js!./src/MenuCategories/MenuCategories.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_MenuCategories_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_MenuCategories_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_MenuCategories_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_MenuCategories_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/MenuItem/MenuItem.css":
/*!***********************************!*\
  !*** ./src/MenuItem/MenuItem.css ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_MenuItem_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./MenuItem.css */ "./node_modules/css-loader/dist/cjs.js!./src/MenuItem/MenuItem.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_MenuItem_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_MenuItem_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_MenuItem_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_MenuItem_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/ModalWindowAuthorization/ModalWindowAuthorization.css":
/*!*******************************************************************!*\
  !*** ./src/ModalWindowAuthorization/ModalWindowAuthorization.css ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ModalWindowAuthorization_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./ModalWindowAuthorization.css */ "./node_modules/css-loader/dist/cjs.js!./src/ModalWindowAuthorization/ModalWindowAuthorization.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ModalWindowAuthorization_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ModalWindowAuthorization_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_ModalWindowAuthorization_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_ModalWindowAuthorization_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/ModalWindowSandwich/ModalWindowSandwich.css":
/*!*********************************************************!*\
  !*** ./src/ModalWindowSandwich/ModalWindowSandwich.css ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ModalWindowSandwich_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./ModalWindowSandwich.css */ "./node_modules/css-loader/dist/cjs.js!./src/ModalWindowSandwich/ModalWindowSandwich.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ModalWindowSandwich_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ModalWindowSandwich_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_ModalWindowSandwich_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_ModalWindowSandwich_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/Order/Order.css":
/*!*****************************!*\
  !*** ./src/Order/Order.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_Order_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./Order.css */ "./node_modules/css-loader/dist/cjs.js!./src/Order/Order.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_Order_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_Order_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_Order_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_Order_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/Component.js":
/*!**************************!*\
  !*** ./src/Component.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Component {
    constructor(data = {}) {
        let handler = {
            set: this.handleDataChange.bind(this)
        }
        this.data = new Proxy(data, handler);
    }

    handleDataChange(item, property, value) {
        item[property] = value;
        this.rerender(this.data);
        return true;
    }

    setRerender(callback) {
        this.rerender = callback;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Component);

/***/ }),

/***/ "./src/Ingredient/Ingredient.js":
/*!**************************************!*\
  !*** ./src/Ingredient/Ingredient.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/Component.js");
/* harmony import */ var _Ingredient_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ingredient.css */ "./src/Ingredient/Ingredient.css");



class Ingredient extends _Component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(props) {
        super();
        this.tabReadyContent = props.tabReadyContent;
    }
    render(item, key) {
        return (/*html*/`
            <div class=${this.tabReadyContent.sizes === item.name ||
                this.tabReadyContent.breads === item.name ||
                this.tabReadyContent.vegetables.includes(item.name) ||
                this.tabReadyContent.sauces.includes(item.name) ||
                this.tabReadyContent.fillings.includes(item.name)
                ? "modal-item-active" : "modal-item"} id="item-${key}">
                <img class="item-image" src=${item.image} />
                <p class="item-name">${item.name}</p>
                <div class="item-price-block">
                    <p class="price-text">Цена:</p>
                    <p class="price-value" id="price-${key}">${item.price}</p>
                    <p class="price-currency">руб.</p>
                </div>
            </div> 
      `)
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ingredient);

/***/ }),

/***/ "./src/MainHeader/MainHeader.js":
/*!**************************************!*\
  !*** ./src/MainHeader/MainHeader.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/Component.js");
/* harmony import */ var _MainHeader_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MainHeader.css */ "./src/MainHeader/MainHeader.css");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../storage */ "./src/storage.js");






class MainHeader extends _Component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(props) {
        super();
    }

    enable() {
        const loginButtonClick = () => {
            (0,_storage__WEBPACK_IMPORTED_MODULE_2__.setModalWindowAuthorizationShow)(true)
        }

        document.getElementsByClassName("login_and_register-button")[0].addEventListener("click", loginButtonClick)
    }

    render() {
        return (/*html*/`
            <div class="header">
            <button class="login_and_register-button">Войти/Зарегистироваться</button>
            </div>
            <h1 class="headline">СДЕЛАЙТЕ ЗАКАЗ НАПРЯМУЮ ИЗ РЕСТОРАНА</h1>
      `)
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MainHeader);

/***/ }),

/***/ "./src/MenuBlock/MenuBlock.js":
/*!************************************!*\
  !*** ./src/MenuBlock/MenuBlock.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/Component.js");
/* harmony import */ var _MenuItem_MenuItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../MenuItem/MenuItem */ "./src/MenuItem/MenuItem.js");
/* harmony import */ var _MenuBlock_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MenuBlock.css */ "./src/MenuBlock/MenuBlock.css");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../storage */ "./src/storage.js");











class MenuBlock extends _Component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(props) {
        super()

        this.subscribers = ["countersValue", "items", "selectedTab"];
        for (let i in this.subscribers) {
            _storage__WEBPACK_IMPORTED_MODULE_3__.storage.addSubscriber(this.subscribers[i], props.rerender);
        }
    }

    enable() {
        for (let i = 0; i < _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.items.length; i++) {
            if (_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.items[i] && _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.items[i].category !== _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedTab) {
                continue;
            }

            const handlePlusClick = () => {
                let countersValue = _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.countersValue;
                countersValue[i] += 1; 
                (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setCountersValue)(countersValue)
            }

            const handleMinusClick = () => {
                if (_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.countersValue[i] > 1) {
                    let countersValue = _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.countersValue;
                    countersValue[i] -= 1;
                    (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setCountersValue)(countersValue)
                }
            }

            const handleInputChange = () => {
                let countersValue = _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.countersValue;
                if (document.getElementById("counter-" + (i + 1)).value > 0) {
                    countersValue[i] = parseInt(document.getElementById("counter-" + (i + 1)).value);
                } else {
                    countersValue[i] = 1;
                }
                (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setCountersValue)(countersValue);
            }

            const handleButtonClick = () => {
                if (_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedTab === "sandwiches") {
                    (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setSelectedModalTab)("sizes");
                    (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setModalWindowAddShow)(true);
                    (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setModalContent)({
                        id: i + 1,
                        title: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.items[i].name,
                        amount: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.countersValue[i],
                        price: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.items[i].price
                    });
                } else {
                    let orderItems = _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.orderItems;
                    orderItems.push({
                        id: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.orderItems.length + 1,
                        title: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.items[i].name,
                        amount: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.countersValue[i],
                        price: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.items[i].price * _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.countersValue[i]
                    });
                    (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setOrderItems)(orderItems);
                    (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setTotalPrice)(_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.totalPrice + (_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.items[i].price
                        * _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.countersValue[i]))
                }
            }

            document.getElementById("plus-" + (i + 1)).addEventListener("click", handlePlusClick)
            document.getElementById("minus-" + (i + 1)).addEventListener("click", handleMinusClick)
            document.getElementById("counter-" + (i + 1)).addEventListener("change", handleInputChange)
            document.getElementById("button-" + (i + 1)).addEventListener("click", handleButtonClick)
        }
    }

    loadMenu() {
        const menuItem = new _MenuItem_MenuItem__WEBPACK_IMPORTED_MODULE_1__["default"]();
        let items = "";
        let logo = "";
        for (let i in _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.items) {
            if (_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.items[i].category !== _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedTab) {
                continue;
            }

            if (_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.items[i].market === "sfc") {
                logo = "i/South_fried_chicken_logo.png";
            } else if (_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.items[i].market === "doner") {
                logo = "i/Doner_logo.png";
            } else {
                logo = "i/Subway_logo.png";
            }
            items += menuItem.render(_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.items[i], parseInt(i) + 1, logo,
                _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.countersValue);
        }

        return items;
    }

    render() {
        return (/*html*/`
        <div class="items-block">
            ${this.loadMenu()}
        </div>
      `)
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MenuBlock);

/***/ }),

/***/ "./src/MenuCategories/MenuCategories.js":
/*!**********************************************!*\
  !*** ./src/MenuCategories/MenuCategories.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/Component.js");
/* harmony import */ var _MenuCategories_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuCategories.css */ "./src/MenuCategories/MenuCategories.css");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../storage */ "./src/storage.js");






class MenuCategories extends _Component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(props) {
        super()
        _storage__WEBPACK_IMPORTED_MODULE_2__.storage.addSubscriber("selectedTab", props.rerender);

        this.categories = {
            pancakes: "Блины",
            shaurma: "Шаурма",
            sandwiches: "Сэндвичи",
            burgers: "Бургеры",
            chicken: "Курица & Картофель",
            salads: "Тортилья & Салаты",
            drinks: "Напитки & Десерты"
        }
    }

    enable() {
        for (let i in this.categories) {
            const category = document.getElementById(i);
            category.addEventListener('click', this.handleClickCategory.bind(this));
        }
    }

    handleClickCategory(target) {
        if (_storage__WEBPACK_IMPORTED_MODULE_2__.storage.data.selectedTab !== target.target.id) {
            (0,_storage__WEBPACK_IMPORTED_MODULE_2__.setSelectedTab)(target.target.id);
        }
    }

    render() {
        let menuItems = ``;
        for (let i in this.categories) {
            menuItems += `<p class="${_storage__WEBPACK_IMPORTED_MODULE_2__.storage.data.selectedTab === i ? "category-active" : "category"}"
                id="${i}">${this.categories[i]}</p>`
        }
        return (/*html*/`
        ${menuItems}
      `)
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MenuCategories);

/***/ }),

/***/ "./src/MenuItem/MenuItem.js":
/*!**********************************!*\
  !*** ./src/MenuItem/MenuItem.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/Component.js");
/* harmony import */ var _MenuItem_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuItem.css */ "./src/MenuItem/MenuItem.css");



class MenuItem extends _Component__WEBPACK_IMPORTED_MODULE_0__["default"]{
    constructor() {
        super();
    }
    render(item, i, logo, countersValue) {
        return (/*html*/`
            <div class="item" id="item-${i}">
                <img class="logo" src=${logo} />
                <img class="item-image" src=${item.image} />
                <p class="item-name">${item.name}</p>
                <p class="item-composition">${item.description}</p>
                <div class="item-price-block">
                    <p class="price-text">Цена:</p>
                    <p class="price-value" id="price-${i}">${item.price}</p>
                    <p class="price-currency">руб.</p>
                </div>
                <p class="item-amount">Количество</p>
                <div class="amount-block">
                    <img class="minus-icon" src="i/minus.svg" id="minus-${i}">
                    <input class="item-counter" type="text" id="counter-${i}" value=${countersValue[i-1]}>
                    <img class="plus-icon" src="i/plus.svg" id="plus-${i}">
                </div>
                <button class="item-button" id="button-${i}">В КОРЗИНУ</button>
        </div> 
      `)
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MenuItem);

/***/ }),

/***/ "./src/ModalWindowAuthorization/ModalWindowAuthorization.js":
/*!******************************************************************!*\
  !*** ./src/ModalWindowAuthorization/ModalWindowAuthorization.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/dist/js.cookie.mjs");
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Component */ "./src/Component.js");
/* harmony import */ var _ModalWindowAuthorization_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ModalWindowAuthorization.css */ "./src/ModalWindowAuthorization/ModalWindowAuthorization.css");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../storage */ "./src/storage.js");










class ModalWindowAuthorization extends _Component__WEBPACK_IMPORTED_MODULE_2__["default"] {
    constructor(props) {
        super();

        this.inputsContent = {
            logUsername: "",
            logPassword: "",
            regUsername: "",
            regPassword: "",
            regRepPassword: ""
        }

        this.subscribers = ["modalWindowAuthorizationShow", "selectedAuthorizationTab"];
        for (let i in this.subscribers) {
            _storage__WEBPACK_IMPORTED_MODULE_4__.storage.addSubscriber(this.subscribers[i], props.rerender);
        }
    }

    enable() {
        const loginTabClick = () => {
            (0,_storage__WEBPACK_IMPORTED_MODULE_4__.setSelectedAuthorizationTab)("login")
        }

        const registrationTabClick = () => {
            ;(0,_storage__WEBPACK_IMPORTED_MODULE_4__.setSelectedAuthorizationTab)("registration")
        }

        const closeIconClick = () => {
            ;(0,_storage__WEBPACK_IMPORTED_MODULE_4__.setModalWindowAuthorizationShow)(false);
            (0,_storage__WEBPACK_IMPORTED_MODULE_4__.setSelectedAuthorizationTab)("login")
            for (let i in this.inputsContent) {
                this.inputsContent[i] = '';
            }
        }

        document.getElementById("login").addEventListener("click", loginTabClick)
        document.getElementById("registration").addEventListener("click", registrationTabClick)
        document.getElementsByClassName("close-icon")[0].addEventListener("click", closeIconClick)


        const logUserOnChange = () => {
            this.inputsContent.logUsername = document.getElementById("username").value;
        }

        const logPasswordOnChange = () => {
            this.inputsContent.logPassword = document.getElementById("password").value;
        }

        const regUserOnChange = () => {
            this.inputsContent.regUsername = document.getElementById("username").value;
        }

        const regPasswordOnChange = () => {
            this.inputsContent.regPassword = document.getElementById("password").value;
        }

        const regRepPasswordOnChange = () => {
            this.inputsContent.regRepPassword = document.getElementById("repPassword").value;
        }

        const logButtonClick = async () => {
            try {
                if (this.inputsContent.logUsername !== '' && this.inputsContent.logPassword !== '') {
                    await axios__WEBPACK_IMPORTED_MODULE_0___default().post('http://localhost:8000/user/login', {
                        username: this.inputsContent.logUsername.toLowerCase(),
                        password: this.inputsContent.logPassword
                    }).then(res => {
                        console.log(res.data.token);;
                        if (res.data.success === true) {

                            for (let i in this.inputsContent) {
                                this.inputsContent[i] = '';
                            }

                            (0,_storage__WEBPACK_IMPORTED_MODULE_4__.setModalWindowAuthorizationShow)(false)
                            js_cookie__WEBPACK_IMPORTED_MODULE_1__["default"].set('token', res.data.token);
                            alert('Вы успешно авторизовались!');
                        } else {
                            alert(res.data.message)
                        }
                    });
                } else {
                    alert('Введены не все значения!');
                }
            } catch {
                alert("Неверный логин или пароль")
            }
        }

        const regButtonClick = async () => {
            if (this.inputsContent.regUsername !== '' && this.inputsContent.regPassword !== '') {
                if (this.inputsContent.regPassword === this.inputsContent.regRepPassword) {
                    await axios__WEBPACK_IMPORTED_MODULE_0___default().post('http://localhost:8000/user/register', {
                        username: this.inputsContent.regUsername.toLowerCase(),
                        password: this.inputsContent.regPassword
                    }).then(res => {
                        if (res.data.success === true) {

                            for (let i in this.inputsContent) {
                                this.inputsContent[i] = '';
                            }

                            (0,_storage__WEBPACK_IMPORTED_MODULE_4__.setSelectedAuthorizationTab)("login");
                            alert('Вы успешно зарегистрировались!');
                        } else {
                            alert(res.data.message)
                        }
                    });
                } else {
                    alert('Пароли не совпадают!')
                }
            } else {
                alert('Введены не все значения!');
            }
        }
        if (_storage__WEBPACK_IMPORTED_MODULE_4__.storage.data.selectedAuthorizationTab === "login") {
            document.getElementById("username").addEventListener("change", logUserOnChange)
            document.getElementById("password").addEventListener("change", logPasswordOnChange)
            document.getElementsByClassName("authorization-button")[0].addEventListener("click", logButtonClick)
        }
        if (_storage__WEBPACK_IMPORTED_MODULE_4__.storage.data.selectedAuthorizationTab === "registration") {
            document.getElementById("username").addEventListener("change", regUserOnChange)
            document.getElementById("password").addEventListener("change", regPasswordOnChange)
            document.getElementById("repPassword").addEventListener("change", regRepPasswordOnChange)
            document.getElementsByClassName("authorization-button")[0].addEventListener("click", regButtonClick)
        }
    }

    render() {
        const tabs = {
            login: "Вход",
            registration: "Регистрация"
        };
        let modalTabs = ``;

        for (let i in tabs) {
            modalTabs += `<p class="${_storage__WEBPACK_IMPORTED_MODULE_4__.storage.data.selectedAuthorizationTab === i ? "tab-active" : "tab"}"
                id="${i}">${tabs[i]}</p>`
        }

        const repeatPasswordInput = `<input class="authorization-input" type="password"
        id="repPassword" placeholder="Повторите пароль" value=${this.inputsContent.regRepPassword}>`

        return (/*html*/`
        <div class="modal-authorization-window">
            <div class="modal-authorization-content">
                <div class="modal-header-block">
                    <h3 class="modal-authorization-header">Subway</h3>
                    <img class="close-icon" src="i/close-icon.svg"/>
                </div>
                <div class="modal-tabs-authorization-block">
                    <div class="modal-authorization-tabs ">
                        ${modalTabs}
                    </div>
                </div>
                <div class="input-block">
                    <input class="authorization-input" id="username" type="text" placeholder=
                    "Имя пользователя" value=${_storage__WEBPACK_IMPORTED_MODULE_4__.storage.data.selectedAuthorizationTab === "login"
                ? this.inputsContent.logUsername : this.inputsContent.regUsername}>
                    <input class="authorization-input" type="password" id="password" placeholder=
                    "Пароль" value=${_storage__WEBPACK_IMPORTED_MODULE_4__.storage.data.selectedAuthorizationTab === "login"
                ? this.inputsContent.logPassword : this.inputsContent.regPassword} >
                    ${_storage__WEBPACK_IMPORTED_MODULE_4__.storage.data.selectedAuthorizationTab === "registration" ? repeatPasswordInput : ""}
                </div>
                <button class="authorization-button">${_storage__WEBPACK_IMPORTED_MODULE_4__.storage.data.selectedAuthorizationTab ===
                "login" ? "Войти" : "Зарегистрироваться"}</button>
            </div>
        </div>
        `)
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModalWindowAuthorization);

/***/ }),

/***/ "./src/ModalWindowSandwich/ModalWindowSandwich.js":
/*!********************************************************!*\
  !*** ./src/ModalWindowSandwich/ModalWindowSandwich.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/Component.js");
/* harmony import */ var _Ingredient_Ingredient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Ingredient/Ingredient */ "./src/Ingredient/Ingredient.js");
/* harmony import */ var _ModalWindowSandwich_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ModalWindowSandwich.css */ "./src/ModalWindowSandwich/ModalWindowSandwich.css");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../storage */ "./src/storage.js");
















class ModalWindowSandwich extends _Component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(props) {
        super();

        this.subscribers = ["selectedModalTab", "modalContent", "tabReadyContent",
            "countersValue", "modalWindowAddShow", "modalWindowEditShow", "changeableOrderItem"];
        for (let i in this.subscribers) {
            _storage__WEBPACK_IMPORTED_MODULE_3__.storage.addSubscriber(this.subscribers[i], props.rerender);
        }

        this.tabs = {
            sizes: "Размер",
            breads: "Хлеб",
            vegetables: "Овощи",
            sauces: "Соусы",
            fillings: "Начинка",
            ready: "Готово!"
        };
    }

    enable() {
        let tabReadyContent = _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.tabReadyContent;
        let modalContent = _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent;
        let previousValues = _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.previousValues;
        let sandwiches = _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.sandwiches;
        let orderItems = _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.orderItems;
        const sizesTabClick = () => {
            (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setSelectedModalTab)("sizes")
        }
        const breadsTabClick = () => {
            ;(0,_storage__WEBPACK_IMPORTED_MODULE_3__.setSelectedModalTab)("breads")
        }
        const vegetablesTabClick = () => {
            ;(0,_storage__WEBPACK_IMPORTED_MODULE_3__.setSelectedModalTab)("vegetables")
        }
        const saucesTabClick = () => {
            ;(0,_storage__WEBPACK_IMPORTED_MODULE_3__.setSelectedModalTab)("sauces")
        }
        const fillingsTabClick = () => {
            ;(0,_storage__WEBPACK_IMPORTED_MODULE_3__.setSelectedModalTab)("fillings")
        }
        const readyTabClick = () => {
            ;(0,_storage__WEBPACK_IMPORTED_MODULE_3__.setSelectedModalTab)("ready")
        }

        const closeIconClick = () => {
            ;(0,_storage__WEBPACK_IMPORTED_MODULE_3__.setPreviousValues)({
                sizes: 0,
                breads: 0
            })
            if (_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalWindowAddShow) {
                (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setModalWindowAddShow)(false);
            } else {
                (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setModalWindowEditShow)(false);
            }
        }

        document.getElementById("sizes").addEventListener("click", sizesTabClick)
        document.getElementById("breads").addEventListener("click", breadsTabClick)
        document.getElementById("vegetables").addEventListener("click", vegetablesTabClick)
        document.getElementById("sauces").addEventListener("click", saucesTabClick)
        document.getElementById("fillings").addEventListener("click", fillingsTabClick)
        document.getElementById("ready").addEventListener("click", readyTabClick)

        document.getElementsByClassName("close-icon")[0].addEventListener("click", closeIconClick)

        for (let key in _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.ingredients[_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedModalTab]) {
            const modalItemClick = () => {
                const scrollPosition = document.getElementsByClassName("tab-content-block")[0].scrollTop
                if (_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedModalTab === "sizes" || _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedModalTab === "breads") {

                    tabReadyContent[_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedModalTab] = _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.ingredients[_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedModalTab][key].name;

                    modalContent.price += _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.ingredients[_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedModalTab][key].price;
                    modalContent.price -= _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.previousValues[_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedModalTab];

                    (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setModalContent)(modalContent);

                    previousValues[_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedModalTab] = _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.ingredients[_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedModalTab][key].price;

                    (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setPreviousValues)(previousValues);
                    (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setTabReadyContent)(tabReadyContent);
                } else {
                    if (_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.tabReadyContent[_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedModalTab].includes(_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.ingredients[_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedModalTab][key].name)) {
                        let n = _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.tabReadyContent[_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedModalTab].indexOf(_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.ingredients[_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedModalTab][key].name);
                        modalContent.price -= _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.ingredients[_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedModalTab][key].price;
                        tabReadyContent[_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedModalTab].splice(n, 1);
                        (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setModalContent)(modalContent);
                        (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setTabReadyContent)(_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.tabReadyContent);
                    } else {
                        tabReadyContent[_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedModalTab].push(_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.ingredients[_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedModalTab][key].name);
                        modalContent.price += _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.ingredients[_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedModalTab][key].price;
                        (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setModalContent)(modalContent);
                        (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setTabReadyContent)(_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.tabReadyContent);
                    }
                }
                document.getElementsByClassName("tab-content-block")[0].scrollTo(0, scrollPosition)
            }
            document.getElementById("item-" + key).addEventListener("click", modalItemClick)
        }

        if (_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedModalTab === "ready") {
            let countersValue = _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.countersValue;
            const handleModalPlusClick = () => {
                modalContent.amount += 1;
                (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setModalContent)(_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent);
                countersValue[_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.id - 1] += 1;
                (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setCountersValue)(_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.countersValue);
            }
            const handleModalMinusClick = () => {
                if (_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.amount > 1) {
                    modalContent.amount -= 1;
                    (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setModalContent)(_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent);
                    countersValue[_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.id - 1] -= 1;
                    (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setCountersValue)(_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.countersValue);
                }
            }
            const handleInputChange = () => {
                if (document.getElementById("counter-modal").value > 0) {
                    modalContent.amount = parseInt(document.getElementById("counter-modal").value);
                    (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setModalContent)(_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent);
                    countersValue[_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.id - 1] = parseInt(document.
                        getElementById("counter-modal").value);
                    (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setCountersValue)(_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.countersValue);
                } else {
                    modalContent.amount = 1;
                    (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setModalContent)(_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent);
                    countersValue[_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.id - 1] = 1;
                    (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setCountersValue)(_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.countersValue);
                }
            }

            const handleButtonModalClick = () => {
                ;(0,_storage__WEBPACK_IMPORTED_MODULE_3__.setSelectedModalTab)("sizes");
                if (_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalWindowAddShow) {
                    (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setModalWindowAddShow)(false);

                    sandwiches.push({
                        id: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.id,
                        title: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.title,
                        amount: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.amount,
                        price: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.price,
                        sizes: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.tabReadyContent.sizes,
                        breads: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.tabReadyContent.breads,
                        vegetables: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.tabReadyContent.vegetables,
                        sauces: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.tabReadyContent.sauces,
                        fillings: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.tabReadyContent.fillings
                    });

                    orderItems.push({
                        sandwichId: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.sandwiches.length,
                        id: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.orderItems.length + 1,
                        title: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.title,
                        amount: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.amount,
                        price: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.price * _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.amount
                    });
                    (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setSandwiches)(_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.sandwiches);
                    (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setOrderItems)(_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.orderItems);

                    (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setTotalPrice)(_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.totalPrice + (_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.price * _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.amount));

                    (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setTabReadyContent)({
                        sizes: "15 См",
                        breads: "Белый итальянский",
                        vegetables: [],
                        sauces: [],
                        fillings: []
                    })
                }
                if (_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalWindowEditShow) {
                    (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setModalWindowEditShow)(false);

                    sandwiches[_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.changeableOrderItem.sandwichId] = {
                        id: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.id,
                        title: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.title,
                        amount: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.amount,
                        price: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.price,
                        sizes: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.tabReadyContent.sizes,
                        breads: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.tabReadyContent.breads,
                        vegetables: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.tabReadyContent.vegetables,
                        sauces: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.tabReadyContent.sauces,
                        fillings: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.tabReadyContent.fillings
                    };
                    (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setSandwiches)(_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.sandwiches);

                    let previousPrice = _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.orderItems[_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.changeableOrderItem.orderId].price;

                    orderItems[_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.changeableOrderItem.orderId].amount = _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.amount;
                    orderItems[_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.changeableOrderItem.orderId].price =
                        _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.price * _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.amount;

                    (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setOrderItems)(orderItems);

                    (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setTotalPrice)(_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.totalPrice + (_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.price *
                        _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.amount) - previousPrice);
                    (0,_storage__WEBPACK_IMPORTED_MODULE_3__.setTabReadyContent)({
                        sizes: "15 См",
                        breads: "Белый итальянский",
                        vegetables: [],
                        sauces: [],
                        fillings: []
                    })
                }
            }
            document.getElementById("plus-modal").addEventListener("click", handleModalPlusClick)
            document.getElementById("minus-modal").addEventListener("click", handleModalMinusClick)
            document.getElementById("counter-modal").addEventListener("change", handleInputChange)
            document.getElementById("button-modal").addEventListener("click", handleButtonModalClick)
        }
    }

    loadIngredients() {
        const ingredient = new _Ingredient_Ingredient__WEBPACK_IMPORTED_MODULE_1__["default"]({
            tabReadyContent: _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.tabReadyContent
        });
        let items = "";

        for (let key in _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.ingredients[_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedModalTab]) {
            items += ingredient.render(_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.ingredients[_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedModalTab][key], key);
        }

        return items;
    }

    loadReadyPage() {
        const content = /*html*/ `
        <div class="image-block">
            <img class="result-image" src="i/result_sandwich.jpg">
        </div>
        <div class="final-order-block">
            <p class="final-order-ready">Ваш сендвич готов!</p>
        <div class="final-order-size">
            <p class="final-order-size-text">Размер:</p>
            <p class="final-order-size-value">${_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.tabReadyContent.sizes}</p>
        </div>
        <div class="final-order-bread">
            <p class="final-order-bread-text">Хлеб:</p>
            <p class="final-order-bread-value">${_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.tabReadyContent.breads}</p>
        </div>
        <div class="final-order-vegetables">
            <p class="final-order-vegetables-text">Овощи:</p>
            <p class="final-order-vegetables-value">${_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.tabReadyContent.vegetables.length === 0
                ? "Нет" : _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.tabReadyContent.vegetables}</p>
        </div>
        <div class="final-order-sauces">
            <p class="final-order-sauces-text">Соусы:</p>
            <p class="final-order-sauces-value">${_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.tabReadyContent.sauces.length === 0
                ? "Нет" : _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.tabReadyContent.sauces}</p>
        </div>
        <div class="final-order-filling">
            <p class="final-order-filling-text">Начинка:</p>
            <p class="final-order-filling-value">${_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.tabReadyContent.fillings.length === 0
                ? "Нет" : _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.tabReadyContent.fillings}</p>
        </div>
            <p class="final-order-title" id="item-name-modal">${_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.title}</p>
        </div>
        `
        return content
    }

    loadModalOrder() {
        return (/*html*/ `
        <p class="item-amount">Количество</p>
        <div class="amount-block">
            <img class="minus-icon" id="minus-modal" src="i/minus.svg">
            <input class="item-counter" type="text" id="counter-modal" value=${_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.amount}>
            <img class="plus-icon" id="plus-modal" src="i/plus.svg">
        </div>
        <button class="item-button" id="button-modal">${_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalWindowAddShow ?
                "В КОРЗИНУ" : (_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalWindowEditShow ? "ИЗМЕНИТЬ" : [])}</button>
        `)
    }

    render() {
        let modalTabs = ``;
        for (let i in this.tabs) {
            modalTabs += `<p class="${_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedModalTab === i ? "tab-active" : "tab"}"
                id="${i}">${this.tabs[i]}</p>`
        }
        return (/*html*/`
        <div class="modal-sandwich-window">
            <div class="modal-sandwich-content">
                <div class="modal-header-block">
                    <h3 class="modal-header">Проверьте и добавьте в корзину</h3>
                    <img class="close-icon" src="i/close-icon.svg"/>
                </div>
                <div class="modal-tabs-block">
                    <div class="modal-tabs">
                       ${modalTabs}
                   </div>
                </div>
                <div class="arrows-block">
                </div>
                <div class="tab-content-block">
                ${_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedModalTab === "ready" ? this.loadReadyPage() : this.loadIngredients()}
                </div>
                <div class="modal-footer">
                    <div class="item-price-block">
                        <p class="price-text">Цена:</p>
                        <p class="price-value" id="price-modal">${_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedModalTab === "ready" ?
                _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.price * _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.amount : _storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.modalContent.price}</p>
                        <p class="price-currency">руб.</p>
                    </div>
                    <div class="modal-order-block">
                    ${_storage__WEBPACK_IMPORTED_MODULE_3__.storage.data.selectedModalTab === "ready" ? this.loadModalOrder() : []}
                    </div>
                </div>
            </div>
        </div>
        `)
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModalWindowSandwich);

/***/ }),

/***/ "./src/Order/Order.js":
/*!****************************!*\
  !*** ./src/Order/Order.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/Component.js");
/* harmony import */ var _Order_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Order.css */ "./src/Order/Order.css");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../storage */ "./src/storage.js");













class Order extends _Component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(props) {
        super()

        this.subscribers = ["orderItems", "totalPrice", "sandwiches"];
        for (let i in this.subscribers) {
            _storage__WEBPACK_IMPORTED_MODULE_2__.storage.addSubscriber(this.subscribers[i], props.rerender);
        }
    }

    basketRender() {
        let items = ""
        _storage__WEBPACK_IMPORTED_MODULE_2__.storage.data.orderItems.map((item) => {
            items += /*html*/`
                <div class="order-items" id="order-${item.id}">
                    <p class="${item.sandwichId ? "sandwich-title" : "order-title"}" 
                    id="${item.sandwichId ? "sandwich-" + item.sandwichId : []}">${item.title}</p>
                    <p class="order-amount">${item.amount}</p>
                    <p class="order-price">${item.price} руб.</p>
                    <img class="delete-icon" id="delete-${item.id}" src="i/trash.svg"/>
                </div>
            `
        })
        return items
    }

    enable() {
        for (let i = 0; i < _storage__WEBPACK_IMPORTED_MODULE_2__.storage.data.orderItems.length; i++) {
            const handleChangeDeleteIconClick = () => {
                (0,_storage__WEBPACK_IMPORTED_MODULE_2__.setTotalPrice)(_storage__WEBPACK_IMPORTED_MODULE_2__.storage.data.totalPrice - _storage__WEBPACK_IMPORTED_MODULE_2__.storage.data.orderItems[i].price);
                if (_storage__WEBPACK_IMPORTED_MODULE_2__.storage.data.orderItems[i].sandwichId) {
                    _storage__WEBPACK_IMPORTED_MODULE_2__.storage.data.sandwiches.splice(_storage__WEBPACK_IMPORTED_MODULE_2__.storage.data.orderItems[i].sandwichId - 1, 1);
                }
                _storage__WEBPACK_IMPORTED_MODULE_2__.storage.data.orderItems.splice(i, 1);

                let sandwichId = 1;
                _storage__WEBPACK_IMPORTED_MODULE_2__.storage.data.orderItems.map((item, i) => {
                    item.id = i + 1;
                    if (item.sandwichId) {
                        item.sandwichId = sandwichId;
                        sandwichId++;
                    }
                })
                ;(0,_storage__WEBPACK_IMPORTED_MODULE_2__.setSandwiches)(_storage__WEBPACK_IMPORTED_MODULE_2__.storage.data.sandwiches);
                (0,_storage__WEBPACK_IMPORTED_MODULE_2__.setOrderItems)(_storage__WEBPACK_IMPORTED_MODULE_2__.storage.data.orderItems);
            }
            document.getElementById("delete-" + (i + 1)).addEventListener('click', handleChangeDeleteIconClick);
        }
        if (_storage__WEBPACK_IMPORTED_MODULE_2__.storage.data.sandwiches.length > 0) {
            for (let i = 0; i < _storage__WEBPACK_IMPORTED_MODULE_2__.storage.data.sandwiches.length; i++) {
                const handleOrderClick = () => {
                    _storage__WEBPACK_IMPORTED_MODULE_2__.storage.data.changeableOrderItem.sandwichId = i;
                    let id = _storage__WEBPACK_IMPORTED_MODULE_2__.storage.data.orderItems.find(item => item.sandwichId ===
                        _storage__WEBPACK_IMPORTED_MODULE_2__.storage.data.changeableOrderItem.sandwichId + 1).id - 1;
                    _storage__WEBPACK_IMPORTED_MODULE_2__.storage.data.changeableOrderItem.orderId = id;
                    (0,_storage__WEBPACK_IMPORTED_MODULE_2__.setChangeableOrderItem)(_storage__WEBPACK_IMPORTED_MODULE_2__.storage.data.changeableOrderItem)
                    ;(0,_storage__WEBPACK_IMPORTED_MODULE_2__.setSelectedModalTab)("sizes");
                    (0,_storage__WEBPACK_IMPORTED_MODULE_2__.setModalWindowEditShow)(true);
                    (0,_storage__WEBPACK_IMPORTED_MODULE_2__.setTabReadyContent)(_storage__WEBPACK_IMPORTED_MODULE_2__.storage.data.sandwiches[i]);
                    (0,_storage__WEBPACK_IMPORTED_MODULE_2__.setModalContent)(_storage__WEBPACK_IMPORTED_MODULE_2__.storage.data.sandwiches[i]);
                }
                document.getElementById("sandwich-" + (i + 1)).addEventListener("click", handleOrderClick);
            }
        }
    }

    render() {
        return (/*html*/`
        <div class="order-head">
            <img class="basket-icon" src="i/basket.svg" />
            <p class="head-title">Корзина</p>
        </div>
        <div class="order-headers">
            <p class="title-header">Название</p>
            <p class="amount-header">Кол-во</p>
            <p class="price-header">Цена</p>
        </div>
        <div class="order-items-block">
        ${this.basketRender()}
        </div>
        <div>
            <div class="sum">
                <p class="sum-text">Цена: </p>
                <p class="sum-value" id="sum">${_storage__WEBPACK_IMPORTED_MODULE_2__.storage.data.totalPrice}</p>
                <p class="sum-currency">руб.</p>
            </div>
        </div>
        <button class="order-button">ОФОРМИТЬ ЗАКАЗ</button>
      `)
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Order);

/***/ }),

/***/ "./src/api/index.js":
/*!**************************!*\
  !*** ./src/api/index.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getItemsInfo": () => (/* binding */ getItemsInfo)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);


async function getItemsInfo() {
    let data = {};
    await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`http://localhost:8000/food/getAllFood`)
        .then(res => { data = res.data[0] });

    return data;
}

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setChangeableOrderItem": () => (/* binding */ setChangeableOrderItem),
/* harmony export */   "setCountersValue": () => (/* binding */ setCountersValue),
/* harmony export */   "setItemsInfo": () => (/* binding */ setItemsInfo),
/* harmony export */   "setModalContent": () => (/* binding */ setModalContent),
/* harmony export */   "setModalWindowAddShow": () => (/* binding */ setModalWindowAddShow),
/* harmony export */   "setModalWindowAuthorizationShow": () => (/* binding */ setModalWindowAuthorizationShow),
/* harmony export */   "setModalWindowEditShow": () => (/* binding */ setModalWindowEditShow),
/* harmony export */   "setOrderItems": () => (/* binding */ setOrderItems),
/* harmony export */   "setPreviousValues": () => (/* binding */ setPreviousValues),
/* harmony export */   "setSandwiches": () => (/* binding */ setSandwiches),
/* harmony export */   "setSelectedAuthorizationTab": () => (/* binding */ setSelectedAuthorizationTab),
/* harmony export */   "setSelectedModalTab": () => (/* binding */ setSelectedModalTab),
/* harmony export */   "setSelectedTab": () => (/* binding */ setSelectedTab),
/* harmony export */   "setTabReadyContent": () => (/* binding */ setTabReadyContent),
/* harmony export */   "setTotalPrice": () => (/* binding */ setTotalPrice),
/* harmony export */   "storage": () => (/* binding */ storage)
/* harmony export */ });
class Storage {
    constructor(data) {
        let handler = {
            set: this.handleValueUpdated.bind(this)
        }
        this.data = new Proxy(data, handler);
        this.subscribers = {};
    }

    addSubscriber(key, callback) {
        if (!this.subscribers[key]) {
            this.subscribers[key] = [];
        }
        this.subscribers[key].push(callback);
    }

    handleValueUpdated(item, key, value) {
        item[key] = value;
        if (this.subscribers[key]) {
            for (let callback in this.subscribers[key]) {
                console.log(key, this.subscribers[key][callback]);
                this.subscribers[key][callback]()
            }
        }
        return true
    }
}

const storage = new Storage({
    selectedTab: "sandwiches",
    selectedModalTab: "sizes",
    selectedAuthorizationTab: "login",
    items: [],
    ingredients: [],
    countersValue: [],
    orderItems: [],
    totalPrice: 0,
    modalWindowAddShow: false,
    modalWindowEditShow: false,
    modalWindowAuthorizationShow: false,
    modalContent: {},
    sandwiches: [],
    changeableOrderItem: {
        orderId: 0,
        sandwichId: 0
    },
    tabReadyContent: {
        sizes: "15 См",
        breads: "Белый итальянский",
        vegetables: [],
        sauces: [],
        fillings: []
    },
    previousValues: {
        sizes: 0,
        breads: 0
    }
});



function setSelectedTab(selectedTab) {
    storage.data.selectedTab = selectedTab;
}

function setSelectedAuthorizationTab(selectedAuthorizationTab) {
    storage.data.selectedAuthorizationTab = selectedAuthorizationTab;
}

function setOrderItems(orderItems) {
    storage.data.orderItems = orderItems;
}

function setTotalPrice(totalPrice) {
    storage.data.totalPrice = totalPrice;
}

function setSandwiches(sandwiches) {
    storage.data.sandwiches = sandwiches;
}

function setModalWindowAddShow(modalWindowAddShow) {
    storage.data.modalWindowAddShow = modalWindowAddShow;
}

function setModalWindowEditShow(modalWindowEditShow) {
    storage.data.modalWindowEditShow = modalWindowEditShow;
}

function setModalWindowAuthorizationShow(modalWindowAuthorizationShow) {
    storage.data.modalWindowAuthorizationShow = modalWindowAuthorizationShow;
}

function setModalContent(modalContent) {
    storage.data.modalContent = modalContent;
}

function setSelectedModalTab(selectedModalTab) {
    storage.data.selectedModalTab = selectedModalTab;
}

function setTabReadyContent(tabReadyContent) {
    storage.data.tabReadyContent = tabReadyContent;
}

function setChangeableOrderItem(changeableOrderItem) {
    storage.data.changeableOrderItem = changeableOrderItem;
}

function setCountersValue(countersValue) {
    storage.data.countersValue = countersValue;
}

function setPreviousValues(previousValues) {
    storage.data.previousValues = previousValues;
}

function setItemsInfo(data) {
    data.menu.map(() => {
        storage.data.countersValue.push(1)
    });
    storage.data.items = data.menu;
    storage.data.ingredients = {
        sizes: data.sizes,
        breads: data.breads,
        vegetables: data.vegetables,
        sauces: data.sauces,
        fillings: data.fillings
    }
}

/***/ }),

/***/ "./node_modules/js-cookie/dist/js.cookie.mjs":
/*!***************************************************!*\
  !*** ./node_modules/js-cookie/dist/js.cookie.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*! js-cookie v3.0.1 | MIT */
/* eslint-disable no-var */
function assign (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      target[key] = source[key];
    }
  }
  return target
}
/* eslint-enable no-var */

/* eslint-disable no-var */
var defaultConverter = {
  read: function (value) {
    if (value[0] === '"') {
      value = value.slice(1, -1);
    }
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
  },
  write: function (value) {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    )
  }
};
/* eslint-enable no-var */

/* eslint-disable no-var */

function init (converter, defaultAttributes) {
  function set (key, value, attributes) {
    if (typeof document === 'undefined') {
      return
    }

    attributes = assign({}, defaultAttributes, attributes);

    if (typeof attributes.expires === 'number') {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
    }
    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString();
    }

    key = encodeURIComponent(key)
      .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
      .replace(/[()]/g, escape);

    var stringifiedAttributes = '';
    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue
      }

      stringifiedAttributes += '; ' + attributeName;

      if (attributes[attributeName] === true) {
        continue
      }

      // Considers RFC 6265 section 5.2:
      // ...
      // 3.  If the remaining unparsed-attributes contains a %x3B (";")
      //     character:
      // Consume the characters of the unparsed-attributes up to,
      // not including, the first %x3B (";") character.
      // ...
      stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
    }

    return (document.cookie =
      key + '=' + converter.write(value, key) + stringifiedAttributes)
  }

  function get (key) {
    if (typeof document === 'undefined' || (arguments.length && !key)) {
      return
    }

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all.
    var cookies = document.cookie ? document.cookie.split('; ') : [];
    var jar = {};
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].split('=');
      var value = parts.slice(1).join('=');

      try {
        var foundKey = decodeURIComponent(parts[0]);
        jar[foundKey] = converter.read(value, foundKey);

        if (key === foundKey) {
          break
        }
      } catch (e) {}
    }

    return key ? jar[key] : jar
  }

  return Object.create(
    {
      set: set,
      get: get,
      remove: function (key, attributes) {
        set(
          key,
          '',
          assign({}, attributes, {
            expires: -1
          })
        );
      },
      withAttributes: function (attributes) {
        return init(this.converter, assign({}, this.attributes, attributes))
      },
      withConverter: function (converter) {
        return init(assign({}, this.converter, converter), this.attributes)
      }
    },
    {
      attributes: { value: Object.freeze(defaultAttributes) },
      converter: { value: Object.freeze(converter) }
    }
  )
}

var api = init(defaultConverter, { path: '/' });
/* eslint-enable no-var */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (api);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/Component.js");
/* harmony import */ var _MainHeader_MainHeader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MainHeader/MainHeader */ "./src/MainHeader/MainHeader.js");
/* harmony import */ var _MenuBlock_MenuBlock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MenuBlock/MenuBlock */ "./src/MenuBlock/MenuBlock.js");
/* harmony import */ var _MenuCategories_MenuCategories__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MenuCategories/MenuCategories */ "./src/MenuCategories/MenuCategories.js");
/* harmony import */ var _ModalWindowSandwich_ModalWindowSandwich__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ModalWindowSandwich/ModalWindowSandwich */ "./src/ModalWindowSandwich/ModalWindowSandwich.js");
/* harmony import */ var _ModalWindowAuthorization_ModalWindowAuthorization__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ModalWindowAuthorization/ModalWindowAuthorization */ "./src/ModalWindowAuthorization/ModalWindowAuthorization.js");
/* harmony import */ var _Order_Order__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Order/Order */ "./src/Order/Order.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./storage */ "./src/storage.js");
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./App.css */ "./src/App.css");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./api */ "./src/api/index.js");











class App extends _Component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super()
        this.rerenderMenuBlock = this.rerenderMenuBlock.bind(this);
        this.rerenderMenuCategories = this.rerenderMenuCategories.bind(this);
        this.rerenderOrder = this.rerenderOrder.bind(this);
        this.rerenderModalWindowSandwich = this.rerenderModalWindowSandwich.bind(this);
        this.rerenderModalWindowAuthorization = this.rerenderModalWindowAuthorization.bind(this)
    }

    createChildren() {
        this.mainHeader = new _MainHeader_MainHeader__WEBPACK_IMPORTED_MODULE_1__["default"]({
            rerender: this.rerenderModalWindowAuthorization
        });
        this.menuCategories = new _MenuCategories_MenuCategories__WEBPACK_IMPORTED_MODULE_3__["default"]({
            rerender: this.rerenderMenuCategories
        });
        this.order = new _Order_Order__WEBPACK_IMPORTED_MODULE_6__["default"]({
            rerender: this.rerenderOrder
        });
        this.menuBlock = new _MenuBlock_MenuBlock__WEBPACK_IMPORTED_MODULE_2__["default"]({
            rerender: this.rerenderMenuBlock
        });
        this.modalWindowSandwich = new _ModalWindowSandwich_ModalWindowSandwich__WEBPACK_IMPORTED_MODULE_4__["default"]({
            rerender: this.rerenderModalWindowSandwich
        });

        this.modalWindowAuthorization = new _ModalWindowAuthorization_ModalWindowAuthorization__WEBPACK_IMPORTED_MODULE_5__["default"]({
            rerender: this.rerenderModalWindowAuthorization
        })
    }

    async enable() {
        this.mainHeader.enable();
        this.menuCategories.enable();

        this.order.enable();
        if (this.data.modalWindowAddShow || this.data.modalWindowEditShow) {
            this.modalWindowSandwich.enable();
        }

        if (this.data.modalWindowAuthorizationShow) {
            this.modalWindowAuthorization.enable();
        }
        const itemsInfo = await (0,_api__WEBPACK_IMPORTED_MODULE_9__.getItemsInfo)();
        (0,_storage__WEBPACK_IMPORTED_MODULE_7__.setItemsInfo)(itemsInfo)
    }

    rerenderMenuCategories() {
        document.getElementsByClassName("menu-categories")[0].innerHTML = this.menuCategories.render();
        this.menuCategories.enable();
    }

    rerenderOrder() {
        document.getElementsByClassName("order")[0].innerHTML = this.order.render();
        this.order.enable();
    }

    rerenderMenuBlock() {
        document.getElementsByClassName("menu-block")[0].innerHTML = this.menuBlock.render();
        this.menuBlock.enable();
    }

    rerenderModalWindowSandwich() {
        if (_storage__WEBPACK_IMPORTED_MODULE_7__.storage.data.modalWindowAddShow || _storage__WEBPACK_IMPORTED_MODULE_7__.storage.data.modalWindowEditShow) {
            document.getElementsByClassName("modal-block")[0].innerHTML = this.modalWindowSandwich.render();
            this.modalWindowSandwich.enable();
        } else {
            document.getElementsByClassName("modal-block")[0].innerHTML = "";
        }
    }

    rerenderModalWindowAuthorization() {
         if (_storage__WEBPACK_IMPORTED_MODULE_7__.storage.data.modalWindowAuthorizationShow) {
            document.getElementsByClassName("modal-block")[0].innerHTML = this.modalWindowAuthorization.render();
            this.modalWindowAuthorization.enable();
        } else {
            document.getElementsByClassName("modal-block")[0].innerHTML = "";
        }
    }

    render() {
        this.createChildren();
        return (/*html*/`
            ${this.mainHeader.render()}
        <div class="main-form">
            <div class="categories_and_orders-block">
            <div class="menu-categories">
                ${this.menuCategories.render()}
            </div>
            <div class="order">
                ${this.order.render()}
            </div>
            </div>
            <div class="menu-block">
                ${this.menuBlock.render()}
            </div>
        </div>
        <div class="modal-block">
        </div>
        `)
    }
}

const app = new App();

document.body.innerHTML = app.render();
app.enable();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map