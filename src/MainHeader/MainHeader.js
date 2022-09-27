import Component from "../Component";
import './MainHeader.css';

import { storage } from "../storage";
import { setModalWindowAuthorizationShow} from "../storage";

class MainHeader extends Component{
    constructor() {
        super();
        this.subscribers = ["countersValue", "items", "selectedTab"];
        for (let i in this.subscribers) {
            storage.addSubscriber("modalWindowAuthorizationShow", );
        }
    }

    enable() {
        document.getElementsByClassName("modal-block")[0].addEventListener("click", setModalWindowAuthorizationShow(true))
    }
    
    render() {
        return (/*html*/`
            <div class="header">
            <button class="login_and_register-button">Войти/Зарегистироваться</button>
            </div>
            <h1 class="headline">СДЕЛАЙТЕ ЗАКАЗ НАПРЯМУЮ ИЗ РЕСТОРАНА</h1>
      `)
    }
}

export default MainHeader