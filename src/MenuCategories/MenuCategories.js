import Component from "../Component";
import './MenuCategories.css';

import { storage } from "../storage";
import { setSelectedTab } from "../storage";

class MenuCategories extends Component {
    constructor(props) {
        super()

        console.log(props.rerender);
        storage.addSubscriber("selectedTab", props.rerender);

        this.categories = {
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
        if (storage.data.selectedTab !== target.target.id) {
            setSelectedTab(target.target.id);
        }
    }

    render() {
        let menuItems = ``;
        for (let i in this.categories) {
            menuItems += `<p class="${storage.data.selectedTab === i ? "category-active" : "category"}"
                id="${i}">${this.categories[i]}</p>`
        }
        return (/*html*/`
        ${menuItems}
      `)
    }
}

export default MenuCategories