import Component from "./Component";
import MainHeader from "./MainHeader";
import MenuBlock from "./MenuBlock";
import MenuCategories from "./MenuCategories";
import Order from "./Order";

class App extends Component {
    constructor(
        onChange
    ) {
        const data = {
            selectedTab: "sandwiches" // Пройтись по первой главе learnJs и выполнить все задачки
        }
        super(data)
        super.setRerender(onChange)
        console.log(onChange);
        this.onChange = onChange
        this.createChildren() // eslint + prettier

        // Переместить getData сюда, так как App объявляется один раз, а enable вызывается много раз
    }

    createChildren() {
        this.mainHeader = new MainHeader();
        this.menuCategories = new MenuCategories({
            selectedTab: this.data.selectedTab,
            handleChangeSelectedTabClick: (x) => {this.data.selectedTab = x}
        });
        this.order = new Order();
        this.menuBlock = new MenuBlock({
            data: [],
            selectedTab: this.data.selectedTab,
            testMethod: this.testMethod,
            //rerenderApp: this.onChange
        });
    }

    enable() {
        this.menuCategories.addListeners();
        console.log(this.data.selectedTab);
        this.menuBlock.enable();
        
    }

    testMethod() {
        console.log("Метод сработал");
    }

    render() {
        this.createChildren();
        console.log(this.data.selectedTab);
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
rerenderApp();