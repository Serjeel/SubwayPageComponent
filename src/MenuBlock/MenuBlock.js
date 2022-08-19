import Component from "../Component";
import MenuItem from "../MenuItem/MenuItem";
import './MenuBlock.css';
import { storage } from "../storage";
import { setSelectedModalTab } from "../storage";
import { setModalContent } from "../storage";
import { setModalWindowAddShow } from "../storage";
import { setCountersValue } from "../storage";
import { setOrderItems } from "../storage";
import { setTotalPrice } from "../storage";

class MenuBlock extends Component { 
    constructor(props) {
        super() 

        this.data = { // Значения после прихода данных не меняются, так как раньше они обновлялись
                      // засчёт createChildren. Продумать этот момент
            countersValue: storage.data.countersValue,
            items: storage.data.items,
            selectedTab: storage.data.selectedTab,
            orderItems: storage.data.orderItems,
            totalPrice: storage.data.totalPrice
        }

        for (let i in this.data) {
            storage.addSubscriber(i, props.rerender)
        }

        /*this.setSelectedModalTab = props.setSelectedModalTab;
        this.setModalContent = props.setModalContent;
        this.setModalWindowAddShow = props.setModalWindowAddShow;
        this.setCountersValue = props.setCountersValue;
        this.setOrderItems = props.setOrderItems;
        this.setTotalPrice = props.setTotalPrice;*/
    }

    enable() {
        console.log(this.data.items);
        for (let i = 0; i < this.data.items.length; i++) {
            if (this.items[i] && this.data.items[i].category !== this.data.selectedTab) {
                continue;
            }

            const handlePlusClick = () => {
                this.data.countersValue[i] += 1;
                setCountersValue(this.countersValue)
            }

            const handleMinusClick = () => {
                if (this.data.countersValue[i] > 1) {
                    this.countersValue[i] -= 1;
                    setCountersValue(this.countersValue)
                }
            }

            const handleInputChange = () => {
                if (document.getElementById("counter-" + (i + 1)).value > 0) {
                    this.data.countersValue[i] = parseInt(document.getElementById("counter-" + (i + 1)).value);
                } else {
                    this.data.countersValue[i] = 1;
                }
                setCountersValue(this.data.countersValue);
            }

            const handleButtonClick = () => {
                if (this.selectedTab === "sandwiches") {
                    setSelectedModalTab("sizes");
                    setModalWindowAddShow(true);
                    setModalContent({
                        id: i + 1,
                        title: this.data.items[i].name,
                        amount: this.data.countersValue[i],
                        price: this.data.items[i].price
                    });
                } else {
                    this.orderItems.push({
                        id: this.data.orderItems.length + 1,
                        title: this.data.items[i].name,
                        amount: this.data.countersValue[i],
                        price: this.data.items[i].price * this.countersValue[i]
                    });
                    setOrderItems(this.data.orderItems);
                    setTotalPrice(this.data.totalPrice + (this.data.items[i].price * this.data.countersValue[i]))
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
        console.log(this.data.items);
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