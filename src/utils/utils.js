import api from './../api'

const stocks_update_interval = () => {
     setInterval(() => {
        return new Promise((res,rej) => {
            api.getAllStocks()
            .then(stocks => {
                res(stocks)
            })
            .catch(e => rej(e))
        })   
    }, 5000);
}

module.exports = {stocks_update_interval}