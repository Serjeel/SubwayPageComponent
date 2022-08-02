import Component from "./Component";
import ItemsBlock from "./ItemsBlock";

class MenuBlock extends Component {
    constructor(props) {
        const data = {
            items: [],
            // selectedTab: props.selectedTab,
            testMethod: props.testMethod,
            //rerenderApp: props.rerenderApp
        }
        
        

        super(data)
        super.setRerender(this.render)
        //super.setRerender(this.data.rerenderApp)
        console.log(data.items.length);
    }

    // Далее что нужно сделать:
    // 1. Фильтрация меню по категориям(возможно надо перенести функцию в App и передвавать пропсами)
    // 2. Каунтеры(не забыть сделать так, чтобы они не менялись при переключении)

    loadMenu() {
        //console.log(this.data.items);
        //this.data.testMethod()
        const itemsBlock = new ItemsBlock();
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

            items += itemsBlock.render(this.data.items[i], parseInt(i) + 1, logo);
        }
        if (this.data.items === undefined) {
            items = "Загрузка..."
        }
       // console.log(this.data.items);
        //console.log(this.props.selectedTab);

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

    enable() {
        async function getData() {
            await fetch("./src/data.json")
                .then(response => response.json())
                .then(data => {
                    this.data.items = data.menu;
                })
        }

        if(this.data.items !== 0) {
            getData();
        }
    }
}

export default MenuBlock