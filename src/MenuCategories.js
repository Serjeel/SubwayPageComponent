import Component from "./Component"

class MenuCategories extends Component {
    constructor(props) {
        const data = {
            selectedTab: props.selectedTab
        }
        super(data)
        super.setRerender(this.rerender)
        this.tab = "";
    }

    addListeners() { // Здесь вместо id взять по классу и пройтись циклом
        document.getElementById('pancakes').addEventListener('click', this.categoryClick.bind(this));
        document.getElementById('shaurma').addEventListener('click', this.categoryClick.bind(this));
        document.getElementById('sandwiches').addEventListener('click', this.categoryClick.bind(this));
        document.getElementById('burgers').addEventListener('click', this.categoryClick.bind(this));
        document.getElementById('chicken').addEventListener('click', this.categoryClick.bind(this));
        document.getElementById('salads').addEventListener('click', this.categoryClick.bind(this));
        document.getElementById('drinks').addEventListener('click', this.categoryClick.bind(this));
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