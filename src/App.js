import Component from "./Component";
import MainHeader from "./MainHeader";
import MenuBlock from "./MenuBlock";
import MenuCategories from "./MenuCategories";
import Order from "./Order";

class App extends Component {
    constructor() {
        super()
        let selectedTab = "sandwiches"

        this.mainHeader = new MainHeader();
        this.menuCategories = new MenuCategories({
            selectedTab: selectedTab
        });
        this.order = new Order();
        this.menuBlock = new MenuBlock({
            data: [],
            selectedTab: selectedTab
        });
    }

    enable() {
        this.menuCategories.addListeners();
    }

    render() {
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
app.enable(); // Сюда засунуть все eventListeners