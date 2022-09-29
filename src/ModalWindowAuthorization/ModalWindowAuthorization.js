import axios from 'axios';
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
        }

        document.getElementById("login").addEventListener("click", loginTabClick)
        document.getElementById("registration").addEventListener("click", registrationTabClick)
        document.getElementsByClassName("close-icon")[0].addEventListener("click", closeIconClick)


        const logUserOnChange = () => {
            this.inputsContent.logUsername = document.getElementById("username").value;
            console.log(this.inputsContent);
        }

        const logPasswordOnChange = () => {
            this.inputsContent.logPassword = document.getElementById("password").value;
            console.log(this.inputsContent);
        }

        const regUserOnChange = () => {
            this.inputsContent.regUsername = document.getElementById("username").value;
            console.log(this.inputsContent);
        }

        const regPasswordOnChange = () => {
            this.inputsContent.regPassword = document.getElementById("password").value;
            console.log(this.inputsContent);
        }

        const regRepPasswordOnChange = () => {
            this.inputsContent.regRepPassword = document.getElementById("repPassword").value;
            console.log(this.inputsContent);
        }

        if (storage.data.selectedAuthorizationTab === "login") {
            document.getElementById("username").addEventListener("change", logUserOnChange)
            document.getElementById("password").addEventListener("change", logPasswordOnChange)
        }
        if (storage.data.selectedAuthorizationTab === "registration") {
            document.getElementById("username").addEventListener("change", regUserOnChange)
            document.getElementById("password").addEventListener("change", regPasswordOnChange)
            document.getElementById("repPassword").addEventListener("change", regRepPasswordOnChange)
        }

        const logButtonClick = async () => {

        }

        // А теперь запросы на сервер

        const regButtonClick = async () => {
            if (username !== '' && password !== '') {
                await axios.post('http://localhost:8000/appointment/createAppointment', {
                    username,
                    password
                }).then(res => {
                    setDefaultAppointments(res.data.data);
                    setPatient('');
                    setDoctor('');
                    setDate('');
                    setComplaints('');
                });
            } else {
                alert('Введены не все значения');
            }

            //addEventListener
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