import Component from "../Component";
import './ModalWindowAuthorization.css';

import { storage } from "../storage";
import { setModalWindowAuthorizationShow } from "../storage";


class ModalWindowAuthorization extends Component {
    constructor() {
        super();
        
        this.tab = "login";
    }

    enable() {

    }

    render() {
        const tabs = {
            login: "Логин",
            registration: "Регистрация"
        };
        let modalTabs = ``;

        for (let i in tabs) {
            modalTabs += `<p class="${this.tab === i ? "tab-active" : "tab"}"
                id="${i}">${tabs[i]}</p>`
        }

        return (/*html*/`
        <div class="modal-authorization-window">
            <div class="modal-authorization-content">
                <div class="modal-header-block">
                    <h3 class="modal-header">Регистрация</h3>
                    <img class="close-icon" src="i/close-icon.svg"/>
                </div>
                <div class="modal-tabs-block">
                    <div class="modal-tabs">
                        ${modalTabs}
                    </div>
                </div>
            </div>
        </div>
        `)
    }
}

export default ModalWindowAuthorization