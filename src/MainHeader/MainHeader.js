import Component from "../Component";
import './MainHeader.css';
import { setSelectedTab } from "../storage";
import { setSelectedModalTab } from "../storage";
import { storage } from "../storage";

class MainHeader extends Component{
    constructor(onChange) {
        super();
        storage.addSubscriber('a', onChange);
    }
    render() {
        setSelectedTab("pancakes");
        console.log(storage.data.selectedTab);
        setSelectedModalTab("ready");
        console.log(storage.data.selectedModalTab);

        return (/*html*/`
            <h1 class="main-header">СДЕЛАЙТЕ ЗАКАЗ НАПРЯМУЮ ИЗ РЕСТОРАНА</h1>
      `)
    }
}

export default MainHeader