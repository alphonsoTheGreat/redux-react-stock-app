const initialState = {
  stocks: [[{
    currentPrice:0,
    name:"name",
    startOfCommerce:"start",
    symbol:"symbole"
  }]],
  user:{},
  perchusPopUp: false,
  refresh:false
};

export default function(state=initialState, action) {
  switch (action.type) {
    case 'UPDATE_STOCKS': {
      let updatedObj = {
        action:'stocksupdate',
        user:state.user,
        stocks: [action.payload],
        stockBuyData: state.stockBuyData,
        perchusPopUp: state.perchusPopUp || false,
        userReset:false
      }
      return updatedObj
    }
    case 'UPDATE_USER': {
      let updatedObj = {
        action:'userupdate',
        user:action.payload,
        stocks: state.stocks,
        stockBuyData: state.stockBuyData,
        perchusPopUp: state.perchusPopUp || false,
        userReset:false
      }
      return updatedObj
    }
    case 'SELL_ACTION': {
      let updatedObj = {
        action:'sellaction',
        user:state.user,
        stocks: state.stocks,
        stockBuyData: state.stockBuyData,
        perchusPopUp: state.perchusPopUp || false,
        userReset:false
      }
      return updatedObj
    }
    case 'BUY_ACTION': {
      let updatedObj = {
        action:'buyaction',
        user:state.user,
        stocks: state.stocks,
        stockBuyData: state.stockBuyData,
        perchusPopUp: state.perchusPopUp || false,
        userReset:false
      }
      return updatedObj
    }
    case 'OPEN_POP_UP_ACTION': {
      let updatedObj = {
        user:state.user,
        stocks: state.stocks,
        perchusPopUp: true,
        stockBuyData: action.payload[0],
        userReset:false
      }
      return updatedObj
    }
    case 'CLOSE_POP_UP_ACTION': {
      let updatedObj = {
        user:state.user,
        stocks: state.stocks,
        perchusPopUp: false,
        userReset:false
      }
      return updatedObj
    }
    case 'USER_RESET': {
      let updatedObj = {
        user:state.user,
        stocks: state.stocks,
        perchusPopUp: false,
        userReset:true
      }
      return updatedObj
    }
    default:
      return state;
  }
}