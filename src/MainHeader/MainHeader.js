import Component from "../Component";
import './MainHeader.css';
import { setSelectedCategory } from "../storage";
import { storage } from "../storage";

class MainHeader extends Component{
    constructor() {
        super();
    }
    render() {
        console.log(storage);
        setSelectedCategory("pancakes")
        console.log(storage);
        return (/*html*/`
            <h1 class="main-header">СДЕЛАЙТЕ ЗАКАЗ НАПРЯМУЮ ИЗ РЕСТОРАНА</h1>
      `)
    }
}

export default MainHeader