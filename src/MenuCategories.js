import Component from "./Component"

class MenuCategories extends Component {
    constructor(props) {
        super({})
        //super.setRerender(this.rerender)
        this.tab = "";
        this.handleChangeSelectedTabClick = props.handleChangeSelectedTabClick;

        this.arrayId = ["pancakes", "shaurma", "sandwiches", "burgers", "chicken", "salads", "drinks"]
    }

    addListeners() {
        for (let i in this.arrayId) {
            document.getElementById(this.arrayId[i]).addEventListener('click', this.handleClickCategory.bind(this));
        }
    }

    handleClickCategory(target) {
        console.log("Нажато");
        console.log(this.data);
        console.log(target.target.id);
        this.tab = target.target.id;
        this.handleChangeSelectedTabClick(this.tab);
        // this.data.selectedTab = this.tab;
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