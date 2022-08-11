import Component from "./Component"

class Ingredient extends Component {
    constructor(props) {
        super();
        this.tabReadyContent = props.tabReadyContent;
    }
    render(item, key) {
        return (/*html*/`
            <div class=${this.tabReadyContent.sizes === item.name ||
                this.tabReadyContent.breads === item.name ||
                this.tabReadyContent.vegetables.includes(item.name) ||
                this.tabReadyContent.sauces.includes(item.name) ||
                this.tabReadyContent.fillings.includes(item.name)
                ? "modal-item-active" : "modal-item"} id="item-${key}">
                <img class="item-image" src=${item.image} />
                <p class="item-name">${item.name}</p>
                <div class="item-price-block">
                    <p class="price-text">Цена:</p>
                    <p class="price-value" id="price-${key}">${item.price}</p>
                    <p class="price-currency">руб.</p>
                </div>
            </div> 
      `)
    }
}

export default Ingredient