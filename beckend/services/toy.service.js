const fs = require('fs')

module.exports = {
    query,
    getById,
    remove,
    save,
}
const gToys = require('../data/toy.json');

function query(filterBy) {
    var toys = gToys;
    if (filterBy.name) {
        const regex = new RegExp(filterBy.name, 'i');
        toys = toys.filter(toy => regex.test(toy.name))
    }
    if (filterBy.price) {
        toys = toys.filter(toy => toy.price >= filterBy.price)
    }
    if (filterBy.inStock) {
        toys = toys.filter(toy => {
            if (filterBy.inStock === 'inStock') return toy.inStock
            if (filterBy.inStock === 'soldOut') return !toy.inStock
        })
    }
    if (filterBy.type === 'adult') {
        toys = toys.filter(toy => toy.type === 'adult')
    }
    if (filterBy.sortBy === 'name') {
        toys.sort((toy1, toy2) => {
            return toy1.name.toUpperCase().charAt(0) < toy2.name.toUpperCase().charAt(0) ? -1 : 1
        })
    }
    if (filterBy.sortBy === 'price') {
        toys.sort((toy1, toy2) => {
            return toy1.price - toy2.price;
        })
    }
    if (filterBy.sortBy === 'created') {

        toys.sort((toy1, toy2) => {
            return toy1.createdAt - toy2.createdAt;
        })
    }
    toys.sums = getToysPerPrice(toys);
    console.log('toys',toys);
    
    return Promise.resolve(toys);
}

function save(toy) {
    if (toy._id) {
        const idx = gToys.findIndex(currToy => currToy._id === toy._id)
        gToys[idx] = toy;
    } else {
        toy = getNewToy(toy);
        gToys.push(toy)
    }
    return _saveToysToFile()
        .then(() => {
            return toy;
        })
}

function getById(toyId) {
    const toy = gToys.find(toy => toy._id === toyId)
    toy.review = 'The best toy!'
    return Promise.resolve(toy)
}
function remove(toyId) {
    const idx = gToys.findIndex(toy => toy._id === toyId)
    gToys.splice(idx, 1)
    return _saveToysToFile()
}

function _saveToysToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/toy.json', JSON.stringify(gToys, null, 2), (err) => {
            if (err) return reject(err)
            resolve();
        })
    })
}

function getToysPerPrice(toys) {
    adultToys = toys.filter(toy => (toy.type === 'adult'))
    adultToys = adultToys.map(toy => toy.price)
    let sumAdult = adultToys.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue
    }, 0)

    sumAdult /= adultToys.length;

    childrenToys = toys.filter(toy => (toy.type === 'children'))
    childrenToys = childrenToys.map(toy => toy.price)
    let sumChildren = childrenToys.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue
    }, 0)
    sumChildren /= childrenToys.length;
    return {sumAdult, sumChildren};
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getNewToy(toy) {
    return {
        _id: _makeId(),
        name: toy.name,
        price: toy.price,
        createdAt: Date.now(),
        inStock: toy.inStock,
        review: ''
    }
}
