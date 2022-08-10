import Component from "./Component";
import Ingredient from "./Ingredient";

class ModalWindow extends Component {
    constructor(props) {
        super();
        this.ingredients = props.ingredients;
        this.selectedModalTab = props.selectedModalTab;
        this.modalContent = props.modalContent;

        this.setModalWindowFlag = props.setModalWindowFlag;
        this.setSelectedModalTab = props.setSelectedModalTab;
        this.tabs = {
            sizes: "Размер",
            breads: "Хлеб",
            vegetables: "Овощи",
            sauces: "Соусы",
            fillings: "Начинка",
            ready: "Готово!"
        };
    }

    enable() {
            const sizesTabClick = () => {
                this.setSelectedModalTab("sizes")
            }
            const breadsTabClick = () => {
                this.setSelectedModalTab("breads")
            }
            const vegetablesTabClick = () => {
                this.setSelectedModalTab("vegetables")
            }
            const saucesTabClick = () => {
                this.setSelectedModalTab("sauces")
            }
            const fillingsTabClick = () => {
                this.setSelectedModalTab("fillings")
            }
            const readyTabClick = () => {
                this.setSelectedModalTab("ready")
            }

            const closeIconClick = () => {
                this.setModalWindowFlag(false)
            }

            document.getElementById("sizes").addEventListener("click", sizesTabClick)
            document.getElementById("breads").addEventListener("click", breadsTabClick)
            document.getElementById("vegetables").addEventListener("click", vegetablesTabClick)
            document.getElementById("sauces").addEventListener("click", saucesTabClick)
            document.getElementById("fillings").addEventListener("click", fillingsTabClick)
            document.getElementById("ready").addEventListener("click", readyTabClick)

            document.getElementsByClassName("close-icon")[0].addEventListener("click", closeIconClick)
    }

    loadIngredients() { // Поместить в рендер данные из modalContent и сделать условный рендер для 6 вкладки
        const ingredient = new Ingredient();
        let items = "";

        for (let i in this.ingredients[this.selectedModalTab]) {
            items += ingredient.render(this.ingredients[this.selectedModalTab][i], i);
        }
        
        return items;
    }

    render() {
        let modalTabs = ``;
        for (let i in this.tabs) {
            modalTabs += `<p class="${this.selectedModalTab === i ? "tab-active" : "tab"}"
                id="${i}">${this.tabs[i]}</p>`
        }
        return (/*html*/`
        <div class="modal-window">
            <div class="modal-content">
                <div class="modal-header-block">
                    <h3 class="modal-header">Проверьте и добавьте в корзину</h3>
                    <img class="close-icon" src="i/close-icon.svg"/>
                </div>
                <div class="modal-tabs-block">
                    <div class="modal-tabs">
                       ${modalTabs}
                   </div>
                </div>
                <div class="arrows-block">
                </div>
                <div class="tab-content-block">
                ${this.loadIngredients()}
                </div>
                <div class="modal-footer">
                    <div class="item-price-block">
                        <p class="price-text">Цена:</p>
                        <p class="price-value" id="price-modal"></p>
                        <p class="price-currency">руб.</p>
                    </div>
                    <div class="modal-order-block">
                    </div>
                </div>
            </div>
        </div>
        `)
    }
}

export default ModalWindow