import Component from "./Component";
import MenuItem from "./MenuItem";

class MenuBlock extends Component {
    constructor(props) {
        const data = {
            countersValue: props.countersValue,
            items: props.items,
            selectedTab: props.selectedTab,
            orderItems: props.orderItems,
            setOrderItems: props.setOrderItems
        }
        super(data)
        super.setRerender(this.render)
        this.handleChangeCountersValueClick = props.handleChangeCountersValueClick;
    }

    // Далее что нужно сделать:
    // 1. Ручное изменение каунтера
    // 2. Добавление в корзину
    // 3. Модалка
    // 4. Разделить css файлы для каждого компонента

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

            const handleChangeButtonClick = () => {
                this.data.orderItems.push(/*html*/`
                <div class="order-items" id="order-${this.data.orderItems.length + 1}">
                    <p class="order-title">${this.data.items[i].name}</p>
                    <p class="order-amount">${this.data.countersValue[i]}</p>
                    <p class="order-price">${this.data.items[i].price * this.data.countersValue[i]} руб.</p>
                    <img class="delete-icon" id="delete-${this.data.orderItems.length + 1}" src="i/trash.svg"/>
                </div>
                `)
                this.data.setOrderItems(this.data.orderItems);
                console.log(this.data.orderItems);
            }

            document.getElementById("plus-" + (i + 1)).addEventListener("click", handlePlusClick)
            document.getElementById("minus-" + (i + 1)).addEventListener("click", handleMinusClick)
            document.getElementById("button-" + (i + 1)).addEventListener("click", handleChangeButtonClick)
            console.log(this.data.orderItems.length);
        }
    }

    loadMenu() {
        const menuItem = new MenuItem({ items: this.data.items });
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

export default MenuBlock