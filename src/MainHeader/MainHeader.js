import Component from "../Component";
import './MainHeader.css';

import { storage } from "../storage";
import { setModalWindowAuthorizationShow } from "../storage";

class MainHeader extends Component {
    constructor(props) {
        super();
        storage.addSubscriber("modalWindowAuthorizationShow", props.rerender);
    }

    enable() {
        const loginButtonClick = () => {
            setModalWindowAuthorizationShow(true)
        }

        document.getElementsByClassName("login_and_register-button")[0].addEventListener("click", setModalWindowAuthorizationShow(true))
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