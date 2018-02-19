var axios = require('axios')

const BASE_URL = 'http://testing.v2x.foresightauto.com/stock-exchange-service'
const actions = {
    portfolio: {
        path: '/portfolio'
    },
    querySearch: {
        path: '/market'
    },
    bodySearch: {
        path: '/market/search'
    },
    sellStock : {
        path: '/market/sell'
    },
    buyStock : {
        path: '/market/buy'
    },
    reset: {
        path: '/management'
    }
}



const getPortfolio = () => {
    return new Promise((resolve,reject) => {
    // put together the url
    const url = BASE_URL + actions.portfolio.path
    axios(url)
    .then((user) => {
        resolve(user.data)
    })
    .catch(error => {
        reject(error)
    })

    })



}

const getAllStocks = () => {
    return new Promise((resolve,reject) => {
        // put together the url
        const url = BASE_URL + actions.bodySearch.path

        var options = {
            method: 'POST',
            url: BASE_URL + actions.bodySearch.path,
            data: {"searchString": ""},
            headers: {"Accept": "*/*"}
        };
        axios(options)
        .then((stockList) => {
            resolve(stockList.data.stocks)
        })
        .catch(error => {
            reject(error)
        })
    
        })
}

const getStock = (symbol) => {
    return new Promise((resolve,reject) => {
        // put together the url
        const url = BASE_URL + actions.bodySearch.path

        var options = {
            method: 'POST',
            url: BASE_URL + actions.bodySearch.path,
            data: {"searchString": symbol},
            headers: {"Accept": "*/*"}
        };
        axios(options)
        .then((stockList) => {
            resolve(stockList.data.stocks)
        })
        .catch(error => {
            reject(error)
        })
    
        })
}

const sellStock = (symbol) => {
    return new Promise((resolve,reject) => {
        // put together the url
        // const url = BASE_URL + actions.sellStock.path

        var options = {
            method: 'POST',
            url: BASE_URL + actions.sellStock.path,
            data: {"stockSymbol": symbol},
            headers: {"Accept": "*/*"}
        };
        axios(options)
        .then((funds) => {
            resolve(funds)
        })
        .catch(error => {
            reject(error)
        })
    
        })
}

const buyStock = (stock,quantity) => {
    return new Promise((resolve,reject) => {
        // put together the url
        // const url = BASE_URL + actions.sellStock.path

        var options = {
            method: 'POST',
            url: BASE_URL + actions.buyStock.path,
            data: {
                "stockSymbol": stock.symbol,
                "stockQuantity": parseInt(quantity)
              },
            headers: {"Accept": "*/*"}
        };
        axios(options)
        .then((funds) => {
            resolve(funds)
        })
        .catch(error => {
            reject(error)
        })
    
        })
}

const resetUser = () => {
    return new Promise((resolve,reject) => {
        var options = {
            method: 'DELETE',
            url: BASE_URL + actions.reset.path,
            headers: {"Accept": "*/*"}
        };
        axios(options)
        .then((funds) => {
            resolve(funds)
        })
        .catch(error => {
            reject(error)
        })
    
        })
}



module.exports = {getPortfolio,getAllStocks, sellStock, buyStock, resetUser, getStock}