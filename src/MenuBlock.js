import Component from "./Component";
import MenuItem from "./MenuItem";

class MenuBlock extends Component {
    constructor(props) {
        super()
        this.countersValue = props.countersValue;
        this.items = props.items;
        this.selectedTab = props.selectedTab;
        this.orderItems = props.orderItems;
        this.totalPrice = props.totalPrice;

        this.handleChangeCountersValueClick = props.handleChangeCountersValueClick;
        this.setOrderItems = props.setOrderItems;
        this.setTotalPrice = props.setTotalPrice;
    }

    // Далее что нужно сделать:
    // 1. Ручное изменение каунтера
    // 2. Модалка
    // 3. Разделить css файлы для каждого компонента

    enable() {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i] && this.items[i].category !== this.selectedTab) {
                continue;
            }
            const handlePlusClick = () => {
                this.countersValue[i] += 1;
                this.handleChangeCountersValueClick(this.countersValue)
                console.log(this.countersValue);
                console.log("Нажат плюс");
            }
            const handleMinusClick = () => {
                this.countersValue[i] -= 1;
                this.handleChangeCountersValueClick(this.countersValue)
                console.log(this.countersValue);
                console.log("Нажат минус");
            }

            const handleChangeButtonClick = () => {
                this.orderItems.push({
                    id: this.orderItems.length + 1,
                    title: this.items[i].name,
                    amount: this.countersValue[i],
                    price: this.items[i].price * this.countersValue[i],
                });
                this.setOrderItems(this.orderItems);
                this.setTotalPrice(this.totalPrice + (this.items[i].price * this.countersValue[i]))
                console.log(this.orderItems);
            }

            document.getElementById("plus-" + (i + 1)).addEventListener("click", handlePlusClick)
            document.getElementById("minus-" + (i + 1)).addEventListener("click", handleMinusClick)
            document.getElementById("button-" + (i + 1)).addEventListener("click", handleChangeButtonClick)
        }
    }

    loadMenu() {
        const menuItem = new MenuItem({ items: this.items });
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

export default MenuBlock