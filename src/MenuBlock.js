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

        this.setSelectedModalTab = props.setSelectedModalTab;
        this.setModalContent = props.setModalContent;
        this.setModalWindowFlag = props.setModalWindowFlag;
        this.setCountersValue = props.setCountersValue;
        this.setOrderItems = props.setOrderItems;
        this.setTotalPrice = props.setTotalPrice;
    }

    // Далее что нужно сделать:
    // 1. Модалка
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
                if (this.selectedTab = "sandwiches") {
                    this.setSelectedModalTab("sizes")
                    this.setModalWindowFlag(true);
                    this.setModalContent([{
                        id: i + 1,
                        title: this.items[i].name,
                        amount: this.countersValue[i],
                        price: this.items[i].price
                    }]);
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
        const menuItem = new MenuItem();
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