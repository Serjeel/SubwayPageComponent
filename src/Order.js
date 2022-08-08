import Component from "./Component"

class Order extends Component {
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

export default Order