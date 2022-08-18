class Storage { // Переписать всё под getElement и передавать в subscribers функции для ререндера
                // отдельных комплнентов под текстовый ключ. Ловить изменение с помощью прокси
                // и вызывать функцию ререндера того компонента, из которого меняется переменная
    constructor(data) {
        let handler = {
            set: this.handleValueUpdated.bind(this)
        }
        this.data = new Proxy(data, handler);
        this.subscribers = {};
    }

    // Сделать условие, что нужно добавить, если такого подписчика ещё нет
    addSubscriber(key, callback) {
        this.subscribers[key] = callback;
    }

    handleValueUpdated(item, key, callback) {
        console.log(item, key, callback);
        return true
    }
}

export const storage = new Storage({
    selectedTab: "sandwiches",
    selectedModalTab: "sizes",
    items: [],
    ingredients: [],
    countersValue: [],
    orderItems: [],
    totalPrice: 0,
    modalWindowAddShow: false,
    modalWindowEditShow: false,
    modalContent: {},
    sandwiches: [],
    changeableOrderItem: {
        orderId: 0,
        sandwichId: 0
    },
    tabReadyContent: {
        sizes: "15 См",
        breads: "Белый итальянский",
        vegetables: [],
        sauces: [],
        fillings: []
    },
    previousValues: {
        sizes: 0,
        breads: 0
    }
});

export function setSelectedTab(selectedTab) {
    storage.data.selectedTab = selectedTab;
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