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
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Component);

/***/ }),

/***/ "./src/Ingredient.js":
/*!***************************!*\
  !*** ./src/Ingredient.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/Component.js");


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
        super()
        this.countersValue = props.countersValue;
        this.items = props.items;
        this.selectedTab = props.selectedTab;
        this.orderItems = props.orderItems;
        this.totalPrice = props.totalPrice;
       
        this.setSelectedModalTab = props.setSelectedModalTab;
        this.setModalContent = props.setModalContent;
        this.setModalWindowFlag = props.setModalWindowFlag;
        this.setCountersValue = props.setCountersValue;
        this.setOrderItems = props.setOrderItems;
        this.setTotalPrice = props.setTotalPrice;
    }

    // Далее что нужно сделать:
    // 1. Редактирование сэндвича
    // 2. Разделить css файлы для каждого компонента

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
                this.countersValue[i] -= 1;
                this.setCountersValue(this.countersValue)
            }

            const handleInputChange = () => {
                this.countersValue[i] = parseInt(document.getElementById("counter-" + (i + 1)).value);
                console.log(this.countersValue);
                this.setCountersValue(this.countersValue);
            }

            const handleButtonClick = () => {
                if (this.selectedTab === "sandwiches") {
                    this.setSelectedModalTab("sizes")
                    this.setModalWindowFlag(true);
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
        const menuItem = new _MenuItem__WEBPACK_IMPORTED_MODULE_1__["default"]();
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
                <button class="item-button" id="button-${i}">В КОРЗИНУ</button>
        </div> 
      `)
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MenuItem);

/***/ }),

