import axios from 'axios';
import Cookies from 'js-cookie';
import Component from "../Component";
import './ModalWindowAuthorization.css';

import { storage } from "../storage";
import { setModalWindowAuthorizationShow } from "../storage";
import { setSelectedAuthorizationTab } from "../storage";


class ModalWindowAuthorization extends Component {
    constructor(props) {
        super();

        this.inputsContent = {
            logUsername: "",
            logPassword: "",
            regUsername: "",
            regPassword: "",
            regRepPassword: ""
        }

        this.subscribers = ["modalWindowAuthorizationShow", "selectedAuthorizationTab"];
        for (let i in this.subscribers) {
            storage.addSubscriber(this.subscribers[i], props.rerender);
        }
    }

    enable() {
        const loginTabClick = () => {
            setSelectedAuthorizationTab("login")
        }

        const registrationTabClick = () => {
            setSelectedAuthorizationTab("registration")
        }

        const closeIconClick = () => {
            setModalWindowAuthorizationShow(false);
            setSelectedAuthorizationTab("login")
            for (let i in this.inputsContent) {
                this.inputsContent[i] = '';
            }
        }

        document.getElementById("login").addEventListener("click", loginTabClick)
        document.getElementById("registration").addEventListener("click", registrationTabClick)
        document.getElementsByClassName("close-icon")[0].addEventListener("click", closeIconClick)


        const logUserOnChange = () => {
            this.inputsContent.logUsername = document.getElementById("username").value;
        }

        const logPasswordOnChange = () => {
            this.inputsContent.logPassword = document.getElementById("password").value;
        }

        const regUserOnChange = () => {
            this.inputsContent.regUsername = document.getElementById("username").value;
        }

        const regPasswordOnChange = () => {
            this.inputsContent.regPassword = document.getElementById("password").value;
        }

        const regRepPasswordOnChange = () => {
            this.inputsContent.regRepPassword = document.getElementById("repPassword").value;
        }

        const logButtonClick = async () => {
            try {
                if (this.inputsContent.logUsername !== '' && this.inputsContent.logPassword !== '') {
                    await axios.post('http://localhost:8000/user/login', {
                        username: this.inputsContent.logUsername.toLowerCase(),
                        password: this.inputsContent.logPassword
                    }).then(res => {
                        if (res.data.success === true) {

                            setModalWindowAuthorizationShow(false)
                            Cookies.set('token', res.data.token);
                            Cookies.set('username', this.inputsContent.logUsername.toLowerCase());
                            for (let i in this.inputsContent) {
                                this.inputsContent[i] = '';
                            }
                            window.location.reload();
                        } else {
                            alert(res.data.message)
                        }
                    });
                } else {
                    alert('Введены не все значения!');
                }
            } catch {
                alert("Неверный логин или пароль")
            }
        }

        const regButtonClick = async () => {
            if (this.inputsContent.regUsername !== '' && this.inputsContent.regPassword !== '') {
                if (this.inputsContent.regPassword === this.inputsContent.regRepPassword) {
                    await axios.post('http://localhost:8000/user/register', {
                        username: this.inputsContent.regUsername.toLowerCase(),
                        password: this.inputsContent.regPassword
                    }).then(res => {
                        if (res.data.success === true) {

                            for (let i in this.inputsContent) {
                                this.inputsContent[i] = '';
                            }

                            setSelectedAuthorizationTab("login");
                            alert('Вы успешно зарегистрировались!');
                        } else {
                            alert(res.data.message)
                        }
                    });
                } else {
                    alert('Пароли не совпадают!')
                }
            } else {
                alert('Введены не все значения!');
            }
        }
        if (storage.data.selectedAuthorizationTab === "login") {
            document.getElementById("username").addEventListener("change", logUserOnChange)
            document.getElementById("password").addEventListener("change", logPasswordOnChange)
            document.getElementsByClassName("authorization-button")[0].addEventListener("click", logButtonClick)
        }
        if (storage.data.selectedAuthorizationTab === "registration") {
            document.getElementById("username").addEventListener("change", regUserOnChange)
            document.getElementById("password").addEventListener("change", regPasswordOnChange)
            document.getElementById("repPassword").addEventListener("change", regRepPasswordOnChange)
            document.getElementsByClassName("authorization-button")[0].addEventListener("click", regButtonClick)
        }
    }

    render() {
        const tabs = {
            login: "Вход",
            registration: "Регистрация"
        };
        let modalTabs = ``;

        for (let i in tabs) {
            modalTabs += `<p class="${storage.data.selectedAuthorizationTab === i ? "tab-active" : "tab"}"
                id="${i}">${tabs[i]}</p>`
        }

        const repeatPasswordInput = `<input class="authorization-input" type="password"
        id="repPassword" placeholder="Повторите пароль" value=${this.inputsContent.regRepPassword}>`

        return (/*html*/`
        <div class="modal-authorization-window">
            <div class="modal-authorization-content">
                <div class="modal-header-block">
                    <h3 class="modal-authorization-header">Subway</h3>
                    <img class="close-icon" src="i/close-icon.svg"/>
                </div>
                <div class="modal-tabs-authorization-block">
                    <div class="modal-authorization-tabs ">
                        ${modalTabs}
                    </div>
                </div>
                <div class="input-block">
                    <input class="authorization-input" id="username" type="text" placeholder=
                    "Имя пользователя" value=${storage.data.selectedAuthorizationTab === "login"
                ? this.inputsContent.logUsername : this.inputsContent.regUsername}>
                    <input class="authorization-input" type="password" id="password" placeholder=
                    "Пароль" value=${storage.data.selectedAuthorizationTab === "login"
                ? this.inputsContent.logPassword : this.inputsContent.regPassword} >
                    ${storage.data.selectedAuthorizationTab === "registration" ? repeatPasswordInput : ""}
                </div>
                <button class="authorization-button">${storage.data.selectedAuthorizationTab ===
                "login" ? "Войти" : "Зарегистрироваться"}</button>
            </div>
        </div>
        `)
    }
}

export default ModalWindowAuthorization