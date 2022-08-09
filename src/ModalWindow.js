import Component from "./Component";
import Ingredient from "./Ingredient";

class ModalWindow extends Component {
    constructor(props) {
        super();
        this.ingredients = props.ingredients;
        this.selectedModalTab = props.selectedModalTab;
        this.modalContent = props.modalContent;

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

    }

    loadIngredients() { // Перенести данные об ингредиентах сюда так, чтобы по ним можно было
                        // пройтись циклом. Плюс поместить в рендер данные из modalContent
        const ingredient = new Ingredient();
        let items = "";
        console.log(this.ingredients);

        for (let i in this.ingredients[this.selectedModalTab]) {
            items += ingredient.render(this.ingredients[i], parseInt(i) + 1);
        }
        console.log(this.ingredients);
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