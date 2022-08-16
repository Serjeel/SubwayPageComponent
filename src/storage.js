class Storage { // Сделать самопальный redux
    constructor(data) {
        let handler = {
            set: this.addSubscriber.bind(this)
        }
        this.data = new Proxy(data, handler);
        this.subscribers = {};
    }

    addSubscriber(key, callback) {
        this.subscribers[key] = callback;
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

export function setSelectedCategory(selectedTab) {
    storage.data.selectedTab = selectedTab;
}
