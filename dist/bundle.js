/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/App.css":
/*!***********************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/App.css ***!
  \***********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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
___CSS_LOADER_EXPORT___.push([module.id, ".main-header {\n    text-align: center;\n}", "",{"version":3,"sources":["webpack://./src/MainHeader/MainHeader.css"],"names":[],"mappings":"AAAA;IACI,kBAAkB;AACtB","sourcesContent":[".main-header {\n    text-align: center;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/MenuBlock/MenuBlock.css":
/*!***************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/MenuBlock/MenuBlock.css ***!
  \***************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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

/***/ "./node_modules/css-loader/dist/cjs.js!./src/ModalWindow/ModalWindow.css":
/*!*******************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/ModalWindow/ModalWindow.css ***!
  \*******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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
___CSS_LOADER_EXPORT___.push([module.id, ".modal-window {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    position: fixed;\n    left: 0;\n    top: 0;\n    background-color: rgba(0, 0, 0, 0.6);\n}\n\n.modal-content {\n    width: 900px;\n    height: 570px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    background-color: gainsboro;\n    border-radius: 5px;\n}\n\n.modal-header-block {\n    width: 100%;\n    display: flex;\n    background-color: var(--yellow-color);\n    border-top-right-radius: 5px;\n    border-top-left-radius: 5px;\n}\n\n.modal-header {\n    height: 50px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    font-weight: 300;\n    color: white;\n    margin: 0;\n}\n\n.close-icon {\n    width: 20px;\n    height: 20px;\n    cursor: pointer;\n}\n\n.modal-tabs-block {\n    height: 50px;\n    margin-top: 15px;\n}\n\n.modal-tabs {\n    width: 800px;\n    height: 50px;\n    display: flex;\n    justify-content: center;\n    background-color: white;\n    cursor: pointer;\n    border-radius: 5px;\n    overflow: hidden;\n}\n\n.tab {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    padding-left: 30px;\n    padding-right: 30px;\n}\n\n.tab-active {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    padding-left: 30px;\n    padding-right: 30px;\n    color: white;\n    background-color: #D96746;\n}\n\n.arrows-block {\n    display: flex;  \n    justify-content: space-between;\n    width: 800px;\n    margin-top: 10px;\n    margin-bottom: 10px;\n}\n\n.arrow {\n    cursor: pointer;\n    width: 100px;\n    height: 30px;\n    background-color: #D96746;\n    color: white;\n    border: none;\n    border-radius: 5px;\n    font-size: 16px;\n}\n\n.tab-content-block {\n    background-color: gainsboro;\n    width: 85%;\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    overflow: auto;\n}\n\n.modal-item {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    margin-bottom: 40px;\n}\n\n.modal-item-active {\n    cursor: pointer;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    margin-bottom: 40px;\n    background-color: var(--yellow-color);\n}\n\n.modal-item:hover {\n    cursor: pointer;\n    background-color: #F6D846;\n}\n\n.image-block {\n    width: 200px;\n    height: 270px;\n    display: flex;\n    align-items: flex-end;\n    justify-content: center;\n}\n\n.result-image {\n    width: 150px;\n    height: 150px;\n    border-radius: 100%;\n    border: 10px solid var(--yellow-color);\n}\n\n.final-order-block {\n    width: 450px;\n    height: 270px;\n    margin-left: 30px;\n}\n\n.final-order-ready {\n    font-size: 20px;\n    border-bottom: 2px solid var(--light-gray-color);\n}\n\n.final-order-size,\n.final-order-bread,\n.final-order-vegetables,\n.final-order-sauces {\n    margin: 0;\n    display: flex;\n    font-size: 14px;\n    margin-top: 10px;\n}\n\n.final-order-filling {\n    display: flex;\n    font-size: 14px;\n    border-bottom: 2px solid var(--light-gray-color);\n    padding-bottom: 20px;\n    margin-top: 10px;\n}\n\n.final-order-size-text,\n.final-order-bread-text,\n.final-order-vegetables-text,\n.final-order-sauces-text,\n.final-order-filling-text {\n    margin: 0;\n}\n\n.final-order-size-value,\n.final-order-bread-value,\n.final-order-vegetables-value,\n.final-order-sauces-value,\n.final-order-filling-value  {\n    margin: 0;\n    margin-left: 5px;\n}\n\n.final-order-title {\n    padding-top: 20px;\n    font-size: 20px;\n    margin: 0;\n}\n\n.modal-footer {\n    width: 100%;\n    padding-bottom: 20px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    background-color: white;\n    margin-top: auto;\n    border-bottom-right-radius: 5px;\n    border-bottom-left-radius: 5px;\n}\n\n.modal-order-block {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}", "",{"version":3,"sources":["webpack://./src/ModalWindow/ModalWindow.css"],"names":[],"mappings":"AAAA;IACI,WAAW;IACX,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,eAAe;IACf,OAAO;IACP,MAAM;IACN,oCAAoC;AACxC;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,2BAA2B;IAC3B,kBAAkB;AACtB;;AAEA;IACI,WAAW;IACX,aAAa;IACb,qCAAqC;IACrC,4BAA4B;IAC5B,2BAA2B;AAC/B;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,WAAW;IACX,gBAAgB;IAChB,YAAY;IACZ,SAAS;AACb;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,eAAe;AACnB;;AAEA;IACI,YAAY;IACZ,gBAAgB;AACpB;;AAEA;IACI,YAAY;IACZ,YAAY;IACZ,aAAa;IACb,uBAAuB;IACvB,uBAAuB;IACvB,eAAe;IACf,kBAAkB;IAClB,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,WAAW;IACX,YAAY;IACZ,SAAS;IACT,kBAAkB;IAClB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,WAAW;IACX,YAAY;IACZ,SAAS;IACT,kBAAkB;IAClB,mBAAmB;IACnB,YAAY;IACZ,yBAAyB;AAC7B;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,YAAY;IACZ,gBAAgB;IAChB,mBAAmB;AACvB;;AAEA;IACI,eAAe;IACf,YAAY;IACZ,YAAY;IACZ,yBAAyB;IACzB,YAAY;IACZ,YAAY;IACZ,kBAAkB;IAClB,eAAe;AACnB;;AAEA;IACI,2BAA2B;IAC3B,UAAU;IACV,aAAa;IACb,qCAAqC;IACrC,cAAc;AAClB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,mBAAmB;AACvB;;AAEA;IACI,eAAe;IACf,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,mBAAmB;IACnB,qCAAqC;AACzC;;AAEA;IACI,eAAe;IACf,yBAAyB;AAC7B;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,aAAa;IACb,qBAAqB;IACrB,uBAAuB;AAC3B;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,sCAAsC;AAC1C;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,iBAAiB;AACrB;;AAEA;IACI,eAAe;IACf,gDAAgD;AACpD;;AAEA;;;;IAII,SAAS;IACT,aAAa;IACb,eAAe;IACf,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,eAAe;IACf,gDAAgD;IAChD,oBAAoB;IACpB,gBAAgB;AACpB;;AAEA;;;;;IAKI,SAAS;AACb;;AAEA;;;;;IAKI,SAAS;IACT,gBAAgB;AACpB;;AAEA;IACI,iBAAiB;IACjB,eAAe;IACf,SAAS;AACb;;AAEA;IACI,WAAW;IACX,oBAAoB;IACpB,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,uBAAuB;IACvB,gBAAgB;IAChB,+BAA+B;IAC/B,8BAA8B;AAClC;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;AACvB","sourcesContent":[".modal-window {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    position: fixed;\n    left: 0;\n    top: 0;\n    background-color: rgba(0, 0, 0, 0.6);\n}\n\n.modal-content {\n    width: 900px;\n    height: 570px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    background-color: gainsboro;\n    border-radius: 5px;\n}\n\n.modal-header-block {\n    width: 100%;\n    display: flex;\n    background-color: var(--yellow-color);\n    border-top-right-radius: 5px;\n    border-top-left-radius: 5px;\n}\n\n.modal-header {\n    height: 50px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    font-weight: 300;\n    color: white;\n    margin: 0;\n}\n\n.close-icon {\n    width: 20px;\n    height: 20px;\n    cursor: pointer;\n}\n\n.modal-tabs-block {\n    height: 50px;\n    margin-top: 15px;\n}\n\n.modal-tabs {\n    width: 800px;\n    height: 50px;\n    display: flex;\n    justify-content: center;\n    background-color: white;\n    cursor: pointer;\n    border-radius: 5px;\n    overflow: hidden;\n}\n\n.tab {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    padding-left: 30px;\n    padding-right: 30px;\n}\n\n.tab-active {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    padding-left: 30px;\n    padding-right: 30px;\n    color: white;\n    background-color: #D96746;\n}\n\n.arrows-block {\n    display: flex;  \n    justify-content: space-between;\n    width: 800px;\n    margin-top: 10px;\n    margin-bottom: 10px;\n}\n\n.arrow {\n    cursor: pointer;\n    width: 100px;\n    height: 30px;\n    background-color: #D96746;\n    color: white;\n    border: none;\n    border-radius: 5px;\n    font-size: 16px;\n}\n\n.tab-content-block {\n    background-color: gainsboro;\n    width: 85%;\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    overflow: auto;\n}\n\n.modal-item {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    margin-bottom: 40px;\n}\n\n.modal-item-active {\n    cursor: pointer;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    margin-bottom: 40px;\n    background-color: var(--yellow-color);\n}\n\n.modal-item:hover {\n    cursor: pointer;\n    background-color: #F6D846;\n}\n\n.image-block {\n    width: 200px;\n    height: 270px;\n    display: flex;\n    align-items: flex-end;\n    justify-content: center;\n}\n\n.result-image {\n    width: 150px;\n    height: 150px;\n    border-radius: 100%;\n    border: 10px solid var(--yellow-color);\n}\n\n.final-order-block {\n    width: 450px;\n    height: 270px;\n    margin-left: 30px;\n}\n\n.final-order-ready {\n    font-size: 20px;\n    border-bottom: 2px solid var(--light-gray-color);\n}\n\n.final-order-size,\n.final-order-bread,\n.final-order-vegetables,\n.final-order-sauces {\n    margin: 0;\n    display: flex;\n    font-size: 14px;\n    margin-top: 10px;\n}\n\n.final-order-filling {\n    display: flex;\n    font-size: 14px;\n    border-bottom: 2px solid var(--light-gray-color);\n    padding-bottom: 20px;\n    margin-top: 10px;\n}\n\n.final-order-size-text,\n.final-order-bread-text,\n.final-order-vegetables-text,\n.final-order-sauces-text,\n.final-order-filling-text {\n    margin: 0;\n}\n\n.final-order-size-value,\n.final-order-bread-value,\n.final-order-vegetables-value,\n.final-order-sauces-value,\n.final-order-filling-value  {\n    margin: 0;\n    margin-left: 5px;\n}\n\n.final-order-title {\n    padding-top: 20px;\n    font-size: 20px;\n    margin: 0;\n}\n\n.modal-footer {\n    width: 100%;\n    padding-bottom: 20px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    background-color: white;\n    margin-top: auto;\n    border-bottom-right-radius: 5px;\n    border-bottom-left-radius: 5px;\n}\n\n.modal-order-block {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/Order/Order.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/Order/Order.css ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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

/***/ "./src/ModalWindow/ModalWindow.css":
/*!*****************************************!*\
  !*** ./src/ModalWindow/ModalWindow.css ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ModalWindow_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./ModalWindow.css */ "./node_modules/css-loader/dist/cjs.js!./src/ModalWindow/ModalWindow.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ModalWindow_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ModalWindow_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_ModalWindow_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_ModalWindow_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/Order/Order.css":
