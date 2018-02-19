import React, {Component} from 'react'
import {Modal} from 'react-bootstrap'
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

import UserData from './features/UserInfo/UserInfoContainer'
import BuyPopUp from './features/PurchasePopUp/PurchaseContainer'
import Portfolio from './features/Portfolio/PortfolioContainer'
import SearchBar from './features/SearchBar/SearchBarContainer'
import store from './redux/store'
import {updateStocks, updateUser, closePopUp, userReset} from './redux/actions/actions'
import utils from './utils/utils'
import api from './api'


/**
 * App.js
 * fetch data (user,stocks) from server.
 * after data recived it will update redux store for the new data.
 * Portfolio & SearchBar components are listening to the stocks & user objects in store
 */

class App extends Component{

  constructor(props){
    super(props)
    this.state = {
      perchusPopUp: false
    }

    this.openPerchusModal = this.openPerchusModal.bind(this)
    this.closePerchusModal = this.closePerchusModal.bind(this)
    this.updateStocksApi = this.updateStocksApi.bind(this)
    this.getUserPortfolio = this.getUserPortfolio.bind(this)
    // this.updateData = this.updateData.bind(this)
  }

  componentDidMount(){
    // fetch stocks from server
    this.updateStocksApi()
    // fetch user from server
    this.getUserPortfolio()
    // start the timer for updating stocks
    let timer = setInterval(this.updateStocksApi, 5000);
  }
  // fetch server data for [USER] and update redux store
  getUserPortfolio = () =>{
    api.getPortfolio()
      .then(user => {
    
        store.dispatch(updateUser(user))
      })
  }

  // fetch server data fro stocks & update redux store
  updateStocksApi = () => {
    api.getAllStocks()
      .then(stocks => {
        store.dispatch( updateStocks(stocks))
      })
      .catch(e =>console.error(e))   
  }

 

  openPerchusModal = () =>{

    this.setState({perchusPopUp:true})
  }
  closePerchusModal = () =>{
    this.props.actions.closePopUp()
    this.setState({perchusPopUp:false})
  }

 


  render() { 
    if(this.props.userReset){
      // fetch stocks from server
    this.updateStocksApi()
    // fetch user from server
    this.getUserPortfolio()
    }

    // true only if redux sell action was fired
    this.props.refresh ? this.getUserPortfolio() : null
    
    return (
      <div className='app'>
        <div className='search_bar_app' >
          <SearchBar/>
        </div>
        <div className='portfolio_div' >
          <Portfolio/>
        </div>

          <BuyPopUp show={this.props.perchusPopUp}  />
      </div>
    );
  }
}

function mapStateToProps(state) {
  let action = state.action; 
  return {
      user:state.user,
      refresh: action === 'sellaction' || action === 'buyaction'  ? true : false,
      perchusPopUp: state.perchusPopUp,
      stockBuyData: state.stockBuyData,
      userReset: state.userReset  
    }; 
} 

function mapDispatchToProps(dispatch) {
  return { 
      actions: {
        updateStocks: bindActionCreators(updateStocks, dispatch),
        updateUser: bindActionCreators(updateUser, dispatch),
        closePopUp: bindActionCreators(closePopUp, dispatch)
      }
    };
} 

export default connect( 
  mapStateToProps, 
    mapDispatchToProps 
)(App);