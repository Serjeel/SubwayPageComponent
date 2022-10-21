import axios from 'axios';
import Cookies from 'js-cookie';

import Component from "../Component";
import './Order.css';

import { setDeleteOrder, storage } from "../storage";
import { setOrderItems } from "../storage";
import { setChangeableOrderItem } from "../storage";
import { setTabReadyContent } from "../storage";
import { setModalContent } from "../storage";
import { setModalWindowEditShow } from "../storage";
import { setSandwiches } from "../storage";
import { setTotalPrice } from "../storage";
import { setSelectedModalTab } from "../storage";
import { setPreviousValues } from "../storage";
import { getDeleteOrder } from '../api';


class Order extends Component {
    constructor(props) {
        super()

        this.subscribers = ["orderItems", "totalPrice", "sandwiches"];
        for (let i in this.subscribers) {
            storage.addSubscriber(this.subscribers[i], props.rerender);
        }
    }

    basketRender() {
        let items = ""
        storage.data.orderItems.map((item, i) => {
            items += /*html*/`
                <div class="order-items" id="order-${i + 1}">
                <p class="${item.breads ? "sandwich-title" : "order-title"}" 
                id="${item.breads ? "sandwich-" + parseInt(storage.data.sandwiches.findIndex(arr =>
                arr.orderId === item.orderId) + 1) : []}">${item.title}</p>
                    <p class="order-amount">${item.amount}</p>
                    <p class="order-price">${item.price * item.amount} руб.</p>
                    <img class="delete-icon" id="delete-${i + 1}" src="i/trash.svg"/>
                </div>
            `
        })
        return items
    }

    enable() {
        for (let i = 0; i < storage.data.orderItems.length; i++) {
            const handleChangeDeleteIconClick = async () => {

                const DeleteOrder = async () => {
                    const order = await getDeleteOrder(i);
                    await setDeleteOrder(i);
                }

                DeleteOrder();
            }
            document.getElementById("delete-" + (i + 1)).addEventListener('click', handleChangeDeleteIconClick);
        }
        if (storage.data.sandwiches.length > 0) {
            for (let i = 0; i < storage.data.sandwiches.length; i++) {
                const handleOrderClick = () => {
                    let changeableOrderItem = {};
                    changeableOrderItem = storage.data.sandwiches[i];
                    setChangeableOrderItem(changeableOrderItem)
                    setSelectedModalTab("sizes");
                    setModalWindowEditShow(true);

                    setTabReadyContent({
                        breads: storage.data.sandwiches[i].breads,
                        fillings: storage.data.sandwiches[i].fillings.slice(0),
                        sauces: storage.data.sandwiches[i].sauces.slice(0),
                        sizes: storage.data.sandwiches[i].sizes,
                        vegetables: storage.data.sandwiches[i].vegetables.slice(0),
                    });
                    setModalContent({
                        amount: storage.data.sandwiches[i].amount,
                        id: storage.data.sandwiches[i].id,
                        price: storage.data.sandwiches[i].price,
                        title: storage.data.sandwiches[i].title
                    });
                    let n = 0;
                    for (let j in storage.data.ingredients.sizes) {
                        if (storage.data.sandwiches[i].sizes === storage.data.ingredients.sizes[j].name) {
                            n = storage.data.ingredients.sizes[j].price;
                        }
                    }
                    setPreviousValues({
                        sizes: n,
                        breads: 0
                    })
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