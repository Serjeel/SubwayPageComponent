import Component from "./Component";
import MainHeader from "./MainHeader";
import MenuBlock from "./MenuBlock";
import MenuCategories from "./MenuCategories";
import Order from "./Order";

class App extends Component {
    constructor(onChange) {
        const data = {
            selectedTab: "sandwiches",
            items: [], // Пройтись по первой главе learnJs и выполнить все задачки
            countersValue: [],
            orderItems: [],
            totalPrice: 0
        }
        super(data)
        super.setRerender(onChange)
        this.onChange = onChange;
        this.createChildren() // eslint + prettier

        const getData = async () => {
            await fetch("./src/data.json")
                .then(response => response.json())
                .then(data => {
                    data.menu.map(() => {
                        this.data.countersValue.push(1)
                    });
                    this.data.items = data.menu;
                })
        }
        getData();
    }

    createChildren() {
        this.mainHeader = new MainHeader();
        this.menuCategories = new MenuCategories({
            selectedTab: this.data.selectedTab,
            handleChangeSelectedTabClick: (x) => { this.data.selectedTab = x }
        });
        this.order = new Order({
            orderItems: this.data.orderItems,
            setOrderItems: (x) => { this.data.orderItems = x },
            totalPrice: this.data.totalPrice,
            setTotalPrice: (x) => { this.data.totalPrice = x }
        });
        this.menuBlock = new MenuBlock({
            items: this.data.items,
            countersValue: this.data.countersValue,
            selectedTab: this.data.selectedTab,
            handleChangeCountersValueClick: (x) => { this.data.countersValue = x },
            orderItems: this.data.orderItems,
            setOrderItems: (x) => { this.data.orderItems = x },
            totalPrice: this.data.totalPrice,
            setTotalPrice: (x) => { this.data.totalPrice = x }
        });
    }

    enable() {
        this.menuCategories.enable();
        this.menuBlock.enable();
        this.order.enable();
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