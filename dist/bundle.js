/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
        console.log(callback.name);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Component);

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
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/Component.js");


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

/***/ "./src/MenuBlock.js":
/*!**************************!*\
  !*** ./src/MenuBlock.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/Component.js");
/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuItem */ "./src/MenuItem.js");



class MenuBlock extends _Component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(props) {
        const data = {
            countersValue: props.countersValue,
            items: props.items,
            selectedTab: props.selectedTab
        }
        super(data)
        super.setRerender(this.render)
        this.handleChangeCountersValueClick = props.handleChangeCountersValueClick;
    }

    // Далее что нужно сделать:
    // 1. Каунтеры(не забыть сделать так, чтобы они не менялись при переключении)

    enable() {
        for (let i = 0; i < this.data.items.length; i++) {
            if (this.data.items[i] && this.data.items[i].category !== this.data.selectedTab) {
                continue;
            }
            const handlePlusClick = () => {
                this.data.countersValue[i] += 1;
                this.handleChangeCountersValueClick(this.data.countersValue)
                console.log(this.data.countersValue);
                console.log("Нажат плюс");
            }
            const handleMinusClick = () => {
                this.data.countersValue[i] -= 1;
                this.handleChangeCountersValueClick(this.data.countersValue)
                console.log(this.data.countersValue);
                console.log("Нажат минус");
            }

            document.getElementById("plus-" + (i + 1)).addEventListener("click", handlePlusClick)
            document.getElementById("minus-" + (i + 1)).addEventListener("click", handleMinusClick)
        }
    }

    loadMenu() {
        const menuItem = new _MenuItem__WEBPACK_IMPORTED_MODULE_1__["default"]({ items: this.data.items });
        let items = "";
        let logo = "";
        for (let i in this.data.items) {
            if (this.data.items[i].category !== this.data.selectedTab) {
                continue;
            }

            if (this.data.items[i].market === "sfc") {
                logo = "i/South_fried_chicken_logo.png";
            } else if (this.data.items[i].market === "doner") {
                logo = "i/Doner_logo.png";
            } else {
                logo = "i/Subway_logo.png";
            }
            items += menuItem.render(this.data.items[i], parseInt(i) + 1, logo, this.data.countersValue);
        }

        return items;
    }

    render() {
        console.log("Рендер сработал");
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

/***/ "./src/MenuCategories.js":
/*!*******************************!*\
  !*** ./src/MenuCategories.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/Component.js");


class MenuCategories extends _Component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(props) {
        super()
        this.handleChangeSelectedTabClick = props.handleChangeSelectedTabClick;

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
            console.log("Нажато");
            if (this.selectedTab !== target.target.id) {
                this.handleChangeSelectedTabClick(target.target.id);
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

/***/ "./src/MenuItem.js":
/*!*************************!*\
  !*** ./src/MenuItem.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/Component.js");


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
                <button class="item-button" id="button-${i}" onclick="addToBasket(event.target)">В КОРЗИНУ</button>
        </div> 
      `)
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MenuItem);

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
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/Component.js");


class Order extends _Component__WEBPACK_IMPORTED_MODULE_0__["default"]{
    constructor() {
        super();
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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/Component.js");
/* harmony import */ var _MainHeader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MainHeader */ "./src/MainHeader.js");
/* harmony import */ var _MenuBlock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MenuBlock */ "./src/MenuBlock.js");
/* harmony import */ var _MenuCategories__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MenuCategories */ "./src/MenuCategories.js");
/* harmony import */ var _Order__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Order */ "./src/Order.js");






class App extends _Component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(onChange) {
        const data = {
            selectedTab: "sandwiches",
            items: [], // Пройтись по первой главе learnJs и выполнить все задачки
            countersValue: []
        }
        super(data)
        super.setRerender(onChange)
        this.onChange = onChange
        this.createChildren() // eslint + prettier

        const getData = async () => {
            await fetch("./src/data.json")
                .then(response => response.json())
                .then(data => {
                    data.menu.map(() => {
                        this.data.countersValue.push(1)
                    });
                    this.data.items = data.menu;
                })
        }
        getData();
    }

    createChildren() {
        this.mainHeader = new _MainHeader__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.menuCategories = new _MenuCategories__WEBPACK_IMPORTED_MODULE_3__["default"]({
            selectedTab: this.data.selectedTab,
            handleChangeSelectedTabClick: (x) => { this.data.selectedTab = x }
        });
        this.order = new _Order__WEBPACK_IMPORTED_MODULE_4__["default"]();
        this.menuBlock = new _MenuBlock__WEBPACK_IMPORTED_MODULE_2__["default"]({
            items: this.data.items,
            countersValue: this.data.countersValue,
            selectedTab: this.data.selectedTab,
            handleChangeCountersValueClick: (x) => { this.data.countersValue = x }
        });
    }

    enable() {
        this.menuCategories.enable();
        this.menuBlock.enable();
    }

    testMethod() {
        console.log("Метод сработал");
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