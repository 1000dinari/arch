/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 9241:
/***/ ((module) => {

module.exports = {
  ENVIRONMENT: 'PRODUCTION',
  AUTH_WEBAPP_URL: 'https://extension-auth.firebaseapp.com',
  BACKEND_BASE_URL: 'https://us-central1-faang-path.cloudfunctions.net',
  FIREBASE_API_KEY: 'AIzaSyARWjXjKwWAMw2wwZLgpuWoP_mOiXKS9Bw',
  ANALYTICS_ID: 'UA-239558446-3',
  REACT_APP_SENTRY_DSN: 'https://2d9b6420860f46debb188457222b4747@o4504371152748544.ingest.sentry.io/4504373453062144',
  JOB_BOARD_URL: 'https://app.careerflow.ai',
  AMPLITUDE_API_KEY: '43e85aeba8023c2d2bf7f4fbb284055a',
  INSTITUTE_JOBS_URL: 'https://coach.careerflow.ai',
  REACT_APP_GOOGLE_ANALYTICS_ID: '240010600',
  REACT_APP_BACKEND_BASE_URL: 'https://us-central1-faang-path.cloudfunctions.net',
  REACT_APP_ENVIRONMENT: 'PRODUCTION',
  REACT_APP_FIREBASE_API_KEY: 'AIzaSyARWjXjKwWAMw2wwZLgpuWoP_mOiXKS9Bw',
  REACT_APP_FIREBASE_AUTH_DOMAIN: 'faang-path.firebaseapp.com',
  REACT_APP_FIREBASE_DATABASE_URL: 'https://faang-path.firebaseio.com',
  REACT_APP_FIREBASE_PROJECT_ID: 'faang-path',
  REACT_APP_FIREBASE_STORAGE_BUCKET: 'faang-path',
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID: '205663867047',
  REACT_APP_FIREBASE_APP_ID: '1:205663867047:web:0ddc34aa654ad12b9a8b82',
  REACT_APP_FIREBASE_MEASUREMENT_ID: 'G-G8DDCG8X6J',
  REACT_APP_RECAPTCHA_TOKEN: '6Lfdy4sfAAAAAL6z7KLVRYjXl4ALO1zGKAEPStqo',
  REACT_APP_GA_TRACKING_ID: 'G-P4VJ40D7K2',
  REACT_APP_EXTENSION_ID: 'iadokddofjgcgjpjlfhngclhpmaelnli',
  REACT_APP_ANALYTICS_MEASUREMENT_ID: 'G-X82CH0MRM1',
  REACT_APP_GOOGLE_AUTOCOMPLETE: 'AIzaSyAOb7zdCXC5BRPN_buDOzjuv6tUwEbqGKI'
};

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
/******/ 			// no module.id needed
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./secrets.production.js
var secrets_production = __webpack_require__(9241);
var secrets_production_default = /*#__PURE__*/__webpack_require__.n(secrets_production);
;// CONCATENATED MODULE: ./src/utils/apiPaths.js

var innerConfig = {
  baseUrl: {"ALLUSERSPROFILE":"C:\\ProgramData","APPDATA":"C:\\Users\\admin\\AppData\\Roaming","ASSET_PATH":"/","BABEL_ENV":"production","ChocolateyInstall":"C:\\ProgramData\\chocolatey","ChocolateyLastPathUpdate":"132752087917807567","CHROME_CRASHPAD_PIPE_NAME":"\\\\.\\pipe\\LOCAL\\crashpad_23300_NMALUHTLOCSVHLNM","COLOR":"1","COLORTERM":"truecolor","CommonProgramFiles":"C:\\Program Files\\Common Files","CommonProgramFiles(x86)":"C:\\Program Files (x86)\\Common Files","CommonProgramW6432":"C:\\Program Files\\Common Files","COMPUTERNAME":"SANUJ-BANSAL","ComSpec":"C:\\Windows\\system32\\cmd.exe","DriverData":"C:\\Windows\\System32\\Drivers\\DriverData","EDITOR":"notepad.exe","FPS_BROWSER_APP_PROFILE_STRING":"Internet Explorer","FPS_BROWSER_USER_PROFILE_STRING":"Default","GIT_ASKPASS":"c:\\Users\\admin\\AppData\\Local\\Programs\\Microsoft VS Code\\resources\\app\\extensions\\git\\dist\\askpass.sh","HOME":"C:\\Users\\admin","HOMEDRIVE":"C:","HOMEPATH":"\\Users\\admin","INIT_CWD":"C:\\Users\\admin\\Desktop\\FaangPath\\chrome-extension-boilerplate-react","LANG":"en_US.UTF-8","LOCALAPPDATA":"C:\\Users\\admin\\AppData\\Local","LOGONSERVER":"\\\\SANUJ-BANSAL","NODE":"C:\\Program Files\\nodejs\\node.exe","NODE_ENV":"production","NODE_EXE":"C:\\Program Files\\nodejs\\\\node.exe","NPM_CLI_JS":"C:\\Program Files\\nodejs\\\\node_modules\\npm\\bin\\npm-cli.js","npm_command":"run-script","npm_config_cache":"C:\\Users\\admin\\AppData\\Local\\npm-cache","npm_config_globalconfig":"C:\\Users\\admin\\AppData\\Roaming\\npm\\etc\\npmrc","npm_config_global_prefix":"C:\\Users\\admin\\AppData\\Roaming\\npm","npm_config_init_module":"C:\\Users\\admin\\.npm-init.js","npm_config_local_prefix":"C:\\Users\\admin\\Desktop\\FaangPath\\chrome-extension-boilerplate-react","npm_config_metrics_registry":"https://registry.npmjs.org/","npm_config_node_gyp":"C:\\Program Files\\nodejs\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js","npm_config_noproxy":"","npm_config_prefix":"C:\\Users\\admin\\AppData\\Roaming\\npm","npm_config_userconfig":"C:\\Users\\admin\\.npmrc","npm_config_user_agent":"npm/8.15.0 node/v16.17.0 win32 x64 workspaces/false","npm_execpath":"C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js","npm_lifecycle_event":"build","npm_lifecycle_script":"node utils/build.js","npm_node_execpath":"C:\\Program Files\\nodejs\\node.exe","npm_package_json":"C:\\Users\\admin\\Desktop\\FaangPath\\chrome-extension-boilerplate-react\\package.json","npm_package_name":"careerflow-linkedin-optimization","npm_package_version":"2.0.2","NPM_PREFIX_NPM_CLI_JS":"C:\\Users\\admin\\AppData\\Roaming\\npm\\node_modules\\npm\\bin\\npm-cli.js","NUMBER_OF_PROCESSORS":"4","OneDrive":"C:\\Users\\admin\\OneDrive","OneDriveConsumer":"C:\\Users\\admin\\OneDrive","ORIGINAL_XDG_CURRENT_DESKTOP":"undefined","OS":"Windows_NT","Path":"C:\\Users\\admin\\Desktop\\FaangPath\\chrome-extension-boilerplate-react\\node_modules\\.bin;C:\\Users\\admin\\Desktop\\FaangPath\\node_modules\\.bin;C:\\Users\\admin\\Desktop\\node_modules\\.bin;C:\\Users\\admin\\node_modules\\.bin;C:\\Users\\node_modules\\.bin;C:\\node_modules\\.bin;C:\\Program Files\\nodejs\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;C:\\Windows\\system32;C:\\Windows;C:\\Windows\\System32\\Wbem;C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\Program Files\\Git\\cmd;C:\\Program Files\\nodejs\\;C:\\Program Files (x86)\\dotnet\\;C:\\Users\\admin\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Program Files\\Git\\mingw64\\bin;C:\\Users\\admin\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Users\\admin\\AppData\\Roaming\\Python\\Python39\\Scripts;C:\\Program Files\\Java\\jdk-17.0.2\\bin;C:\\Program Files\\nodejs;C:\\Program Files\\JetBrains\\WebStorm 2021.3.2\\bin;;C:\\Users\\admin\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin;C:\\Users\\admin\\AppData\\Roaming\\npm","PATHEXT":".COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC","PROCESSOR_ARCHITECTURE":"AMD64","PROCESSOR_IDENTIFIER":"Intel64 Family 6 Model 142 Stepping 9, GenuineIntel","PROCESSOR_LEVEL":"6","PROCESSOR_REVISION":"8e09","ProgramData":"C:\\ProgramData","ProgramFiles":"C:\\Program Files","ProgramFiles(x86)":"C:\\Program Files (x86)","ProgramW6432":"C:\\Program Files","PROMPT":"$P$G","PSModulePath":"C:\\Users\\admin\\Documents\\WindowsPowerShell\\Modules;C:\\Users\\admin\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\platform\\PowerShell","PUBLIC":"C:\\Users\\Public","REACT_APP_LINKEDIN_ORGANIZATION_ID":"66340065","REACT_APP_SECRET_KEY":"Career@!23","SESSIONNAME":"Console","SystemDrive":"C:","SystemRoot":"C:\\Windows","TEMP":"C:\\Users\\admin\\AppData\\Local\\Temp","TERM_PROGRAM":"vscode","TERM_PROGRAM_VERSION":"1.78.2","TMP":"C:\\Users\\admin\\AppData\\Local\\Temp","USERDOMAIN":"SANUJ-BANSAL","USERDOMAIN_ROAMINGPROFILE":"SANUJ-BANSAL","USERNAME":"admin","USERPROFILE":"C:\\Users\\admin","VSCODE_GIT_ASKPASS_EXTRA_ARGS":"--ms-enable-electron-run-as-node","VSCODE_GIT_ASKPASS_MAIN":"c:\\Users\\admin\\AppData\\Local\\Programs\\Microsoft VS Code\\resources\\app\\extensions\\git\\dist\\askpass-main.js","VSCODE_GIT_ASKPASS_NODE":"C:\\Users\\admin\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe","VSCODE_GIT_IPC_HANDLE":"\\\\.\\pipe\\vscode-git-f52d72a919-sock","WebStorm":"C:\\Program Files\\JetBrains\\WebStorm 2021.3.2\\bin;","windir":"C:\\Windows","ZES_ENABLE_SYSMAN":"1"}.BACKEND_BASE_URL || (secrets_production_default()).BACKEND_BASE_URL
};
var config = innerConfig;
var baseUrl = config.baseUrl;
var chromeExtensionApiPath = "".concat(config.baseUrl, "/chromeExtension");
var jobTrackerApiPath = "".concat(config.baseUrl, "/jobTracker");
var contactsApiPath = "".concat(config.baseUrl, "/jobTracker/contacts");
var miscApiPath = "".concat(config.baseUrl, "/faangpath/misc");
var instituteApiPath = "".concat(config.baseUrl, "/instituteApp/institute");
var userRoleApiPath = "".concat(config.baseUrl, "/faangpath/user-role");
var analyticsApiPath = "".concat(config.baseUrl, "/faangpath/analytics");
var linkedinProfileApiPath = "".concat(chromeExtensionApiPath, "/linkedinProfile");
var boardApiPath = "".concat(jobTrackerApiPath, "/board");
var jobApiPath = "".concat(jobTrackerApiPath, "/job");
var companyApiPath = "".concat(jobTrackerApiPath, "/company");
var notificationsApiPath = "".concat(config.baseUrl, "/faangpath/notification");
var userDetailApiPath = "".concat(jobTrackerApiPath, "/userdetail");
var aiHeadline = "".concat(baseUrl, "/aiTools/generate/linkedin/headline");
var aiPost = "".concat(baseUrl, "/aiTools/generate/linkedin-post");
var aiAbout = "".concat(baseUrl, "/aiTools/generate/linkedin/about");
var aiCoverLetter = "".concat(baseUrl, "/aiTools/generate/cover-letter");
var aiJdSummary = "".concat(baseUrl, "/aiTools/generate/job-summary");
;// CONCATENATED MODULE: ./src/pages/Background/index.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }


var ANALYTICS_PATH = 'https://www.google-analytics.com/collect';
var userObject;
// TODO add the chrome extension landing page and open it by default after installing extension.
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === 'install') {
    chrome.tabs.create({
      url: 'https://www.linkedin.com/in/',
      active: true
    });
    chrome.runtime.setUninstallURL('https://docs.google.com/forms/d/1WLsY2WRC3SfJTtFZGbdTzlxR1erSiQQuSSk5A6gRUeA');
  }
  return false;
});
chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
  if (request.user) {
    userObject = request.user;
    sendResponse({
      success: true,
      message: 'Token has been received'
    });
    chrome.storage.session.get(['tabIds']).then(function (result) {
      if (result.tabIds) {
        var tabIds = result.tabIds;
        var _iterator = _createForOfIteratorHelper(tabIds),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var tabId = _step.value;
            chrome.tabs.sendMessage(tabId, {
              user: request.user
            });
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    });
  }
});
function postData() {
  return _postData.apply(this, arguments);
}
function _postData() {
  _postData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var url,
      data,
      _args2 = arguments;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          url = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : '';
          data = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
          _context2.next = 4;
          return fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: data
          });
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _postData.apply(this, arguments);
}
var sendAnalytics = function sendAnalytics(msg) {
  var gaParams = new URLSearchParams();
  gaParams.append('v', 1);
  gaParams.append('tid', (secrets_production_default()).ANALYTICS_ID);
  gaParams.append('cid', msg.analytics.clientId || 1);
  gaParams.append('t', 'event');
  gaParams.append('ec', msg.analytics.eventCategory);
  gaParams.append('ea', msg.analytics.eventAction);
  postData(ANALYTICS_PATH, gaParams);
};

