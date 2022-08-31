import Component from "../Component";
import './Order.css';

import { storage } from "../storage";
import { setOrderItems } from "../storage";
import { setChangeableOrderItem } from "../storage";
import { setTabReadyContent } from "../storage";
import { setModalContent } from "../storage";
import { setModalWindowEditShow } from "../storage";
import { setSandwiches } from "../storage";
import { setTotalPrice } from "../storage";
import { setSelectedModalTab } from "../storage";

class Order extends Component {
    constructor(props) {
        super()

        storage.addSubscriber("orderItems", props.rerender);
        storage.addSubscriber("totalPrice", props.rerender);
        storage.addSubscriber("sandwiches", props.rerender);
        /*storage.addSubscriber("modalContent", props.rerender);
        storage.addSubscriber("tabReadyContent", props.rerender);
        storage.addSubscriber("modalWindowAddShow", props.rerender);
        storage.addSubscriber("modalWindowEditShow", props.rerender);
        storage.addSubscriber("changeableOrderItem", props.rerender);*/

    }

    basketRender() {
        let items = ""
        storage.data.orderItems.map((item) => {
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
        for (let i = 0; i < storage.data.orderItems.length; i++) {
            const handleChangeDeleteIconClick = () => {
                setTotalPrice(storage.data.totalPrice - storage.data.orderItems[i].price);
                if (storage.data.orderItems[i].sandwichId) {
                    storage.data.sandwiches.splice(storage.data.orderItems[i].sandwichId - 1, 1);
                }
                storage.data.orderItems.splice(i, 1);

                let sandwichId = 1;
                storage.data.orderItems.map((item, i) => {
                    item.id = i + 1;
                    if (item.sandwichId) {
                        item.sandwichId = sandwichId;
                        sandwichId++;
                    }
                })
                setSandwiches(storage.data.sandwiches);
                setOrderItems(storage.data.orderItems);
            }
            document.getElementById("delete-" + (i + 1)).addEventListener('click', handleChangeDeleteIconClick);
        }
        if (storage.data.sandwiches.length > 0) {
            for (let i = 0; i < storage.data.sandwiches.length; i++) {
                const handleOrderClick = () => {
                    storage.data.changeableOrderItem.sandwichId = i;
                    let id = storage.data.orderItems.find(item => item.sandwichId ===
                        storage.data.changeableOrderItem.sandwichId + 1).id - 1;
                    storage.data.changeableOrderItem.orderId = id;
                    setChangeableOrderItem(storage.data.changeableOrderItem)
                    setSelectedModalTab("sizes");
                    setModalWindowEditShow(true);
                    setTabReadyContent(storage.data.sandwiches[i]);
                    setModalContent(storage.data.sandwiches[i]);
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
                <p class="sum-value" id="sum">${storage.data.totalPrice}</p>
                <p class="sum-currency">руб.</p>
            </div>
        </div>
        <button class="order-button">ОФОРМИТЬ ЗАКАЗ</button>
      `)
    }
}

export default Order