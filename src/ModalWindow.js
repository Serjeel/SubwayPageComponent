import Component from "./Component";
import Ingredient from "./Ingredient";

class ModalWindow extends Component {
    constructor(props) {
        super();
        this.ingredients = props.ingredients;
        this.selectedModalTab = props.selectedModalTab;
        this.modalContent = props.modalContent;
        this.tabReadyContent = props.tabReadyContent;
        this.previousValues = props.previousValues;

        this.setPreviousValues = props.setPreviousValues;
        this.setModalContent = props.setModalContent;
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
            this.setPreviousValues({
                sizes: 0,
                breads: 0
            })
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
                const scrollPosition = document.getElementsByClassName("tab-content-block")[0].scrollTop
                if (this.selectedModalTab === "sizes" || this.selectedModalTab === "breads") {
                    this.tabReadyContent[this.selectedModalTab] = this.ingredients[this.
                        selectedModalTab][key].name;

                    this.modalContent.price += this.ingredients[this.selectedModalTab][key].price;
                    this.modalContent.price -= this.previousValues[this.selectedModalTab];

                    this.previousValues[this.selectedModalTab] = this.
                        ingredients[this.selectedModalTab][key].price;

                    this.setTabReadyContent(this.tabReadyContent);
                } else {
                    if (this.tabReadyContent[this.selectedModalTab].includes(this.
                        ingredients[this.selectedModalTab][key].name)) {
                        let n = this.tabReadyContent[this.selectedModalTab].indexOf(this.
                            ingredients[this.selectedModalTab][key].name);
                        console.log(n);
                        this.modalContent.price -= this.ingredients[this.selectedModalTab][key].price;
                        this.tabReadyContent[this.selectedModalTab].splice(n, 1);
                        console.log(this.tabReadyContent[this.selectedModalTab]);
                        this.setTabReadyContent(this.tabReadyContent);
                    } else {
                        this.tabReadyContent[this.selectedModalTab].push(this.ingredients[this.
                            selectedModalTab][key].name)
                        this.modalContent.price += this.ingredients[this.selectedModalTab][key].price;
                        this.setTabReadyContent(this.tabReadyContent)
                        console.log(this.tabReadyContent[this.selectedModalTab]);
                    }
                }
                document.getElementsByClassName("tab-content-block")[0].scrollTo(0, scrollPosition)
            }
            document.getElementById("item-" + key).addEventListener("click", modalItemClick)
        }
    }

    // Теперь надо сделать добавление в корзину, возможность менять amount на плюс, минус и вручную и в 
    // самой модалке и возможность редактирования

    loadIngredients() {
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
            <p class="final-order-title" id="item-name-modal">${this.modalContent.title}</p>
        </div>
        `
        return content
    }

    loadModalOrder() {
        return (/*html*/ `
        <p class="item-amount">Количество</p>
        <div class="amount-block">
            <img class="minus-icon" src="i/minus.svg">
            <input class="item-counter" type="text" id="counter-modal" value=${this.modalContent.amount}>
            <img class="plus-icon" src="i/plus.svg">
        </div>
        <button class="item-button">В КОРЗИНУ</button>
        `)
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
                        <p class="price-value" id="price-modal">${this.selectedModalTab === "ready" ?
                this.modalContent.price * this.modalContent.amount : this.modalContent.price}</p>
                        <p class="price-currency">руб.</p>
                    </div>
                    <div class="modal-order-block">
                    ${this.selectedModalTab === "ready" ? this.loadModalOrder() : []}
                    </div>
                </div>
            </div>
        </div>
        `)
    }
}

export default ModalWindow