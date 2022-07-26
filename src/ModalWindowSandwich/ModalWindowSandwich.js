import Component from "../Component";
import Ingredient from "../Ingredient/Ingredient";
import './ModalWindowSandwich.css';

import { storage } from "../storage";
import { setTabReadyContent } from "../storage";
import { setModalContent } from "../storage";
import { setCountersValue } from "../storage";
import { setPreviousValues } from "../storage";
import { setModalWindowAddShow } from "../storage";
import { setModalWindowEditShow } from "../storage";
import { setSelectedModalTab } from "../storage";
import { getCreateNewSandwichOrder } from '../api';
import { setCreateNewSandwichOrder } from '../storage';
import { getChangeOrderInfo } from "../api";
import { setChangeOrderInfo } from "../storage";

class ModalWindowSandwich extends Component {
    constructor(props) {
        super();

        this.subscribers = ["selectedModalTab", "modalContent", "tabReadyContent",
            "countersValue", "modalWindowAddShow", "modalWindowEditShow", "changeableOrderItem"];
        for (let i in this.subscribers) {
            storage.addSubscriber(this.subscribers[i], props.rerender);
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
        let tabReadyContent = storage.data.tabReadyContent;
        let modalContent = storage.data.modalContent;
        let previousValues = storage.data.previousValues;

        const sizesTabClick = () => {
            setSelectedModalTab("sizes")
        }
        const breadsTabClick = () => {
            setSelectedModalTab("breads")
        }
        const vegetablesTabClick = () => {
            setSelectedModalTab("vegetables")
        }
        const saucesTabClick = () => {
            setSelectedModalTab("sauces")
        }
        const fillingsTabClick = () => {
            setSelectedModalTab("fillings")
        }
        const readyTabClick = () => {
            setSelectedModalTab("ready")
        }

        const closeIconClick = () => {
            setPreviousValues({
                sizes: 0,
                breads: 0
            })
            if (storage.data.modalWindowAddShow) {
                setModalWindowAddShow(false);
            } else {
                setModalWindowEditShow(false);
            }
        }

        document.getElementById("sizes").addEventListener("click", sizesTabClick)
        document.getElementById("breads").addEventListener("click", breadsTabClick)
        document.getElementById("vegetables").addEventListener("click", vegetablesTabClick)
        document.getElementById("sauces").addEventListener("click", saucesTabClick)
        document.getElementById("fillings").addEventListener("click", fillingsTabClick)
        document.getElementById("ready").addEventListener("click", readyTabClick)

        document.getElementsByClassName("close-icon")[0].addEventListener("click", closeIconClick)

        for (let key in storage.data.ingredients[storage.data.selectedModalTab]) {
            const modalItemClick = () => {
                const scrollPosition = document.getElementsByClassName("tab-content-block")[0].scrollTop
                if (storage.data.selectedModalTab === "sizes" || storage.data.selectedModalTab === "breads") {

                    tabReadyContent[storage.data.selectedModalTab.slice(0, -1)] = storage.data.
                        ingredients[storage.data.selectedModalTab][key].name;

                    modalContent.price += storage.data.ingredients[storage.data.selectedModalTab][key].price;
                    modalContent.price -= storage.data.previousValues[storage.data.selectedModalTab];

                    setModalContent(modalContent);

                    previousValues[storage.data.selectedModalTab] = storage.data.
                        ingredients[storage.data.selectedModalTab][key].price;

                    setPreviousValues(previousValues);
                    setTabReadyContent(tabReadyContent);
                } else {
                    if (storage.data.tabReadyContent[storage.data.selectedModalTab].includes(storage.data.
                        ingredients[storage.data.selectedModalTab][key].name)) {
                        let n = storage.data.tabReadyContent[storage.data.selectedModalTab].indexOf(storage.data.
                            ingredients[storage.data.selectedModalTab][key].name);
                        modalContent.price -= storage.data.ingredients[storage.data.selectedModalTab][key].price;

                        tabReadyContent[storage.data.selectedModalTab].splice(n, 1);

                        setModalContent(modalContent);
                        setTabReadyContent(tabReadyContent);
                    } else {
                        tabReadyContent[storage.data.selectedModalTab].push(storage.data.
                            ingredients[storage.data.selectedModalTab][key].name);

                        modalContent.price += storage.data.ingredients[storage.data.selectedModalTab][key].price;
                        setModalContent(modalContent);
                        setTabReadyContent(tabReadyContent);
                    }
                }
                document.getElementsByClassName("tab-content-block")[0].scrollTo(0, scrollPosition)
            }
            document.getElementById("item-" + key).addEventListener("click", modalItemClick)
        }

        if (storage.data.selectedModalTab === "ready") {
            let countersValue = storage.data.countersValue;
            const handleModalPlusClick = () => {
                modalContent.amount += 1;
                setModalContent(storage.data.modalContent);
                countersValue[storage.data.modalContent.id - 1] += 1;
                setCountersValue(storage.data.countersValue);
            }
            const handleModalMinusClick = () => {
                if (storage.data.modalContent.amount > 1) {
                    modalContent.amount -= 1;
                    setModalContent(storage.data.modalContent);
                    countersValue[storage.data.modalContent.id - 1] -= 1;
                    setCountersValue(storage.data.countersValue);
                }
            }
            const handleInputChange = () => {
                if (document.getElementById("counter-modal").value > 0) {
                    modalContent.amount = parseInt(document.getElementById("counter-modal").value);
                    setModalContent(storage.data.modalContent);
                    countersValue[storage.data.modalContent.id - 1] = parseInt(document.
                        getElementById("counter-modal").value);
                    setCountersValue(storage.data.countersValue);
                } else {
                    modalContent.amount = 1;
                    setModalContent(storage.data.modalContent);
                    countersValue[storage.data.modalContent.id - 1] = 1;
                    setCountersValue(storage.data.countersValue);
                }
            }

            const handleButtonModalClick = () => {
                setSelectedModalTab("sizes");
                if (storage.data.modalWindowAddShow) {
                    setModalWindowAddShow(false);

                    const CreateOrder = async () => {
                        const order = await getCreateNewSandwichOrder();
                        await setCreateNewSandwichOrder(order);
                    }

                    CreateOrder();
                }
                if (storage.data.modalWindowEditShow) {
                    setModalWindowEditShow(false);

                    const ChangeOrder = async () => {
                        const order = await getChangeOrderInfo();
                        await setChangeOrderInfo(order);
                    }

                    ChangeOrder();
                }
            }
            document.getElementById("plus-modal").addEventListener("click", handleModalPlusClick)
            document.getElementById("minus-modal").addEventListener("click", handleModalMinusClick)
            document.getElementById("counter-modal").addEventListener("change", handleInputChange)
            document.getElementById("button-modal").addEventListener("click", handleButtonModalClick)
        }
    }

    loadIngredients() {
        const ingredient = new Ingredient({
            tabReadyContent: storage.data.tabReadyContent
        });
        let items = "";

        for (let key in storage.data.ingredients[storage.data.selectedModalTab]) {
            items += ingredient.render(storage.data.ingredients[storage.data.selectedModalTab][key], key);
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
            <p class="final-order-size-value">${storage.data.tabReadyContent.size}</p>
        </div>
        <div class="final-order-bread">
            <p class="final-order-bread-text">Хлеб:</p>
            <p class="final-order-bread-value">${storage.data.tabReadyContent.bread}</p>
        </div>
        <div class="final-order-vegetables">
            <p class="final-order-vegetables-text">Овощи:</p>
            <p class="final-order-vegetables-value">${storage.data.tabReadyContent.vegetables.length === 0
                ? "Нет" : storage.data.tabReadyContent.vegetables}</p>
        </div>
        <div class="final-order-sauces">
            <p class="final-order-sauces-text">Соусы:</p>
            <p class="final-order-sauces-value">${storage.data.tabReadyContent.sauces.length === 0
                ? "Нет" : storage.data.tabReadyContent.sauces}</p>
        </div>
        <div class="final-order-filling">
            <p class="final-order-filling-text">Начинка:</p>
            <p class="final-order-filling-value">${storage.data.tabReadyContent.fillings.length === 0
                ? "Нет" : storage.data.tabReadyContent.fillings}</p>
        </div>
            <p class="final-order-title" id="item-name-modal">${storage.data.modalContent.title}</p>
        </div>
        `
        return content
    }

    loadModalOrder() {
        return (/*html*/ `
        <p class="item-amount">Количество</p>
        <div class="amount-block">
            <img class="minus-icon" id="minus-modal" src="i/minus.svg">
            <input class="item-counter" type="text" id="counter-modal" value=${storage.data.modalContent.amount}>
            <img class="plus-icon" id="plus-modal" src="i/plus.svg">
        </div>
        <button class="item-button" id="button-modal">${storage.data.modalWindowAddShow ?
                "В КОРЗИНУ" : (storage.data.modalWindowEditShow ? "ИЗМЕНИТЬ" : [])}</button>
        `)
    }

    render() {
        let modalTabs = ``;
        for (let i in this.tabs) {
            modalTabs += `<p class="${storage.data.selectedModalTab === i ? "tab-active" : "tab"}"
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
                ${storage.data.selectedModalTab === "ready" ? this.loadReadyPage() : this.loadIngredients()}
                </div>
                <div class="modal-footer">
                    <div class="item-price-block">
                        <p class="price-text">Цена:</p>
                        <p class="price-value" id="price-modal">${storage.data.selectedModalTab === "ready" ?
                storage.data.modalContent.price * storage.data.modalContent.amount : storage.data.modalContent.price}</p>
                        <p class="price-currency">руб.</p>
                    </div>
                    <div class="modal-order-block">
                    ${storage.data.selectedModalTab === "ready" ? this.loadModalOrder() : []}
                    </div>
                </div>
            </div>
        </div>
        `)
    }
}

export default ModalWindowSandwich