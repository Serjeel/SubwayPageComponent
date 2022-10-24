import Cookies from 'js-cookie';
import Decode from "jwt-decode"

class Storage {
    constructor(data) {
        let handler = {
            set: this.handleValueUpdated.bind(this)
        }
        this.data = new Proxy(data, handler);
        this.subscribers = {};
    }

    addSubscriber(key, callback) {
        if (!this.subscribers[key]) {
            this.subscribers[key] = [];
        }
        this.subscribers[key].push(callback);
    }

    handleValueUpdated(item, key, value) {
        item[key] = value;
        if (this.subscribers[key]) {
            for (let callback in this.subscribers[key]) {
                //console.log(key, this.subscribers[key][callback]);
                this.subscribers[key][callback]()
            }
        }
        return true
    }
}

export const storage = new Storage({
    username: Cookies.get('token') ? Decode(Cookies.get('token')).username : "",
    isAuthorized: false,
    selectedTab: "sandwiches",
    selectedModalTab: "sizes",
    selectedAuthorizationTab: "login",
    items: [],
    ingredients: [],
    countersValue: [],
    orderItems: [],
    totalPrice: 0,
    modalWindowAddShow: false,
    modalWindowEditShow: false,
    modalWindowAuthorizationShow: false,
    modalContent: {},
    sandwiches: [],
    tabReadyContent: {
        size: "15 См",
        bread: "Белый итальянский",
        vegetables: [],
        sauces: [],
        fillings: []
    },
    changeableOrderItem: {},
    previousValues: {
        sizes: 0,
        breads: 0
    }
});

export function setSelectedTab(selectedTab) {
    storage.data.selectedTab = selectedTab;
}

export function setSelectedAuthorizationTab(selectedAuthorizationTab) {
    storage.data.selectedAuthorizationTab = selectedAuthorizationTab;
}

export function setOrderItems(orderItems) {
    storage.data.orderItems = orderItems;
}

export function setTotalPrice(totalPrice) {
    storage.data.totalPrice = totalPrice;
}

export function setSandwiches(sandwiches) {
    storage.data.sandwiches = sandwiches;
}

export function setModalWindowAddShow(modalWindowAddShow) {
    storage.data.modalWindowAddShow = modalWindowAddShow;
}

export function setModalWindowEditShow(modalWindowEditShow) {
    storage.data.modalWindowEditShow = modalWindowEditShow;
}

export function setModalWindowAuthorizationShow(modalWindowAuthorizationShow) {
    storage.data.modalWindowAuthorizationShow = modalWindowAuthorizationShow;
}

export function setModalContent(modalContent) {
    storage.data.modalContent = modalContent;
}

export function setSelectedModalTab(selectedModalTab) {
    storage.data.selectedModalTab = selectedModalTab;
}

export function setTabReadyContent(tabReadyContent) {
    storage.data.tabReadyContent = tabReadyContent;
}

export function setChangeableOrderItem(changeableOrderItem) {
    storage.data.changeableOrderItem = changeableOrderItem;
}

export function setCountersValue(countersValue) {
    storage.data.countersValue = countersValue;
}

export function setPreviousValues(previousValues) {
    storage.data.previousValues = previousValues;
}


export function setItemsInfo(data) {
    data.menu.map(() => {
        storage.data.countersValue.push(1)
    });
    storage.data.items = data.menu;
    storage.data.ingredients = {
        sizes: data.sizes,
        breads: data.breads,
        vegetables: data.vegetables,
        sauces: data.sauces,
        fillings: data.fillings
    }
}

export function setAuthorization(data) {
    if (data.success) {
        storage.data.isAuthorized = data.success;
    } else {
        Cookies.remove("token");
    }
}

export function setAuthentification(data) {
    if (data.success === true) {
        setModalWindowAuthorizationShow(false)
        Cookies.set('token', data.token);
        window.location.reload();
    } else {
        alert(data.message)
    }
}

export function setRegistration(data) {
    if (data.success === true) {

        setSelectedAuthorizationTab("login");
        alert('Вы успешно зарегистрировались!');
    } else {
        alert(res.data.message)
    }
}

export function setOrders(data) {
    storage.data.orderItems = data;
    storage.data.sandwiches = data.filter(item => item.bread)
    let totalPrice = 0;
    data.map((item) => {
        totalPrice += item.price * item.amount;
    })
    setTotalPrice(totalPrice)
}

export function setCreateNewOrder(data, i) {
    let orderItems = data;

    setOrderItems(orderItems);
    setTotalPrice(storage.data.totalPrice + (storage.data.items[i].price
        * storage.data.countersValue[i]))
}

export function setCreateNewSandwichOrder(data) {

    let sandwiches = data.filter(item => item.bread);
    let orderItems = data;

    setOrderItems(orderItems);
    setSandwiches(sandwiches);

    setTotalPrice(storage.data.totalPrice + (storage.data.modalContent.price *
        storage.data.modalContent.amount));
    setTabReadyContent({
        size: "15 См",
        bread: "Белый итальянский",
        vegetables: [],
        sauces: [],
        fillings: []
    })
}

export function setChangeOrderInfo(data) {
    let sandwiches = storage.data.sandwiches;
    let orderItems = storage.data.orderItems;
    sandwiches[storage.data.changeableOrderItem.orderId] = {
        title: storage.data.modalContent.title,
        amount: storage.data.modalContent.amount,
        price: storage.data.modalContent.price,
        size: storage.data.tabReadyContent.size,
        bread: storage.data.tabReadyContent.bread,
        vegetables: storage.data.tabReadyContent.vegetables,
        sauces: storage.data.tabReadyContent.sauces,
        fillings: storage.data.tabReadyContent.fillings
    };
    setSandwiches(storage.data.sandwiches);

    let item = storage.data.orderItems.find(item => item.orderId ===
        storage.data.changeableOrderItem.orderId);
    let previousPrice = item.price * item.amount;

    orderItems.find(item => item.orderId === storage.data.changeableOrderItem.orderId).amount = storage.data.modalContent.amount;
    orderItems.find(item => item.orderId === storage.data.changeableOrderItem.orderId).price =
        storage.data.modalContent.price;

    setOrderItems(orderItems);

    setTotalPrice(storage.data.totalPrice + (storage.data.modalContent.price *
        storage.data.modalContent.amount) - previousPrice);
    setTabReadyContent({
        size: "15 См",
        bread: "Белый итальянский",
        vegetables: [],
        sauces: [],
        fillings: []
    })
}

export function setDeleteOrder(i) {
    setTotalPrice(storage.data.totalPrice - (storage.data.orderItems[i].price * 
        storage.data.orderItems[i].amount));

    const deletedSandwich = storage.data.sandwiches.find(arr => arr.orderId ===
        storage.data.orderItems[i].orderId);
    if (deletedSandwich) {
        const n = storage.data.sandwiches.findIndex(arr => arr.orderId ===
            deletedSandwich.orderId)
        storage.data.sandwiches.splice(n, 1);
    }
    storage.data.orderItems.splice(i, 1);
    
    setSandwiches(storage.data.sandwiches);
    setOrderItems(storage.data.orderItems);
}