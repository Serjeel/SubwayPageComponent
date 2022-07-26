import ItemsBlock from "./ItemsBlock";

class MenuBlock {
    constructor() {
        this.array = [7, 8, 3]
        this.array.map((elem, i) => (console.log(elem, i)))
        this.x = [];
        const getData = async () => {
            await fetch("./src/data.json")
            .then(response => response.json())
            .then(data => {
                this.x = data;
                console.log(this.x);
            })
            console.log(this.x);
        }
        getData();
        console.log(this.x);
        // Додумать как использовать здесь fetch. Либо использовать async await, либо сначала
        // отрендерить пустные значения, а потом через Прокси поймать изменения и тогда уже отобразить
    }
    render() {
        setTimeout(() => {
            console.log(this.x);
        }, 10000);
        const itemsBlock = new ItemsBlock();
        return (/*html*/`
        <div class="menu-block">
            <div class="items-block">
            <button onclick="getData()">Кнопка</button>
            </div>
        </div>
      `)
    }
}

export default MenuBlock