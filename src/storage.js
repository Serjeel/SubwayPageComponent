class Storage { // Переписать всё под getElement и передавать в subscribers функции для ререндера
    // отдельных комплнентов под текстовый ключ. Ловить изменение с помощью прокси
    // и вызывать функцию ререндера того компонента, из которого меняется переменная.
    // Функции ререндера должны происходить здесь и храниться в подписчиках (по идее).
    // Компонентом component воспользоваться, когда нужно изменить стейт, использующийся
    // только в определённом компоненте
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
                console.log(key, this.subscribers[key][callback]);
                this.subscribers[key][callback]()
            }
        }
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