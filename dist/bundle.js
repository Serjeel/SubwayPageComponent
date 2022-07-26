/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ItemsBlock.js":
/*!***************************!*\
  !*** ./src/ItemsBlock.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ItemsBlock {
    constructor() {

    }
    render() {
        return (/*html*/`
            <div class="item" id="item-1">
                <img class="logo" src="i/Subway_logo.png" />
                <img class="item-image" src="i/Burger1.jpg" />
                <p class="item-name">Овощной</p>
                <p class="item-composition">${this.V}</p>
                <div class="item-price-block">
                    <p class="price-text">Цена:</p>
                    <p class="price-value" id="price-1">110</p>
                    <p class="price-currency">руб.</p>
                </div>
                <p class="item-amount">Количество</p>
                <div class="amount-block">
                    <img class="minus-icon" src="i/minus.svg" id="minus-1" onclick="minusClick(event.target)">
                    <input class="item-counter" type="text" id="counter-1" value="1">
                    <img class="plus-icon" src="i/plus.svg" id="plus-1" onclick="plusClick(event.target)">
                </div>
                <button class="item-button" id="button-1" onclick="addToBasket(event.target)">В КОРЗИНУ</button>
        </div> 
      `)
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ItemsBlock);

/***/ }),

/***/ "./src/MainHeader.js":
/*!***************************!*\
  !*** ./src/MainHeader.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class MainHeader {
    render() {
        return (/*html*/`
            <h1 class="main-header">СДЕЛАЙТЕ ЗАКАЗ НАПРЯМУЮ ИЗ РЕСТОРАНА</h1>
      `)
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MainHeader);

/***/ }),

/***/ "./src/MenuBlock.js":
/*!**************************!*\
  !*** ./src/MenuBlock.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ItemsBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemsBlock */ "./src/ItemsBlock.js");


class MenuBlock {
    constructor() {
        this.array = [7, 8, 3]
        this.array.map((elem, i) => (console.log(elem, i)))
        this.x = [];
        const getData = async () => {
            await fetch("./src/data.json")
            .then(response => response.json())
            .then(data => {
                this.x = data;
                console.log(this.x);
            })
            console.log(this.x);
        }
        getData();
        console.log(this.x);
        // Додумать как использовать здесь fetch. Либо использовать async await, либо сначала
        // отрендерить пустные значения, а потом через Прокси поймать изменения и тогда уже отобразить
    }
    render() {
        setTimeout(() => {
            console.log(this.x);
        }, 10000);
        const itemsBlock = new _ItemsBlock__WEBPACK_IMPORTED_MODULE_0__["default"]();
        return (/*html*/`
        <div class="menu-block">
            <div class="items-block">
            <button onclick="getData()">Кнопка</button>
            </div>
        </div>
      `)
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MenuBlock);

/***/ }),

/***/ "./src/MenuCategories.js":
/*!*******************************!*\
  !*** ./src/MenuCategories.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class MenuCategories {
    render() {
        return (/*html*/`
        <div class="menu-categories">
            <p class="category" id="category-1">Блины</p>
            <p class="category" id="category-2">Шаурма</p>
            <p class="category" id="category-3">Сэндвичи</p>
            <p class="category" id="category-4">Бургеры</p>
            <p class="category" id="category-5">Курица & Картофель</p>
            <p class="category" id="category-6">Тортилья & Салаты</p>
            <p class="category" id="category-7">Напитки & Десерты</p>
        </div>
      `)
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MenuCategories);

/***/ }),

/***/ "./src/Order.js":
/*!**********************!*\
  !*** ./src/Order.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Order {
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
        </div>
        <div>
            <div class="sum">
                <p class="sum-text">Цена: </p>
                <p class="sum-value" id="sum">0</p>
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MainHeader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MainHeader */ "./src/MainHeader.js");
/* harmony import */ var _MenuBlock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuBlock */ "./src/MenuBlock.js");
/* harmony import */ var _MenuCategories__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MenuCategories */ "./src/MenuCategories.js");
/* harmony import */ var _Order__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Order */ "./src/Order.js");





class App {
    render() {
        const mainHeader = new _MainHeader__WEBPACK_IMPORTED_MODULE_0__["default"]();
        const menuCategories = new _MenuCategories__WEBPACK_IMPORTED_MODULE_2__["default"]();
        const order = new _Order__WEBPACK_IMPORTED_MODULE_3__["default"]();
        const menuBlock = new _MenuBlock__WEBPACK_IMPORTED_MODULE_1__["default"]();

        return (/*html*/`
        ${mainHeader.render()}
        <div class="main-form">
            <div class="categories_and_orders-block">
                ${menuCategories.render()}
                ${order.render()}
            </div>
            ${menuBlock.render()}
        </div>
        `)
    }
}
const app = new App();
document.body.innerHTML = app.render();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map