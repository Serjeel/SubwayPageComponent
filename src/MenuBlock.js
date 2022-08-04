import Component from "./Component";
import MenuItem from "./MenuItem";

class MenuBlock extends Component {
    constructor(props) {
        const data = {
            countersValue: props.countersValue,
            items: props.items,
            selectedTab: props.selectedTab
        }
        super(data)
        super.setRerender(this.render)
        this.handleChangeCountersValueClick = props.handleChangeCountersValueClick;
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

            document.getElementById("plus-" + (i + 1)).addEventListener("click", handlePlusClick)
            document.getElementById("minus-" + (i + 1)).addEventListener("click", handleMinusClick)
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