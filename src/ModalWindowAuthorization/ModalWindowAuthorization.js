import Component from "../Component";
import './ModalWindowAuthorization.css';

import { storage } from "../storage";
import { setModalWindowAuthorizationShow} from "../storage";


class ModalWindowAuthorization extends Component {
    constructor() {
        super();
    }

    enable() {

    }

    render() {
        return (/*html*/`
        <div class="modal-window">
            <div class="modal-content">
                
            </div>
        </div>
        `)
    }
}

export default ModalWindowAuthorization