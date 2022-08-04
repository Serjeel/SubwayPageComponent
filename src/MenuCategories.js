import Component from "./Component"

class MenuCategories extends Component {
    constructor(props) {
        super()
        this.handleChangeSelectedTabClick = props.handleChangeSelectedTabClick;

        this.selectedTab = props.selectedTab

        this.categories =
        {
            pancakes: "Блины",
            shaurma: "Шаурма",
            sandwiches: "Сэндвичи",
            burgers: "Бургеры",
            chicken: "Курица & Картофель",
            salads: "Тортилья & Салаты",
            drinks: "Напитки & Десерты"
        }
    }

        enable() {
            for (let i in this.categories) {
                const category = document.getElementById(i);
                category.addEventListener('click', this.handleClickCategory.bind(this));
            }
        }

        handleClickCategory(target) {
            console.log("Нажато");
            if (this.selectedTab !== target.target.id) {
                this.handleChangeSelectedTabClick(target.target.id);
            }
        }

        render() {
            let menuItems = ``;
            for (let i in this.categories) {
                menuItems += `<p class="${this.selectedTab === i ? "category-active" : "category"}"
                id="${i}">${this.categories[i]}</p>` 
            }
           

            return (/*html*/`
        <div class="menu-categories">
            ${menuItems}
        </div>
      `)
        }
    }

export default MenuCategories