/*!*****************************!*\
  !*** ./src/Order/Order.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Component {
    constructor(data = {}) {
        let handler = {
            set: this.handleDataChange.bind(this)
        }
        this.data = new Proxy(data, handler)
    }

    handleDataChange(item, property, value) {
        item[property] = value
        this.rerender(this.data)
        return true
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/Component.js");
/* harmony import */ var _MainHeader_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MainHeader.css */ "./src/MainHeader/MainHeader.css");



class MainHeader extends _Component__WEBPACK_IMPORTED_MODULE_0__["default"]{
    constructor() {
        super();
    }
    render() {
        return (/*html*/`
            <h1 class="main-header">СДЕЛАЙТЕ ЗАКАЗ НАПРЯМУЮ ИЗ РЕСТОРАНА</h1>
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/Component.js");
/* harmony import */ var _MenuItem_MenuItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../MenuItem/MenuItem */ "./src/MenuItem/MenuItem.js");
/* harmony import */ var _MenuBlock_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MenuBlock.css */ "./src/MenuBlock/MenuBlock.css");




class MenuBlock extends _Component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(props) {
        super()
        this.countersValue = props.countersValue;
        this.items = props.items;
        this.selectedTab = props.selectedTab;
        this.orderItems = props.orderItems;
        this.totalPrice = props.totalPrice;

        this.setSelectedModalTab = props.setSelectedModalTab;
        this.setModalContent = props.setModalContent;
        this.setModalWindowAddShow = props.setModalWindowAddShow;
        this.setCountersValue = props.setCountersValue;
        this.setOrderItems = props.setOrderItems;
        this.setTotalPrice = props.setTotalPrice;
    }

    enable() {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i] && this.items[i].category !== this.selectedTab) {
                continue;
            }

            const handlePlusClick = () => {
                this.countersValue[i] += 1;
                this.setCountersValue(this.countersValue)
            }

            const handleMinusClick = () => {
                if (this.countersValue[i] > 1) {
                    this.countersValue[i] -= 1;
                    this.setCountersValue(this.countersValue)
                }
            }

            const handleInputChange = () => {
                this.countersValue[i] = parseInt(document.getElementById("counter-" + (i + 1)).value);
                this.setCountersValue(this.countersValue);
            }

            const handleButtonClick = () => {
                if (this.selectedTab === "sandwiches") {
                    this.setSelectedModalTab("sizes");
                    this.setModalWindowAddShow(true);
                    this.setModalContent({
                        id: i + 1,
                        title: this.items[i].name,
                        amount: this.countersValue[i],
                        price: this.items[i].price
                    });
                } else {
                    this.orderItems.push({
                        id: this.orderItems.length + 1,
                        title: this.items[i].name,
                        amount: this.countersValue[i],
                        price: this.items[i].price * this.countersValue[i]
                    });
                    this.setOrderItems(this.orderItems);
                    this.setTotalPrice(this.totalPrice + (this.items[i].price * this.countersValue[i]))
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
        for (let i in this.items) {
            if (this.items[i].category !== this.selectedTab) {
                continue;
            }

            if (this.items[i].market === "sfc") {
                logo = "i/South_fried_chicken_logo.png";
            } else if (this.items[i].market === "doner") {
                logo = "i/Doner_logo.png";
            } else {
                logo = "i/Subway_logo.png";
            }
            items += menuItem.render(this.items[i], parseInt(i) + 1, logo, this.countersValue);
        }

        return items;
    }

    render() {
        return (/*html*/`
        <div class="menu-block">
            <div class="items-block">
            ${this.loadMenu()}
            </div>
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/Component.js");
/* harmony import */ var _MenuCategories_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuCategories.css */ "./src/MenuCategories/MenuCategories.css");



class MenuCategories extends _Component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(props) {
        super()
        this.setSelectedTab = props.setSelectedTab;

        this.selectedTab = props.selectedTab

        this.categories =
        {
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
            if (this.selectedTab !== target.target.id) {
                this.setSelectedTab(target.target.id);
            }
        }

        render() {
            let menuItems = ``;
            for (let i in this.categories) {
                menuItems += `<p class="${this.selectedTab === i ? "category-active" : "category"}"
                id="${i}">${this.categories[i]}</p>` 
            }
            return (/*html*/`
        <div class="menu-categories">
            ${menuItems}
        </div>
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

/***/ "./src/ModalWindow/ModalWindow.js":
/*!****************************************!*\
  !*** ./src/ModalWindow/ModalWindow.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/Component.js");
/* harmony import */ var _Ingredient_Ingredient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Ingredient/Ingredient */ "./src/Ingredient/Ingredient.js");
/* harmony import */ var _ModalWindow_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ModalWindow.css */ "./src/ModalWindow/ModalWindow.css");




class ModalWindow extends _Component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(props) {
        super();
        this.ingredients = props.ingredients;
        this.selectedModalTab = props.selectedModalTab;
        this.modalContent = props.modalContent;
        this.tabReadyContent = props.tabReadyContent;
        this.previousValues = props.previousValues;
        this.countersValue = props.countersValue;
        this.orderItems = props.orderItems;
        this.totalPrice = props.totalPrice;
        this.sandwichesLength = props.sandwichesLength;
        this.sandwiches = props.sandwiches;
        this.modalWindowAddShow = props.modalWindowAddShow;
        this.modalWindowEditShow = props.modalWindowEditShow;
        this.changeableOrderItem = props.changeableOrderItem;

        this.setChangeableOrderItem = props.setChangeableOrderItem;
        this.setSandwiches = props.setSandwiches;
        this.setSandwichesLength = props.setSandwichesLength;
        this.setTotalPrice = props.setTotalPrice;
        this.setOrderItems = props.setOrderItems;
        this.setCountersValue = props.setCountersValue;
        this.setPreviousValues = props.setPreviousValues;
        this.setModalContent = props.setModalContent;
        this.setTabReadyContent = props.setTabReadyContent;
        this.setModalWindowAddShow = props.setModalWindowAddShow;
        this.setModalWindowEditShow = props.setModalWindowEditShow;
        this.setSelectedModalTab = props.setSelectedModalTab;
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
        const sizesTabClick = () => {
            this.setSelectedModalTab("sizes")
        }
        const breadsTabClick = () => {
            this.setSelectedModalTab("breads")
        }
        const vegetablesTabClick = () => {
            this.setSelectedModalTab("vegetables")
        }
        const saucesTabClick = () => {
            this.setSelectedModalTab("sauces")
        }
        const fillingsTabClick = () => {
            this.setSelectedModalTab("fillings")
        }
        const readyTabClick = () => {
            this.setSelectedModalTab("ready")
        }

        const closeIconClick = () => {
            this.setPreviousValues({
                sizes: 0,
                breads: 0
            })
            this.setModalWindowAddShow(false);
            this.setModalWindowEditShow(false);
            this.setTabReadyContent({
                sizes: "15 См",
                breads: "Белый итальянский",
                vegetables: [],
                sauces: [],
                fillings: []
            })
        }

        document.getElementById("sizes").addEventListener("click", sizesTabClick)
        document.getElementById("breads").addEventListener("click", breadsTabClick)
        document.getElementById("vegetables").addEventListener("click", vegetablesTabClick)
        document.getElementById("sauces").addEventListener("click", saucesTabClick)
        document.getElementById("fillings").addEventListener("click", fillingsTabClick)
        document.getElementById("ready").addEventListener("click", readyTabClick)

        document.getElementsByClassName("close-icon")[0].addEventListener("click", closeIconClick)

        for (let key in this.ingredients[this.selectedModalTab]) {
            const modalItemClick = () => {
                const scrollPosition = document.getElementsByClassName("tab-content-block")[0].scrollTop
                if (this.selectedModalTab === "sizes" || this.selectedModalTab === "breads") {
                    this.tabReadyContent[this.selectedModalTab] = this.ingredients[this.
                        selectedModalTab][key].name;

                    this.modalContent.price += this.ingredients[this.selectedModalTab][key].price;
                    this.modalContent.price -= this.previousValues[this.selectedModalTab];

                    this.previousValues[this.selectedModalTab] = this.
                        ingredients[this.selectedModalTab][key].price;

                    this.setTabReadyContent(this.tabReadyContent);
                } else {
                    if (this.tabReadyContent[this.selectedModalTab].includes(this.
                        ingredients[this.selectedModalTab][key].name)) {
                        let n = this.tabReadyContent[this.selectedModalTab].indexOf(this.
                            ingredients[this.selectedModalTab][key].name);
                        this.modalContent.price -= this.ingredients[this.selectedModalTab][key].price;
                        this.tabReadyContent[this.selectedModalTab].splice(n, 1);
                        this.setTabReadyContent(this.tabReadyContent);
                    } else {
                        this.tabReadyContent[this.selectedModalTab].push(this.ingredients[this.
                            selectedModalTab][key].name)
                        this.modalContent.price += this.ingredients[this.selectedModalTab][key].price;
                        this.setTabReadyContent(this.tabReadyContent)
                    }
                }
                document.getElementsByClassName("tab-content-block")[0].scrollTo(0, scrollPosition)
            }
            document.getElementById("item-" + key).addEventListener("click", modalItemClick)
        }

        if (this.selectedModalTab === "ready") {
            const handleModalPlusClick = () => {
                this.modalContent.amount += 1;
                this.setModalContent(this.modalContent);
                this.countersValue[this.modalContent.id - 1] += 1;
                this.setCountersValue(this.countersValue);
            }
            const handleModalMinusClick = () => {
                if (this.modalContent.amount > 1) {
                    this.modalContent.amount -= 1;
                    this.setModalContent(this.modalContent);
                    this.countersValue[this.modalContent.id - 1] -= 1;
                    this.setCountersValue(this.countersValue);
                }
            }
            const handleInputChange = () => {
                this.modalContent.amount = parseInt(document.getElementById("counter-modal").value);
                this.setModalContent(this.modalContent);
                this.countersValue[this.modalContent.id - 1] = parseInt(document.
                    getElementById("counter-modal").value);
                this.setCountersValue(this.countersValue);
            }

            const handleButtonModalClick = () => {
                this.setSelectedModalTab("sizes");
                if (this.modalWindowAddShow) {
                    this.setModalWindowAddShow(false);
                    this.setSandwichesLength(this.sandwichesLength + 1);

                    this.sandwiches.push({
                        id: this.modalContent.id,
                        title: this.modalContent.title,
                        amount: this.modalContent.amount,
                        price: this.modalContent.price,
                        sizes: this.tabReadyContent.sizes,
                        breads: this.tabReadyContent.breads,
                        vegetables: this.tabReadyContent.vegetables,
                        sauces: this.tabReadyContent.sauces,
                        fillings: this.tabReadyContent.fillings
                    });

                    this.orderItems.push({
                        sandwichId: this.sandwiches.length,
                        id: this.orderItems.length + 1,
                        title: this.modalContent.title,
                        amount: this.modalContent.amount,
                        price: this.modalContent.price * this.modalContent.amount
                    });
                    this.setOrderItems(this.orderItems);
                    this.setSandwiches(this.sandwiches);

                    this.setTotalPrice(this.totalPrice + (this.modalContent.price * this.modalContent.amount));

                    this.setTabReadyContent({
                        sizes: "15 См",
                        breads: "Белый итальянский",
                        vegetables: [],
                        sauces: [],
                        fillings: []
                    })
                }
                if (this.modalWindowEditShow) {
                    this.setModalWindowEditShow(false);

                    console.log(this.changeableOrderItem);
                    this.sandwiches[this.changeableOrderItem.sandwichId] = {
                        id: this.modalContent.id,
                        title: this.modalContent.title,
                        amount: this.modalContent.amount,
                        price: this.modalContent.price,
                        sizes: this.tabReadyContent.sizes,
                        breads: this.tabReadyContent.breads,
                        vegetables: this.tabReadyContent.vegetables,
                        sauces: this.tabReadyContent.sauces,
                        fillings: this.tabReadyContent.fillings
                    };
                    this.setSandwiches(this.sandwiches);

                    let previousPrice = this.orderItems[this.changeableOrderItem.orderId].price;
                    console.log(previousPrice);

                    this.orderItems[this.changeableOrderItem.orderId].amount = this.modalContent.amount;
                    this.orderItems[this.changeableOrderItem.orderId].price =
                        this.modalContent.price * this.modalContent.amount;

                    this.setTotalPrice(this.totalPrice + (this.modalContent.price * 
                        this.modalContent.amount) - previousPrice);
                    this.setTabReadyContent({
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
            tabReadyContent: this.tabReadyContent
        });
        let items = "";

        for (let key in this.ingredients[this.selectedModalTab]) {
            items += ingredient.render(this.ingredients[this.selectedModalTab][key], key);
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
            <p class="final-order-size-value">${this.tabReadyContent.sizes}</p>
        </div>
        <div class="final-order-bread">
            <p class="final-order-bread-text">Хлеб:</p>
            <p class="final-order-bread-value">${this.tabReadyContent.breads}</p>
        </div>
        <div class="final-order-vegetables">
            <p class="final-order-vegetables-text">Овощи:</p>
            <p class="final-order-vegetables-value">${this.tabReadyContent.vegetables.length === 0
                ? "Нет" : this.tabReadyContent.vegetables}</p>
        </div>
        <div class="final-order-sauces">
            <p class="final-order-sauces-text">Соусы:</p>
            <p class="final-order-sauces-value">${this.tabReadyContent.sauces.length === 0
                ? "Нет" : this.tabReadyContent.sauces}</p>
        </div>
        <div class="final-order-filling">
            <p class="final-order-filling-text">Начинка:</p>
            <p class="final-order-filling-value">${this.tabReadyContent.fillings.length === 0
                ? "Нет" : this.tabReadyContent.fillings}</p>
        </div>
            <p class="final-order-title" id="item-name-modal">${this.modalContent.title}</p>
        </div>
        `
        return content
    }

    loadModalOrder() {
        return (/*html*/ `
        <p class="item-amount">Количество</p>
        <div class="amount-block">
            <img class="minus-icon" id="minus-modal" src="i/minus.svg">
            <input class="item-counter" type="text" id="counter-modal" value=${this.modalContent.amount}>
            <img class="plus-icon" id="plus-modal" src="i/plus.svg">
        </div>
        <button class="item-button" id="button-modal">${this.modalWindowAddShow ?
                "В КОРЗИНУ" : (this.modalWindowEditShow ? "ИЗМЕНИТЬ" : [])}</button>
        `)
    }

    render() {
        let modalTabs = ``;
        for (let i in this.tabs) {
            modalTabs += `<p class="${this.selectedModalTab === i ? "tab-active" : "tab"}"
                id="${i}">${this.tabs[i]}</p>`
        }
        return (/*html*/`
        <div class="modal-window">
            <div class="modal-content">
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
                ${this.selectedModalTab === "ready" ? this.loadReadyPage() : this.loadIngredients()}
                </div>
                <div class="modal-footer">
                    <div class="item-price-block">
                        <p class="price-text">Цена:</p>
                        <p class="price-value" id="price-modal">${this.selectedModalTab === "ready" ?
                this.modalContent.price * this.modalContent.amount : this.modalContent.price}</p>
                        <p class="price-currency">руб.</p>
                    </div>
                    <div class="modal-order-block">
                    ${this.selectedModalTab === "ready" ? this.loadModalOrder() : []}
                    </div>
                </div>
            </div>
        </div>
        `)
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModalWindow);

/***/ }),

/***/ "./src/Order/Order.js":
/*!****************************!*\
  !*** ./src/Order/Order.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/Component.js");
/* harmony import */ var _Order_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Order.css */ "./src/Order/Order.css");



class Order extends _Component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(props) {
        super()
        this.orderItems = props.orderItems;
        this.setOrderItems = props.setOrderItems;
        this.totalPrice = props.totalPrice;
        this.sandwiches = props.sandwiches;
        this.modalContent = props.modalContent;
        this.tabReadyContent = props.tabReadyContent;
        this.modalWindowAddShow = props.modalWindowAddShow;
        this.modalWindowEditShow = props.modalWindowEditShow;
        this.changeableOrderItem = props.changeableOrderItem;

