import Cookies from "js-cookie";

import Component from "../Component";
import './MainHeader.css';

import { storage } from "../storage";
import { setModalWindowAuthorizationShow } from "../storage";

class MainHeader extends Component {
    constructor(props) {
        super();

        this.subscribers = ["isAuthorized", "username"];
        for (let i in this.subscribers) {
            storage.addSubscriber(this.subscribers[i], props.rerender);
        }

    }

    enable() {
        if (storage.data.isAuthorized === true) {
            const loginButtonClick = () => {
                Cookies.remove("token");
                Cookies.remove("username");
                window.location.reload();
            }
            document.getElementsByClassName("login_and_register-button")[0].addEventListener("click", loginButtonClick)
        } else {
            const loginButtonClick = () => {
                console.log(storage.data.isAuthorized);
                setModalWindowAuthorizationShow(true)
            }
            document.getElementsByClassName("login_and_register-button")[0].addEventListener("click", loginButtonClick)
        }
    }

    render() {
        return (/*html*/`
        <div class="button-block">
            ${storage.data.isAuthorized ? `<p class="username">${storage.data.username}</p>
            <button class="login_and_register-button">Выход</button>`
                : `<button class="login_and_register-button">Войти/Зарегистироваться</button>`}
                </div>
            <h1 class="headline">СДЕЛАЙТЕ ЗАКАЗ НАПРЯМУЮ ИЗ РЕСТОРАНА</h1>
      `)
    }
}

export default MainHeader