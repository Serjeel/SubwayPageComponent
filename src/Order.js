import Component from "./Component"

class Order extends Component{
    constructor(props) {
        super()
        this.orderItems = props.orderItems;
    }

    addToBasket() {
        let items = ""
        this.orderItems.map((item) => {
            items += item
        })
        
        console.log(items);

        return items
    }

    enable() {
        const handleChangeDeleteIconClick = () => {
            this.data.orderItems.map((item) => {
                console.log(item);
            })
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
        ${this.addToBasket()}
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

export default Order