        this.setChangeableOrderItem = props.setChangeableOrderItem;
        this.setTabReadyContent = props.setTabReadyContent;
        this.setModalContent = props.setModalContent;
        this.setModalWindowAddShow = props.setModalWindowAddShow;
        this.setModalWindowEditShow = props.setModalWindowEditShow;
        this.setSandwiches = props.setSandwiches;
        this.setTotalPrice = props.setTotalPrice;
        this.setSelectedModalTab = props.setSelectedModalTab;
    }

    basketRender() {
        let items = ""
        this.orderItems.map((item) => {
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
        for (let i = 0; i < this.orderItems.length; i++) {
            const handleChangeDeleteIconClick = () => {
                this.setTotalPrice(this.totalPrice - this.orderItems[i].price);
                if (this.orderItems[i].sandwichId) {
                    this.sandwiches.splice(this.orderItems[i].sandwichId - 1, 1);
                }
                this.orderItems.splice(i, 1);

                let sandwichId = 1;
                this.orderItems.map((item, i) => {
                    item.id = i + 1;
                    if (item.sandwichId) {
                        item.sandwichId = sandwichId;
                        sandwichId++;
                    }
                })
                this.setSandwiches(this.sandwiches);
                this.setOrderItems(this.orderItems);
            }
            document.getElementById("delete-" + (i + 1)).addEventListener('click', handleChangeDeleteIconClick);
        }
        if (this.sandwiches.length > 0) {
            for (let i = 0; i < this.sandwiches.length; i++) {
                const handleOrderClick = () => {
                    console.log(this.orderItems);
                    this.changeableOrderItem.sandwichId = i;
                    let id = this.orderItems.find(item => item.sandwichId ===
                        this.changeableOrderItem.sandwichId + 1).id - 1;
                    this.changeableOrderItem.orderId = id;
                    console.log(this.changeableOrderItem);
                    this.setChangeableOrderItem(this.changeableOrderItem)
                    this.setSelectedModalTab("sizes");
                    this.setModalWindowEditShow(true);
                    this.setTabReadyContent(this.sandwiches[i]);
                    this.setModalContent(this.sandwiches[i]);
                }
                document.getElementById("sandwich-" + (i + 1)).addEventListener("click", handleOrderClick);
            }
        }
    }

    render() {
        return (/*html*/`
        <div class="order">
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
                <p class="sum-value" id="sum">${this.totalPrice}</p>
                <p class="sum-currency">руб.</p>
            </div>
        </div>
        <button class="order-button">ОФОРМИТЬ ЗАКАЗ</button>
        </div>
      `)
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Order);

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/Component.js");
/* harmony import */ var _MainHeader_MainHeader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MainHeader/MainHeader */ "./src/MainHeader/MainHeader.js");
/* harmony import */ var _MenuBlock_MenuBlock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MenuBlock/MenuBlock */ "./src/MenuBlock/MenuBlock.js");
/* harmony import */ var _MenuCategories_MenuCategories__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MenuCategories/MenuCategories */ "./src/MenuCategories/MenuCategories.js");
/* harmony import */ var _ModalWindow_ModalWindow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ModalWindow/ModalWindow */ "./src/ModalWindow/ModalWindow.js");
/* harmony import */ var _Order_Order__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Order/Order */ "./src/Order/Order.js");
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./App.css */ "./src/App.css");








