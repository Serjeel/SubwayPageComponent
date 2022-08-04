class Component {
    constructor(data = {}) {
        let handler = {
            set: this.handleDataChange.bind(this)
        }
        this.data = new Proxy(data, handler)
    }

    handleDataChange(item, property, value) {
        item[property] = value
        this.rerender(this.data)
        return true
    }

    setRerender(callback) {
        this.rerender = callback;
        console.log(callback.name);
    }
}

export default Component