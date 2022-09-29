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

    // Продумать логику изменения инпутов. Скорее всего навешать разные id на инпуты логина и пароля

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

        if (storage.data.selectedAuthorizationTab === "login") {

        }
        document.getElementById("username").addEventListener("change", logUserOnChange)
        document.getElementById("password").addEventListener("change", logPasswordOnChange)
        document.getElementById("username").addEventListener("change", regUserOnChange)
        document.getElementById("password").addEventListener("change", regPasswordOnChange)
        document.getElementById("repPassword").addEventListener("change", regRepPasswordOnChange)

        const logButtonClick = async () => {

        }

        const regButtonClick = async () => {
            if (!patient !== '' && doctor !== '' && date !== '' && complaints !== '') {
                await axios.post('http://localhost:8000/appointment/createAppointment', {
                    patient,
                    doctor,
                    date,
                    complaints,
                    userId
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

        const repeatPasswordInput = `<input class="authorization-input" type="password" id="repPassword" placeholder="Repeat Password">`

        return (/*html*/`
        <div class="modal-authorization-window">
            <div class="modal-authorization-content">
                <div class="modal-header-block">
                    <h3 class="modal-authorization-header">Subway</h3>
                    <img class="close-icon" src="i/close-icon.svg"/>
                </div>
                <div class="modal-tabs-authorization-block">
                    <div class="modal-tabs">
                        ${modalTabs}
                    </div>
                </div>
                <div class="input-block">
                    <input class="authorization-input" id="username" type="text" placeholder=
                    "Enter Email" value=${storage.data.selectedAuthorizationTab === "login"
                    ? this.inputsContent.logUsername : this.inputsContent.regUsername}>
                    <input class="authorization-input" type="password" id="password" placeholder=
                    "Enter Password" value=${storage.data.selectedAuthorizationTab === "login"
                    ? this.inputsContent.regPassword : this.inputsContent.regPassword} >
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