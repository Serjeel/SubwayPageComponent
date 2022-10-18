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
    let bredsAvailability = false;
    let vegetablesAvailability = [];
    for (let i in body.vegetables) {
        vegetablesAvailability.push(false)
    }
    let saucesAvailability = [];
    for (let i in body.sauces) {
        saucesAvailability.push(false)
    }
    let fillingsAvailability = [];
    for (let i in body.fillings) {
        fillingsAvailability.push(false)
    }

    for (let i in products[0].vegetables) {
        for (let j in body.vegetables) {
            if (products[0].vegetables[i].name === body.vegetables[j]) {
                vegetablesAvailability[j] = true;
            }
        }
    }

    for (let i in products[0].sauces) {
        for (let j in body.sauces) {
            console.log(products[0].sauces[i].name, body.sauces[j])
            if (products[0].sauces[i].name === body.sauces[j]) {
                saucesAvailability[j] = true;
            }
        }
    }

    for (let i in products[0].fillings) {
        for (let j in body.fillings) {
            if (products[0].fillings[i].name === body.fillings[j]) {
                fillingsAvailability[j] = true;
            }
        }
    }

    console.log("vegetables", vegetablesAvailability);
    console.log("sauces", saucesAvailability);
    console.log("fillings", fillingsAvailability);
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
            console.log(products[0].sauces[i].name, body.sauces[j])
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