/***/ "./src/ModalWindow.js":
/*!****************************!*\
  !*** ./src/ModalWindow.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/Component.js");
/* harmony import */ var _Ingredient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ingredient */ "./src/Ingredient.js");



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

        this.setSandwichesLength = props.setSandwichesLength;
        this.setTotalPrice= props.setTotalPrice;
        this.setOrderItems = props.setOrderItems;
        this.setCountersValue = props.setCountersValue;
        this.setPreviousValues = props.setPreviousValues;
        this.setModalContent = props.setModalContent;
        this.setTabReadyContent = props.setTabReadyContent;
        this.setModalWindowFlag = props.setModalWindowFlag;
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
            this.setModalWindowFlag(false)
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
                        console.log(n);
                        this.modalContent.price -= this.ingredients[this.selectedModalTab][key].price;
                        this.tabReadyContent[this.selectedModalTab].splice(n, 1);
                        console.log(this.tabReadyContent[this.selectedModalTab]);
                        this.setTabReadyContent(this.tabReadyContent);
                    } else {
                        this.tabReadyContent[this.selectedModalTab].push(this.ingredients[this.
                            selectedModalTab][key].name)
                        this.modalContent.price += this.ingredients[this.selectedModalTab][key].price;
                        this.setTabReadyContent(this.tabReadyContent)
                        console.log(this.tabReadyContent[this.selectedModalTab]);
                    }
                }
                document.getElementsByClassName("tab-content-block")[0].scrollTo(0, scrollPosition)
            }
            document.getElementById("item-" + key).addEventListener("click", modalItemClick)
        }
        const handleModalPlusClick = () => {
            this.modalContent.amount += 1;
            this.setModalContent(this.modalContent);
            this.countersValue[this.modalContent.id - 1] += 1;
            this.setCountersValue(this.countersValue);
            console.log(this.countersValue);
        }
        const handleModalMinusClick = () => {
            this.modalContent.amount -= 1;
            this.setModalContent(this.modalContent);
            this.countersValue[this.modalContent.id - 1] -= 1;
            this.setCountersValue(this.countersValue);
            console.log(this.countersValue);
        }

        const handleInputChange = () => {
            this.modalContent.amount = parseInt(document.getElementById("counter-modal").value);
            this.setModalContent(this.modalContent);
            this.countersValue[this.modalContent.id - 1] = parseInt(document.
                getElementById("counter-modal").value);
            this.setCountersValue(this.countersValue);
            console.log(this.countersValue);
        }

        const handleButtonModalClick = () => {
            this.setSelectedModalTab("sizes");
            this.setModalWindowFlag(false);

            this.setSandwichesLength(this.sandwichesLength + 1);

            console.log(this.sandwichesLength);

            this.orderItems.push({
                sandwichId: this.sandwichesLength + 1,
                id: this.orderItems.length + 1,
                title: this.modalContent.title,
                amount: this.modalContent.amount,
                price: this.modalContent.price * this.modalContent.amount
            });
            this.setOrderItems(this.orderItems);
            console.log(this.orderItems);
            this.setTotalPrice(this.totalPrice + (this.modalContent.price * this.modalContent.amount));
        }

        if (this.selectedModalTab === "ready") {
            document.getElementById("plus-modal").addEventListener("click", handleModalPlusClick)
            document.getElementById("minus-modal").addEventListener("click", handleModalMinusClick)
            document.getElementById("counter-modal").addEventListener("change", handleInputChange)
            document.getElementById("button-modal").addEventListener("click", handleButtonModalClick)
        }
    }

    loadIngredients() {
        const ingredient = new _Ingredient__WEBPACK_IMPORTED_MODULE_1__["default"]({
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
        <button class="item-button" id="button-modal">В КОРЗИНУ</button>
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


class Order extends _Component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(props) {
        super()
        this.orderItems = props.orderItems;
        this.setOrderItems = props.setOrderItems;
        this.totalPrice = props.totalPrice,
        this.setTotalPrice = props.setTotalPrice
    }

    basketRender() {
        let items = ""
        this.orderItems.map((item) => {
            items += /*html*/`
                <div class="order-items" id="order-${item.id}">
                   <p class="order-title">${item.title}</p>
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
                this.orderItems.splice(i, 1);

                this.orderItems.map((item, i) => {
                    item.id = i + 1;
                })
                this.setOrderItems(this.orderItems);

            }
            document.getElementById("delete-" + (i + 1)).addEventListener('click', handleChangeDeleteIconClick);
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
/* harmony import */ var _ModalWindow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ModalWindow */ "./src/ModalWindow.js");
/* harmony import */ var _Order__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Order */ "./src/Order.js");







class App extends _Component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(onChange) {
        const data = {
            selectedTab: "sandwiches",
            selectedModalTab: "sizes",
            items: [], // Пройтись по первой главе learnJs и выполнить все задачки
            ingredients: [],
            countersValue: [],
            orderItems: [],
            totalPrice: 0,
            modalWindowFlag: false,
            modalContent: [],
            sandwichesLength: 0,
            tabReadyContent : {
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
        this.createChildren() // eslint + prettier

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
        this.mainHeader = new _MainHeader__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.menuCategories = new _MenuCategories__WEBPACK_IMPORTED_MODULE_3__["default"]({
            selectedTab: this.data.selectedTab,
            setSelectedTab: (x) => { this.data.selectedTab = x }
        });
        this.order = new _Order__WEBPACK_IMPORTED_MODULE_5__["default"]({
            orderItems: this.data.orderItems,
            setOrderItems: (x) => { this.data.orderItems = x },
            totalPrice: this.data.totalPrice,
            setTotalPrice: (x) => { this.data.totalPrice = x }
        });
        this.menuBlock = new _MenuBlock__WEBPACK_IMPORTED_MODULE_2__["default"]({
            items: this.data.items,
            selectedTab: this.data.selectedTab,
            countersValue: this.data.countersValue,
            setCountersValue: (x) => { this.data.countersValue = x },
            orderItems: this.data.orderItems,
            setOrderItems: (x) => { this.data.orderItems = x },
            totalPrice: this.data.totalPrice,
            setTotalPrice: (x) => { this.data.totalPrice = x },
            setModalWindowFlag: (x) => { this.data.modalWindowFlag = x },
            setModalContent: (x) => { this.data.modalContent = x },
            setSelectedModalTab: (x) => { this.data.selectedModalTab = x },
        });
        this.modalWindow = new _ModalWindow__WEBPACK_IMPORTED_MODULE_4__["default"]({
            setModalWindowFlag: (x) => { this.data.modalWindowFlag = x },
            selectedModalTab: this.data.selectedModalTab,
            setSelectedModalTab: (x) => { this.data.selectedModalTab = x },
            ingredients: this.data.ingredients,
            modalContent: this.data.modalContent,
            setModalContent: (x) => {this.data.modalContent = x},
            tabReadyContent: this.data.tabReadyContent,
            setTabReadyContent: (x) => {this.data.tabReadyContent = x},
            previousValues: this.data.previousValues,
            setPreviousValues: (x) => {this.data.previousValues = x},
            countersValue: this.data.countersValue,
            setCountersValue: (x) => { this.data.countersValue = x },
            orderItems: this.data.orderItems,
            setOrderItems: (x) => { this.data.orderItems = x },
            totalPrice: this.data.totalPrice,
            setTotalPrice: (x) => { this.data.totalPrice = x },
            sandwichesLength: this.data.sandwichesLength,
            setSandwichesLength: (x) => { this.data.sandwichesLength = x }
        });
    }

    enable() {
        this.menuCategories.enable();
        this.menuBlock.enable();
        this.order.enable();
        if (this.data.modalWindowFlag) {
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
        ${this.data.modalWindowFlag ? this.modalWindow.render() : []}
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