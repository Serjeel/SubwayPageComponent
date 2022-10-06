import Component from "./Component";
import MainHeader from "./MainHeader/MainHeader";
import MenuBlock from "./MenuBlock/MenuBlock";
import MenuCategories from "./MenuCategories/MenuCategories";
import ModalWindowSandwich from "./ModalWindowSandwich/ModalWindowSandwich";
import ModalWindowAuthorization from "./ModalWindowAuthorization/ModalWindowAuthorization";
import Order from "./Order/Order";
import { storage, setItemsInfo, setAuthorization } from "./storage";
import './App.css';
import { getAuthorization, getItemsInfo } from "./api";

class App extends Component {
    constructor() {
        super()
        this.rerenderMainHeader = this.rerenderMainHeader.bind(this);
        this.rerenderMenuBlock = this.rerenderMenuBlock.bind(this);
        this.rerenderMenuCategories = this.rerenderMenuCategories.bind(this);
        this.rerenderOrder = this.rerenderOrder.bind(this);
        this.rerenderModalWindowSandwich = this.rerenderModalWindowSandwich.bind(this);
        this.rerenderModalWindowAuthorization = this.rerenderModalWindowAuthorization.bind(this)
    }

    createChildren() {
        this.mainHeader = new MainHeader({
            rerender: this.rerenderMainHeader
        });
        this.menuCategories = new MenuCategories({
            rerender: this.rerenderMenuCategories
        });
        this.order = new Order({
            rerender: this.rerenderOrder
        });
        this.menuBlock = new MenuBlock({
            rerender: this.rerenderMenuBlock
        });
        this.modalWindowSandwich = new ModalWindowSandwich({
            rerender: this.rerenderModalWindowSandwich
        });

        this.modalWindowAuthorization = new ModalWindowAuthorization({
            rerender: this.rerenderModalWindowAuthorization
        })
    }

    async enable() {
        this.mainHeader.enable();
        this.menuCategories.enable();

        this.order.enable();
        if (this.data.modalWindowAddShow || this.data.modalWindowEditShow) {
            this.modalWindowSandwich.enable();
        }

        if (this.data.modalWindowAuthorizationShow) {
            this.modalWindowAuthorization.enable();
        }
        const itemsInfo = await getItemsInfo();
        const auth = await getAuthorization();
        setItemsInfo(itemsInfo);
        setAuthorization(auth);
    }

    rerenderMainHeader() {
        document.getElementsByClassName("header")[0].innerHTML = this.mainHeader.render();
        this.mainHeader.enable();
    }

    rerenderMenuCategories() {
        document.getElementsByClassName("menu-categories")[0].innerHTML = this.menuCategories.render();
        this.menuCategories.enable();
    }

    rerenderOrder() {
        document.getElementsByClassName("order")[0].innerHTML = this.order.render();
        this.order.enable();
    }

    rerenderMenuBlock() {
        document.getElementsByClassName("menu-block")[0].innerHTML = this.menuBlock.render();
        this.menuBlock.enable();
    }

    rerenderModalWindowSandwich() {
        if (storage.data.modalWindowAddShow || storage.data.modalWindowEditShow) {
            document.getElementsByClassName("modal-block")[0].innerHTML = this.modalWindowSandwich.render();
            this.modalWindowSandwich.enable();
        } else {
            document.getElementsByClassName("modal-block")[0].innerHTML = "";
        }
    }

    rerenderModalWindowAuthorization() {
        if (storage.data.modalWindowAuthorizationShow) {
            document.getElementsByClassName("modal-block")[0].innerHTML = this.modalWindowAuthorization.render();
            this.modalWindowAuthorization.enable();
        } else {
            document.getElementsByClassName("modal-block")[0].innerHTML = "";
        }
    }

    render() {
        this.createChildren();
        return (/*html*/`
        <div class="header">
            ${this.mainHeader.render()}
        </div>
        <div class="main-form">
            <div class="categories_and_orders-block">
            <div class="menu-categories">
                ${this.menuCategories.render()}
            </div>
            <div class="order">
                ${this.order.render()}
            </div>
            </div>
            <div class="menu-block">
                ${this.menuBlock.render()}
            </div>
        </div>
        <div class="modal-block">
        </div>
        `)
    }
}

const app = new App();

document.body.innerHTML = app.render();
app.enable();