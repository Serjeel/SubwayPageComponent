import Component from "./Component";
import MainHeader from "./MainHeader";
import MenuBlock from "./MenuBlock";
import MenuCategories from "./MenuCategories";
import Order from "./Order";

class App extends Component {
    constructor() {
        const data = {
            selectedTab: "sandwiches" // Сделать selectedTab как state в других компонентах и 
                                        // по аналогии других компонентов сделать перерендер всего App
                                        // Возможно для этого стоит перенести рендер Аппа в Component
        }
        super(data)
        super.setRerender(this.render)
        this.createChildren() // eslint + prettier
    }

    createChildren() {
        const { selectedTab } = this.data

        this.mainHeader = new MainHeader();
        this.menuCategories = new MenuCategories({
            selectedTab: selectedTab
        });
        this.order = new Order();
        this.menuBlock = new MenuBlock({
            data: [],
            selectedTab: selectedTab,
            testMethod: this.testMethod
        });
    }

    enable() {
        this.menuCategories.addListeners();
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

const app = new App();
document.body.innerHTML = app.render();
app.enable();