const action_types = {
  UPDATE_STOCKS:{
    string: 'UPDATE_STOCKS'
  },
  UPDATE_USER: {
    string:'UPDATE_USER'
  },
  SELL_ACTION:{
    string:'SELL_ACTION'
  },
  BUY_ACTION:{
    string:'BUY_ACTION'
  },
  OPEN_POP_UP_ACTION:{
    string:'OPEN_POP_UP_ACTION'
  },
  CLOSE_POP_UP_ACTION:{
    string:'CLOSE_POP_UP_ACTION'
  },
  USER_RESET: {
    string:'USER_RESET'
  }
}

const updateStocks = stocks => ({
    type: action_types.UPDATE_STOCKS.string,
    payload: stocks
  })

  const updateUser = user => ({
    type: action_types.UPDATE_USER.string,
    payload: user
  })

  const sellAction = stock => ({
    type:action_types.SELL_ACTION.string,
    payload: stock
  }) 

  const buyAction = stock => ({
    type:action_types.BUY_ACTION.string,
    payload: stock
  })   

  const openPopUp = (stock) => ({
    type:action_types.OPEN_POP_UP_ACTION.string,
    payload: stock
  })

  const closePopUp = () => ({
    type:action_types.CLOSE_POP_UP_ACTION.string,
    payload: ''
  })

  const userReset = () => ({
    type:action_types.USER_RESET.string,
    payload: ''
  })


  export { updateStocks ,updateUser, sellAction, openPopUp, closePopUp, buyAction, userReset};