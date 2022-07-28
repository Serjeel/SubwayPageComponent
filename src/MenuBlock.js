import Component from "./Component";
import ItemsBlock from "./ItemsBlock";

class MenuBlock extends Component {
    constructor(props) {
        const data = {
            items: props.data.menu,
            selectedTab: props.selectedTab
        }
        super(data)
        super.setRerender(this.loadMenu)
    }

    // Далее что нужно сделать:
    // 1. Фильтрация меню по категориям(возможно надо перенести функцию в App и передвавать пропсами)
    // 2. Каунтеры(не забыть сделать так, чтобы они не менялись при переключении)
    // 3. Сделать рендеринг без getElement

    loadMenu() {
        console.log(this.data.items);
        const itemsBlock = new ItemsBlock();
        let items = "";
        let logo = "";
        for (let i in this.data.items) {
            if (this.data.items[i].market === "sfc") {
                logo = "i/South_fried_chicken_logo.png";
            } else if (this.data.items[i].market === "doner") {
                logo = "i/Doner_logo.png";
            } else {
                logo = "i/Subway_logo.png";
            }
            if (this.data.items[i].category === this.data.selectedTab) {
                items += itemsBlock.render(this.data.items[i], parseInt(i) + 1, logo);
            }
        }
        document.getElementsByClassName("items-block")[0].innerHTML = items;
    }

    render() {
        const getData = async () => {
            await fetch("./src/data.json")
                .then(response => response.json())
                .then(data => {
                    this.data.items = data.menu;
                })
        }
        getData();
        return (/*html*/`
        <div class="menu-block">
            <div class="items-block">
            </div>
        </div>
      `)
    }
}

export default MenuBlock