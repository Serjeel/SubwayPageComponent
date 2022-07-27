class Component {
    constructor(data = {}) {
        let handler = {
            set: this.handleDataChange.bind(this)
        }
        this.data = new Proxy(data, handler)
    }

    handleDataChange(item, property, value) {
        item[property] = value
        this.callback(this.data)
        return true
    }

    setRerender(callback) {
        this.callback = callback;
    }
}

export default Component