class App extends _Component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(onChange) {
        const data = {
            selectedTab: "sandwiches",
            selectedModalTab: "sizes",
            items: [],
            ingredients: [],
            countersValue: [],
            orderItems: [],
            totalPrice: 0,
            modalWindowAddShow: false,
            modalWindowEditShow: false,
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
        }
        super(data)
        super.setRerender(onChange)
        this.onChange = onChange;
        this.createChildren()

        const getData = async () => {
            await fetch("./src/data.json")
                .then(response => response.json())
                .then(data => {
                    data.menu.map(() => {
                        this.data.countersValue.push(1)
                    });
                    this.data.items = data.menu;
                    this.data.ingredients = {
                        sizes: data.sizes,
                        breads: data.breads,
                        vegetables: data.vegetables,
                        sauces: data.sauces,
                        fillings: data.fillings
                    }
                })
        }
        getData();
    }

    createChildren() {
        this.mainHeader = new _MainHeader_MainHeader__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.menuCategories = new _MenuCategories_MenuCategories__WEBPACK_IMPORTED_MODULE_3__["default"]({
            selectedTab: this.data.selectedTab,
            setSelectedTab: (x) => { this.data.selectedTab = x }
        });
        this.order = new _Order_Order__WEBPACK_IMPORTED_MODULE_5__["default"]({
            orderItems: this.data.orderItems,
            setOrderItems: (x) => { this.data.orderItems = x },
            totalPrice: this.data.totalPrice,
            setTotalPrice: (x) => { this.data.totalPrice = x },
            sandwiches: this.data.sandwiches,
            setSandwiches: (x) => { this.data.sandwiches = x },
            modalWindowAddShow: this.data.modalWindowAddShow,
            setModalWindowAddShow: (x) => { this.data.modalWindowAddShow = x },
            modalWindowEditShow: this.data.modalWindowEditShow,
            setModalWindowEditShow: (x) => { this.data.modalWindowEditShow = x },
            modalContent: this.data.modalContent,
            setModalContent: (x) => { this.data.modalContent = x },
            setSelectedModalTab: (x) => { this.data.selectedModalTab = x },
            tabReadyContent: this.data.tabReadyContent,
            setTabReadyContent: (x) => { this.data.tabReadyContent = x },
            changeableOrderItem: this.data.changeableOrderItem,
            setChangeableOrderItem: (x) => { this.data.changeableOrderItem = x }
        });
        this.menuBlock = new _MenuBlock_MenuBlock__WEBPACK_IMPORTED_MODULE_2__["default"]({
            items: this.data.items,
            selectedTab: this.data.selectedTab,
            countersValue: this.data.countersValue,
            setCountersValue: (x) => { this.data.countersValue = x },
            orderItems: this.data.orderItems,
            setOrderItems: (x) => { this.data.orderItems = x },
            totalPrice: this.data.totalPrice,
            setTotalPrice: (x) => { this.data.totalPrice = x },
            setModalWindowAddShow: (x) => { this.data.modalWindowAddShow = x },
            setModalContent: (x) => { this.data.modalContent = x },
            setSelectedModalTab: (x) => { this.data.selectedModalTab = x },
        });
        this.modalWindow = new _ModalWindow_ModalWindow__WEBPACK_IMPORTED_MODULE_4__["default"]({
            modalWindowAddShow: this.data.modalWindowAddShow,
            setModalWindowAddShow: (x) => { this.data.modalWindowAddShow = x },
            modalWindowEditShow: this.data.modalWindowEditShow,
            setModalWindowEditShow: (x) => { this.data.modalWindowEditShow = x },
            selectedModalTab: this.data.selectedModalTab,
            setSelectedModalTab: (x) => { this.data.selectedModalTab = x },
            ingredients: this.data.ingredients,
            modalContent: this.data.modalContent,
            setModalContent: (x) => { this.data.modalContent = x },
            tabReadyContent: this.data.tabReadyContent,
            setTabReadyContent: (x) => { this.data.tabReadyContent = x },
            previousValues: this.data.previousValues,
            setPreviousValues: (x) => { this.data.previousValues = x },
            countersValue: this.data.countersValue,
            setCountersValue: (x) => { this.data.countersValue = x },
            orderItems: this.data.orderItems,
            setOrderItems: (x) => { this.data.orderItems = x },
            totalPrice: this.data.totalPrice,
            setTotalPrice: (x) => { this.data.totalPrice = x },
            sandwichesLength: this.data.sandwichesLength,
            setSandwichesLength: (x) => { this.data.sandwichesLength = x },
            sandwiches: this.data.sandwiches,
            setSandwiches: (x) => { this.data.sandwiches = x },
            changeableOrderItem: this.data.changeableOrderItem,
            setChangeableOrderItem: (x) => { this.data.changeableOrderItem = x }
        });
    }

    enable() {
        this.menuCategories.enable();
        this.menuBlock.enable();
        this.order.enable();
        if (this.data.modalWindowAddShow || this.data.modalWindowEditShow) {
            this.modalWindow.enable();
        }
    }

    render() {
        this.createChildren();
        return (/*html*/`
        ${this.mainHeader.render()}
        <div class="main-form">
            <div class="categories_and_orders-block">
                ${this.menuCategories.render()}
                ${this.order.render()}
            </div>
            ${this.menuBlock.render()}
        </div>
        ${this.data.modalWindowAddShow || this.data.modalWindowEditShow ? this.modalWindow.render() : ''}
        `)
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

const rerenderApp = () => {
    document.body.innerHTML = app.render();
    app.enable();
}

const app = new App(
    rerenderApp
);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map