import Component from "./Component"

class Ingredient extends Component {
    constructor() {
        super();
    }
    render(item, i) {
        return (/*html*/`
            <div class="item" id="item-${i}">
                <img class="item-image" src=${item.image} />
                <p class="item-name">${item.name}</p>
                <div class="item-price-block">
                    <p class="price-text">Цена:</p>
                    <p class="price-value" id="price-${i}">${item.price}</p>
                    <p class="price-currency">руб.</p>
                </div>
            </div> 
      `)
    }
}

export default Ingredient