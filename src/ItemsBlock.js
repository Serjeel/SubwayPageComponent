class ItemsBlock {
    constructor() {

    }
    render() {
        return (/*html*/`
            <div class="item" id="item-1">
                <img class="logo" src="i/Subway_logo.png" />
                <img class="item-image" src="i/Burger1.jpg" />
                <p class="item-name">Овощной</p>
                <p class="item-composition">${this.V}</p>
                <div class="item-price-block">
                    <p class="price-text">Цена:</p>
                    <p class="price-value" id="price-1">110</p>
                    <p class="price-currency">руб.</p>
                </div>
                <p class="item-amount">Количество</p>
                <div class="amount-block">
                    <img class="minus-icon" src="i/minus.svg" id="minus-1" onclick="minusClick(event.target)">
                    <input class="item-counter" type="text" id="counter-1" value="1">
                    <img class="plus-icon" src="i/plus.svg" id="plus-1" onclick="plusClick(event.target)">
                </div>
                <button class="item-button" id="button-1" onclick="addToBasket(event.target)">В КОРЗИНУ</button>
        </div> 
      `)
    }
}

export default ItemsBlock