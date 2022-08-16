import Component from "../Component";
import './Order.css';

class Order extends Component {
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

export default Order