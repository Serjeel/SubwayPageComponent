module.exports.validateChange = (body) => {
    if (body.hasOwnProperty('orderId')
        && (body.hasOwnProperty('amount')
            || body.hasOwnProperty('price')
            || body.hasOwnProperty('sizes')
            || body.hasOwnProperty('breads')
            || body.hasOwnProperty('vegetables')
            || body.hasOwnProperty('sauces')
            || body.hasOwnProperty('fillings'))) {
        return true
    } else {
        return false
    }
}

module.exports.validateCreate = (body) => {
    if (body.hasOwnProperty('title')
        && body.hasOwnProperty('amount')
        && body.hasOwnProperty('username')
        && body.hasOwnProperty('vegetables')
        && body.hasOwnProperty('sauces')
        && body.hasOwnProperty('fillings')) {
        return true
    } else {
        return false
    }
}

module.exports.productAvailability = (body, products) => {
    if (products[0].menu.find(item => item.name === body.title)) {
        return true
    } else {
        return false
    }
}

module.exports.ingredientAvailability = (body, products) => {
    // Нужно доделать проверку наличия заказанных ингредиентов. Если в массивах все true, то всё 
    // хорошо. А если есть хотя бы одна false, то ошибка. Возможно стоит указать, какой именно
    // ингредиент остутствует и выдаёт false
    let sizesAvailability = false;
    let breadsAvailability = false;
    let vegetablesAvailability = [];
    let saucesAvailability = [];
    let fillingsAvailability = [];


    for (let i in products[0].sizes) {
        if (products[0].sizes[i].name === body.sizes) {
            sizesAvailability = true;
        }
    }

    for (let i in products[0].breads) {
        if (products[0].breads[i].name === body.breads) {
            breadsAvailability = true;
        }
    }

    for (let j in body.vegetables) {
        for (let i in products[0].vegetables) {
            if (products[0].vegetables[i].name === body.vegetables[j]) {
                vegetablesAvailability[j] = true;
                break;
            } else {
                vegetablesAvailability[j] = false;
            }
        }
    }

    for (let j in body.sauces) {
        for (let i in products[0].sauces) {
            if (products[0].sauces[i].name === body.sauces[j]) {
                saucesAvailability[j] = true;
                break;
            } else {
                saucesAvailability[j] = false;
            }
        }
    }

    for (let j in body.fillings) {
        for (let i in products[0].fillings) {
            if (products[0].fillings[i].name === body.fillings[j]) {
                fillingsAvailability[j] = true;
                break;
            } else {
                fillingsAvailability[j] = false;
            }
        }
    }

    if (sizesAvailability && breadsAvailability && !vegetablesAvailability.includes(false) &&
        !saucesAvailability.includes(false) && !fillingsAvailability.includes(false)) {
        return true
    } else {
        return false
    }
}

module.exports.calculatePrice = (body, products) => {
    let sizePrice = 0;
    let breadPrice = 0;
    let vegetablesPrice = 0;
    let saucesPrice = 0;
    let fillingsPrice = 0;
    for (let i in products[0].sizes) {
        if (products[0].sizes[i].name === body.sizes) {
            sizePrice = products[0].sizes[i].price
        }
    }

    for (let i in products[0].breads) {
        if (products[0].breads[i].name === body.breads) {
            breadPrice = products[0].breads[i].price
        }
    }

    for (let i in products[0].vegetables) {
        for (let j in body.vegetables) {
            if (products[0].vegetables[i].name === body.vegetables[j]) {
                vegetablesPrice += products[0].vegetables[i].price
            }
        }
    }

    for (let i in products[0].sauces) {
        for (let j in body.sauces) {
            if (products[0].sauces[i].name === body.sauces[j]) {
                saucesPrice += products[0].sauces[i].price
            }
        }
    }

    for (let i in products[0].fillings) {
        for (let j in body.fillings) {
            if (products[0].fillings[i].name === body.fillings[j]) {
                fillingsPrice += products[0].fillings[i].price
            }
        }
    }

    return products[0].menu.find(item => item.name === body.title).price +
        sizePrice + breadPrice + vegetablesPrice + saucesPrice + fillingsPrice
}