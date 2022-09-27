import Component from "../Component";
import './MainHeader.css';

class MainHeader extends Component{
    constructor(onChange) {
        super();
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