import Component from "./Component";
import MainHeader from "./MainHeader";
import MenuBlock from "./MenuBlock";
import MenuCategories from "./MenuCategories";
import Order from "./Order";

class App extends Component {
    constructor() {
        super()
    }
    render() {
        const mainHeader = new MainHeader();
        const menuCategories = new MenuCategories();
        const order = new Order();
        let data = [];
       
        const menuBlock = new MenuBlock({
            data
        });

        return (/*html*/`
        ${mainHeader.render()}
        <div class="main-form">
            <div class="categories_and_orders-block">
                ${menuCategories.render()}
                ${order.render()}
            </div>
            ${menuBlock.render()}
        </div>
        `)
    }
}
const app = new App();
document.body.innerHTML = app.render();