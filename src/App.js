import Component from "./Component";
import MainHeader from "./MainHeader/MainHeader";
import MenuBlock from "./MenuBlock/MenuBlock";
import MenuCategories from "./MenuCategories/MenuCategories";
import ModalWindow from "./ModalWindow/ModalWindow";
import Order from "./Order/Order";
import './App.css';

class App extends Component {
    constructor(onChange) {
        const data = {
            selectedTab: "sandwiches",
            selectedModalTab: "sizes",
            items: [],
            ingredients: [],
            countersValue: [],
            orderItems: [],
            totalPrice: 0,
            modalWindowAddShow: false,
            modalWindowEditShow: false,
            modalContent: {},
            sandwiches: [],
            changeableOrderItem: {
                orderId: 0,
                sandwichId: 0
            },
            tabReadyContent: {
                sizes: "15 См",
                breads: "Белый итальянский",
                vegetables: [],
                sauces: [],
                fillings: []
            },
            previousValues: {
                sizes: 0,
                breads: 0
            }
        }
        super(data)
        super.setRerender(onChange)
        this.onChange = onChange;
        this.createChildren()

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
            setTotalPrice: (x) => { this.data.totalPrice = x },
            sandwiches: this.data.sandwiches,
            setSandwiches: (x) => { this.data.sandwiches = x },
            modalWindowAddShow: this.data.modalWindowAddShow,
            setModalWindowAddShow: (x) => { this.data.modalWindowAddShow = x },
            modalWindowEditShow: this.data.modalWindowEditShow,
            setModalWindowEditShow: (x) => { this.data.modalWindowEditShow = x },
            modalContent: this.data.modalContent,
            setModalContent: (x) => { this.data.modalContent = x },
            setSelectedModalTab: (x) => { this.data.selectedModalTab = x },
            tabReadyContent: this.data.tabReadyContent,
            setTabReadyContent: (x) => { this.data.tabReadyContent = x },
            changeableOrderItem: this.data.changeableOrderItem,
            setChangeableOrderItem: (x) => { this.data.changeableOrderItem = x }
        });
        this.menuBlock = new MenuBlock({
            items: this.data.items,
            selectedTab: this.data.selectedTab,
            countersValue: this.data.countersValue,
            setCountersValue: (x) => { this.data.countersValue = x },
            orderItems: this.data.orderItems,
            setOrderItems: (x) => { this.data.orderItems = x },
            totalPrice: this.data.totalPrice,
            setTotalPrice: (x) => { this.data.totalPrice = x },
            setModalWindowAddShow: (x) => { this.data.modalWindowAddShow = x },
            setModalContent: (x) => { this.data.modalContent = x },
            setSelectedModalTab: (x) => { this.data.selectedModalTab = x },
        });
        this.modalWindow = new ModalWindow({
            modalWindowAddShow: this.data.modalWindowAddShow,
            setModalWindowAddShow: (x) => { this.data.modalWindowAddShow = x },
            modalWindowEditShow: this.data.modalWindowEditShow,
            setModalWindowEditShow: (x) => { this.data.modalWindowEditShow = x },
            selectedModalTab: this.data.selectedModalTab,
            setSelectedModalTab: (x) => { this.data.selectedModalTab = x },
            ingredients: this.data.ingredients,
            modalContent: this.data.modalContent,
            setModalContent: (x) => { this.data.modalContent = x },
            tabReadyContent: this.data.tabReadyContent,
            setTabReadyContent: (x) => { this.data.tabReadyContent = x },
            previousValues: this.data.previousValues,
            setPreviousValues: (x) => { this.data.previousValues = x },
            countersValue: this.data.countersValue,
            setCountersValue: (x) => { this.data.countersValue = x },
            orderItems: this.data.orderItems,
            setOrderItems: (x) => { this.data.orderItems = x },
            totalPrice: this.data.totalPrice,
            setTotalPrice: (x) => { this.data.totalPrice = x },
            sandwichesLength: this.data.sandwichesLength,
            setSandwichesLength: (x) => { this.data.sandwichesLength = x },
            sandwiches: this.data.sandwiches,
            setSandwiches: (x) => { this.data.sandwiches = x },
            changeableOrderItem: this.data.changeableOrderItem,
            setChangeableOrderItem: (x) => { this.data.changeableOrderItem = x }
        });
    }

    enable() {
        this.menuCategories.enable();
        this.menuBlock.enable();
        this.order.enable();
        if (this.data.modalWindowAddShow || this.data.modalWindowEditShow) {
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
        ${this.data.modalWindowAddShow || this.data.modalWindowEditShow ? this.modalWindow.render() : ''}
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