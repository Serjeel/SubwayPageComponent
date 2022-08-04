import Component from "./Component";
import MenuItem from "./MenuItem";

class MenuBlock extends Component {
    constructor(props) {
        const data = {
            items: props.items,
            selectedTab: props.selectedTab,
            countersValue: []
        }

        super(data)
        super.setRerender(this.render)
        console.log(data.items.length);
    }

    // Далее что нужно сделать:
    // 1. Каунтеры(не забыть сделать так, чтобы они не менялись при переключении)


    enable() {
        for (let i = 0; i < this.data.items.length; i++) {
            if (this.data.items[i] && this.data.items[i].category !== this.data.selectedTab) {
                continue;
            }
            const handlePlusClick = () => {
                this.data.countersValue[i] += 1;
                console.log(this.data.countersValue[i]);
                console.log("Нажат плюс");
            }
            const handleMinusClick = () => {
                this.data.countersValue[i] -= 1;
                console.log(this.data.countersValue[i]);
                console.log("Нажат минус");
            }
            console.log(document.getElementById("minus-" + (i + 1)));

            document.getElementById("plus-" + (i + 1)).addEventListener("click", handlePlusClick)
            document.getElementById("minus-" + (i + 1)).addEventListener("click", handleMinusClick)
        }
    }

    loadMenu() {
        const menuItem = new MenuItem({ items: this.data.items });
        let items = "";
        let logo = "";
        for (let i in this.data.items) {
            this.data.countersValue.push(1);
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