// TODO add client id to each of the analytics request
chrome.runtime.onMessage.addListener( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(msg, sender, sendResponse) {
    var _msg$signinWithEmailA, authUser, userInfo, token;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!msg.signinWithEmailAndPassword) {
            _context.next = 7;
            break;
          }
          _msg$signinWithEmailA = msg.signinWithEmailAndPassword, authUser = _msg$signinWithEmailA.authUser, userInfo = _msg$signinWithEmailA.userInfo;
          _context.next = 4;
          return authUser.stsTokenManager.accessToken;
        case 4:
          token = _context.sent;
          fetch(userRoleApiPath, {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              role: 'MENTEE',
              fname: userInfo.firstName,
              lname: userInfo.lastName,
              fullName: userInfo.firstName + ' ' + userInfo.lastName,
              mentorStatus: '',
              profilePhoto: '',
              linkedin: '',
              mentorRating: 0
            })
          });
          chrome.storage.session.get(['tabIds']).then(function (result) {
            if (result.tabIds) {
              var _iterator2 = _createForOfIteratorHelper(result.tabIds),
                _step2;
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var tabId = _step2.value;
                  chrome.tabs.sendMessage(tabId, {
                    user: authUser
                  }, function (response) {
                    if (response.success) {
                      sendResponse({
                        success: true
                      });
                      return true;
                    }
                  });
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }
          });
        case 7:
          if (msg.analytics) {
            sendAnalytics(msg);
            if ((secrets_production_default()).AMPLITUDE_API_KEY) fetch('https://api2.amplitude.com/2/httpapi', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                api_key: (secrets_production_default()).AMPLITUDE_API_KEY,
                events: [{
                  user_id: msg.analytics.clientId,
                  event_type: msg.analytics.eventAction
                }]
              })
            });
          } else if (msg.auth === 'extensionTab') {
            chrome.storage.session.get(['tabIds']).then(function (result) {
              if (!result.tabIds) {
                chrome.storage.session.set({
                  tabIds: [sender.tab.id]
                });
              } else {
                if (!result.tabIds.includes(sender.tab.id)) chrome.storage.session.set({
                  tabIds: [].concat(_toConsumableArray(result.tabIds), [sender.tab.id])
                });
              }
            });
          } else if (msg.tryAuth) {
            if (msg.tryAuth.user) {
              userObject = msg.tryAuth.user;
            }
            chrome.storage.session.get(['tabIds']).then(function (result) {
              if (result.tabIds) {
                var _iterator3 = _createForOfIteratorHelper(result.tabIds),
                  _step3;
                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    var tabId = _step3.value;
                    chrome.tabs.sendMessage(tabId, {
                      user: userObject
                    }, function (response) {
                      if (response.success) {
                        sendResponse({
                          success: true
                        });
                        return true;
                      }
                    });
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }
              }
            });
          } else if (msg.removeTab) {
            chrome.storage.session.get(['tabIds', 'jobBoardTabIds']).then(function (result) {
              var updates = {};
              if (result.tabIds) {
                var tabIds = result.tabIds;
                var index = tabIds.findIndex(function (tabId) {
                  return tabId === sender.tab.id;
                });
                if (index !== -1) tabIds.splice(index, 1);
                updates.tabIds = tabIds;
              }
              if (result.jobBoardTabIds) {
                var jobBoardTabIds = result.jobBoardTabIds;
                var jobBoardTabIndex = jobBoardTabIds.findIndex(function (tabId) {
                  return tabId === sender.tab.id;
                });
                if (jobBoardTabIndex !== -1) jobBoardTabIds.splice(jobBoardTabIndex, 1);
                updates.jobBoardTabIds = jobBoardTabIds;
              }
              chrome.storage.session.set(updates);
            });
          } else if (msg.jobBoardTab) {
            chrome.storage.session.get(['jobBoardTabIds']).then(function (result) {
              if (result.jobBoardTabIds) {
                var jobBoardTabIds = result.jobBoardTabIds;
                if (!jobBoardTabIds.includes(sender.tab.id)) chrome.storage.session.set(('jobBoardTabIds', [].concat(_toConsumableArray(jobBoardTabIds), [sender.tab.id])));
              }
            });
          } else if (msg.jobSaved) {
            chrome.storage.session.get(['jobBoardTabIds']).then(function (result) {
              if (result.jobBoardTabIds) {
                var jobBoardTabIds = result.jobBoardTabIds;
                var _iterator4 = _createForOfIteratorHelper(jobBoardTabIds),
                  _step4;
                try {
                  for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                    var tabId = _step4.value;
                    chrome.tabs.sendMessage(tabId, {
                      jobSavedFromExtension: true
                    });
                  }
                } catch (err) {
                  _iterator4.e(err);
                } finally {
                  _iterator4.f();
                }
              }
            });
          }
          return _context.abrupt("return", false);
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
})();

/******/ })()
;