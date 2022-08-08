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
        console.log(this.rerender);
        return true
    }

    setRerender(callback) {
        this.rerender = callback;
    }
}

export default Component