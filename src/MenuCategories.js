import Component from "./Component"

class MenuCategories extends Component {
    constructor(props) {
        const data = {
            selectedTab: props.selectedTab
        }
        super(data)
        super.setRerender(this.rerender)
        this.tab = "";

        this.arrayId = ["pancakes", "shaurma", "sandwiches", "burgers", "chicken", "salads", "drinks"]
    }

    addListeners() {
        for (let i in this.arrayId) {
            document.getElementById(this.arrayId[i]).addEventListener('click', this.categoryClick.bind(this));
        }
    }

    categoryClick(target) {
        console.log("Нажато");
        console.log(this.data);
        console.log(target.target.id);
        this.tab = target.target.id;
        this.data.selectedTab = this.tab;
    }

    rerender() {
        console.log(this.data.selectedTab);
    }

    render() {
        return (/*html*/`
        <div class="menu-categories">
            <p class="category" id="pancakes">Блины</p>
            <p class="category" id="shaurma">Шаурма</p>
            <p class="category" id="sandwiches">Сэндвичи</p>
            <p class="category" id="burgers">Бургеры</p>
            <p class="category" id="chicken">Курица & Картофель</p>
            <p class="category" id="salads">Тортилья & Салаты</p>
            <p class="category" id="drinks">Напитки & Десерты</p>
        </div>
      `)
    }
}

export default MenuCategories