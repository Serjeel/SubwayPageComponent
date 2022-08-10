import Component from "./Component";
import MainHeader from "./MainHeader";
import MenuBlock from "./MenuBlock";
import MenuCategories from "./MenuCategories";
import ModalWindow from "./ModalWindow";
import Order from "./Order";

class App extends Component {
    constructor(onChange) {
        const data = {
            selectedTab: "sandwiches",
            selectedModalTab: "sizes",
            items: [], // Пройтись по первой главе learnJs и выполнить все задачки
            ingredients: [],
            countersValue: [],
            orderItems: [],
            totalPrice: 0,
            modalWindowFlag: false,
            modalContent: []
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
                    this.data.ingredients = {
                        sizes: data.sizes,
                        breads: data.breads,
                        vegetables: data.vegetables,
                        sauces: data.sauces,
                        fillings: data.fillings
                    }
                })
        }
        getData();
    }

    createChildren() {
        this.mainHeader = new MainHeader();
        this.menuCategories = new MenuCategories({
            selectedTab: this.data.selectedTab,
            setSelectedTab: (x) => { this.data.selectedTab = x }
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
            setCountersValue: (x) => { this.data.countersValue = x },
            orderItems: this.data.orderItems,
            setOrderItems: (x) => { this.data.orderItems = x },
            totalPrice: this.data.totalPrice,
            setTotalPrice: (x) => { this.data.totalPrice = x },
            setModalWindowFlag: (x) => { this.data.modalWindowFlag = x },
            setModalContent: (x) => { this.data.modalContent = x },
            setSelectedModalTab: (x) => { this.data.selectedModalTab = x },
        });
        this.modalWindow = new ModalWindow({
            setModalWindowFlag: (x) => { this.data.modalWindowFlag = x },
            selectedModalTab: this.data.selectedModalTab,
            setSelectedModalTab: (x) => { this.data.selectedModalTab = x },
            ingredients: this.data.ingredients,
            modalContent: this.data.modalContent
        });
    }

    enable() {
        this.menuCategories.enable();
        this.menuBlock.enable();
        this.order.enable();
        if (this.data.modalWindowFlag) {
            this.modalWindow.enable();
        }
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
        ${this.data.modalWindowFlag ? this.modalWindow.render() : []}
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