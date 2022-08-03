import Component from "./Component";
import MainHeader from "./MainHeader";
import MenuBlock from "./MenuBlock";
import MenuCategories from "./MenuCategories";
import Order from "./Order";

class App extends Component {
    constructor(onChange) {
        const data = {
            selectedTab: "sandwiches",
            items: [] // Пройтись по первой главе learnJs и выполнить все задачки
        }
        super(data)
        super.setRerender(onChange)
        this.onChange = onChange
        this.createChildren() // eslint + prettier

        const getData = async() => {
            await fetch("./src/data.json")
                .then(response => response.json())
                .then(data => {
                    this.data.items = data.menu;
                })
        }

        if(this.data.items.length === 0) {
            getData();
        }
    }

    createChildren() {
        this.mainHeader = new MainHeader();
        this.menuCategories = new MenuCategories({
            selectedTab: this.data.selectedTab,
            handleChangeSelectedTabClick: (x) => {this.data.selectedTab = x}
        });
        this.order = new Order();
        this.menuBlock = new MenuBlock({
            items: this.data.items,
            selectedTab: this.data.selectedTab,
            testMethod: this.testMethod,
            //rerenderApp: this.onChange
        });
    }

    enable() {
        this.menuCategories.enable();     
    }

    testMethod() {
        console.log("Метод сработал");
    }

    render() {
        this.createChildren();
        return (/*html*/`
        ${this.mainHeader.render()}
        <div class="main-form">
            <div class="categories_and_orders-block">
                ${this.menuCategories.render()}
                ${this.order.render()}
            </div>
            ${this.menuBlock.render()}
        </div>
        `)
    }
}

export default App;

const rerenderApp = () => {
    document.body.innerHTML = app.render();
    app.enable();
}

const app = new App(
    rerenderApp
);