import axios from 'axios';

import Component from "../Component";
import MenuItem from "../MenuItem/MenuItem";
import './MenuBlock.css';

import { storage } from "../storage";
import { setTabReadyContent } from "../storage";
import { setSelectedModalTab } from "../storage";
import { setModalContent } from "../storage";
import { setModalWindowAddShow } from "../storage";
import { setCountersValue } from "../storage";
import { setOrderItems } from "../storage";
import { setTotalPrice } from "../storage";
import { setModalWindowAuthorizationShow } from "../storage";

class MenuBlock extends Component {
    constructor(props) {
        super()

        this.subscribers = ["countersValue", "items", "selectedTab"];
        for (let i in this.subscribers) {
            storage.addSubscriber(this.subscribers[i], props.rerender);
        }
    }

    enable() {
        for (let i = 0; i < storage.data.items.length; i++) {
            if (storage.data.items[i] && storage.data.items[i].category !== storage.data.selectedTab) {
                continue;
            }

            const handlePlusClick = () => {
                let countersValue = storage.data.countersValue;
                countersValue[i] += 1;
                setCountersValue(countersValue)
            }

            const handleMinusClick = () => {
                if (storage.data.countersValue[i] > 1) {
                    let countersValue = storage.data.countersValue;
                    countersValue[i] -= 1;
                    setCountersValue(countersValue)
                }
            }

            const handleInputChange = () => {
                let countersValue = storage.data.countersValue;
                if (document.getElementById("counter-" + (i + 1)).value > 0) {
                    countersValue[i] = parseInt(document.getElementById("counter-" + (i + 1)).value);
                } else {
                    countersValue[i] = 1;
                }
                setCountersValue(countersValue);
            }

            const handleButtonClick = async () => {
                if (storage.data.username) {
                    if (storage.data.selectedTab === "sandwiches") {
                        setSelectedModalTab("sizes");
                        setModalWindowAddShow(true);
                        setModalContent({
                            title: storage.data.items[i].name,
                            amount: storage.data.countersValue[i],
                            price: storage.data.items[i].price
                        });
                        setTabReadyContent({
                            sizes: "15 См",
                            breads: "Белый итальянский",
                            vegetables: [],
                            sauces: [],
                            fillings: []
                        })
                    } else {
                        await axios.post('http://localhost:8000/order/createNewOrder', {
                            // Спросить у Саши, как не включать в базу массивы, если они в схеме(хотя, 
                            // возможно, для них просто сделать вторую схему и всё, типа sandwichOrderSchema 
                            // и просто orderSchema)
                            title: storage.data.items[i].name,
                            username: storage.data.username,
                            amount: storage.data.countersValue[i],
                            price: storage.data.items[i].price
                        }).then(result => {
                            let orderItems = result.data;

                            setOrderItems(orderItems);
                            setTotalPrice(storage.data.totalPrice + (storage.data.items[i].price
                                * storage.data.countersValue[i]))
                        })
                    }
                } else {
                    alert("Сначала нужно авторизоваться!")
                    setModalWindowAuthorizationShow(true)
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
        for (let i in storage.data.items) {
            if (storage.data.items[i].category !== storage.data.selectedTab) {
                continue;
            }

            if (storage.data.items[i].market === "sfc") {
                logo = "i/South_fried_chicken_logo.png";
            } else if (storage.data.items[i].market === "doner") {
                logo = "i/Doner_logo.png";
            } else {
                logo = "i/Subway_logo.png";
            }
            items += menuItem.render(storage.data.items[i], parseInt(i) + 1, logo,
                storage.data.countersValue);
        }

        return items;
    }

    render() {
        return (/*html*/`
        <div class="items-block">
            ${this.loadMenu()}
        </div>
      `)
    }
}

export default MenuBlock