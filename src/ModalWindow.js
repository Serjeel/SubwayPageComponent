import Component from "./Component";
import Ingredient from "./Ingredient";

class ModalWindow extends Component {
    constructor(props) {
        super();
        this.ingredients = props.ingredients;
        this.selectedModalTab = props.selectedModalTab;
        this.modalContent = props.modalContent;
        this.tabReadyContent = props.tabReadyContent;

        this.setTabReadyContent = props.setTabReadyContent;
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
            this.setTabReadyContent({
                sizes: "15 См",
                breads: "Белый итальянский",
                vegetables: [],
                sauces: [],
                fillings: []
            })
        }

        document.getElementById("sizes").addEventListener("click", sizesTabClick)
        document.getElementById("breads").addEventListener("click", breadsTabClick)
        document.getElementById("vegetables").addEventListener("click", vegetablesTabClick)
        document.getElementById("sauces").addEventListener("click", saucesTabClick)
        document.getElementById("fillings").addEventListener("click", fillingsTabClick)
        document.getElementById("ready").addEventListener("click", readyTabClick)

        document.getElementsByClassName("close-icon")[0].addEventListener("click", closeIconClick)

        for (let key in this.ingredients[this.selectedModalTab]) {
            const modalItemClick = () => {
                if (this.selectedModalTab === "sizes" || this.selectedModalTab === "breads") {
                    this.tabReadyContent[this.selectedModalTab] = this.ingredients[this.selectedModalTab][key].name
                    this.setTabReadyContent(this.tabReadyContent)
                    console.log(this.tabReadyContent[this.selectedModalTab]);
                } else {
                    if(this.tabReadyContent[this.selectedModalTab].includes(this.
                        ingredients[this.selectedModalTab][key].name)) {
                            let n = this.tabReadyContent[this.selectedModalTab].indexOf(this.
                                ingredients[this.selectedModalTab][key].name);
                                console.log(n);
                                this.tabReadyContent[this.selectedModalTab].splice(n, 1);
                                console.log(this.tabReadyContent[this.selectedModalTab]);
                                this.setTabReadyContent(this.tabReadyContent);
                                // Далее по списку прибавление цены ингредиентов к итоговой цене
                    } else {
                        this.tabReadyContent[this.selectedModalTab].push(this.ingredients[this.selectedModalTab][key].name)
                        this.setTabReadyContent(this.tabReadyContent)
                        console.log(this.tabReadyContent[this.selectedModalTab]);
                    }
                }
            }

            document.getElementById("item-" + key).addEventListener("click", modalItemClick)
        }

    }

    loadIngredients() { // Поместить в рендер данные из modalContent и сделать условный рендер для 6 вкладки
        const ingredient = new Ingredient({
            tabReadyContent: this.tabReadyContent
        });
        let items = "";

        for (let key in this.ingredients[this.selectedModalTab]) {
            items += ingredient.render(this.ingredients[this.selectedModalTab][key], key);
        }

        return items;
    }

    loadReadyPage() {
        const content = /*html*/ `
        <div class="image-block">
            <img class="result-image" src="i/result_sandwich.jpg">
        </div>
        <div class="final-order-block">
            <p class="final-order-ready">Ваш сендвич готов!</p>
        <div class="final-order-size">
            <p class="final-order-size-text">Размер:</p>
            <p class="final-order-size-value">${this.tabReadyContent.sizes}</p>
        </div>
        <div class="final-order-bread">
            <p class="final-order-bread-text">Хлеб:</p>
            <p class="final-order-bread-value">${this.tabReadyContent.breads}</p>
        </div>
        <div class="final-order-vegetables">
            <p class="final-order-vegetables-text">Овощи:</p>
            <p class="final-order-vegetables-value">${this.tabReadyContent.vegetables.length === 0
                ? "Нет" : this.tabReadyContent.vegetables}</p>
        </div>
        <div class="final-order-sauces">
            <p class="final-order-sauces-text">Соусы:</p>
            <p class="final-order-sauces-value">${this.tabReadyContent.sauces.length === 0
                ? "Нет" : this.tabReadyContent.sauces}</p>
        </div>
        <div class="final-order-filling">
            <p class="final-order-filling-text">Начинка:</p>
            <p class="final-order-filling-value">${this.tabReadyContent.fillings.length === 0
                ? "Нет" : this.tabReadyContent.fillings}</p>
        </div>
            <p class="final-order-title" id="item-name-modal">Индейка</p>
        </div>
        `
        return content
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
                ${this.selectedModalTab === "ready" ? this.loadReadyPage() : this.loadIngredients()}
                </div>
                <div class="modal-footer">
                    <div class="item-price-block">
                        <p class="price-text">Цена:</p>
                        <p class="price-value" id="price-modal">${this.modalContent.price}</p>
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