import Component from "./Component"

class ItemsBlock extends Component{
    constructor() {
        super();
    }
    render(item, i, logo) {
        return (/*html*/`
            <div class="item" id="item-${i}">
                <img class="logo" src=${logo} />
                <img class="item-image" src=${item.image} />
                <p class="item-name">${item.name}</p>
                <p class="item-composition">${item.description}</p>
                <div class="item-price-block">
                    <p class="price-text">Цена:</p>
                    <p class="price-value" id="price-${item}">${item.price}</p>
                    <p class="price-currency">руб.</p>
                </div>
                <p class="item-amount">Количество</p>
                <div class="amount-block">
                    <img class="minus-icon" src="i/minus.svg" id="minus-${i}" onclick="minusClick(event.target)">
                    <input class="item-counter" type="text" id="counter-${i}" value="1">
                    <img class="plus-icon" src="i/plus.svg" id="plus-${i}" onclick="plusClick(event.target)">
                </div>
                <button class="item-button" id="button-${i}" onclick="addToBasket(event.target)">В КОРЗИНУ</button>
        </div> 
      `)
    }
}

export default ItemsBlock