import React, {Component} from 'react'
import api from './../../api'
import './style.css'
import {Modal, Button, FormControl, Well} from 'react-bootstrap'
import { connect } from "react-redux";
import {updateStocks, updateUser, closePopUp, buyAction} from './../../redux/actions/actions'
import { bindActionCreators } from 'redux'; 

class PerchaseContainer extends Component{
  
    constructor(props){
        super(props)
        this.state = {
            user: {},
            stcoks:[],
            show: props.show,
            quantity: 0
        }
        this.closePerchusModal = this.closePerchusModal.bind(this)
        this.handleBuyBtn = this.handleBuyBtn.bind(this)
        this.getStockData = this.getStockData.bind(this)
    }

    closePerchusModal = () => {
        this.props.actions.closePopUp()
    }
    handleBuyBtn = (stock) => {
        // chack for funds
        let {currentPrice} = this.props.stockBuyData 
        let {value} = this.state.quantity
        let {funds} = this.props.user

        if(currentPrice * value < funds){  
            api.buyStock(stock,this.state.quantity.value)
            .then(funds => {
                // fire redux action to let everyone know
                this.props.actions.buyAction(stock)
                this.props.actions.closePopUp()
            })
        }
        else{
            alert('not enugh funds')
        } 
    }

    getStockData = (stock) => {
        if(!stock)
            return ''

        stock = Object.assign({},stock)
        return this.props.stocks[0].filter(( stockFilter ) =>  {
            return stockFilter.symbol == stock.symbol;
        });
    }

    render() {
        
        // take a dfault value for init
        let stock = this.props.stockBuyData || ''
        // get stock live price (update every 5 sec from App.js)
        stock = this.getStockData(stock)
        // extract the array 
        stock = Object.assign({},stock[0])

        return (
            <Modal bsSize="small" show={this.props.perchusPopUp} onHide={this.closePerchusModal}>
                <Modal.Header closeButton>
                    <Modal.Title> {stock.symbol} | {stock.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Well>Current Price: {stock.currentPrice}</Well>
                    <FormControl
                        type="text"
                        placeholder="ENTER QUANTITY"
                        bsSize='lg'
                        inputRef={(ref) => {this.state.quantity = ref}}
                    />    
                </Modal.Body>
                <Modal.Footer>
                    <Button  bsStyle='success' onClick={() => this.handleBuyBtn(stock)}>Buy</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


function mapStateToProps(state) { 
    let action = state.action; 
    return {
        user:state.user,
        refresh: action === 'sellaction' || action === 'buyaction' ? true : false,
        perchusPopUp: state.perchusPopUp ,
        stocks:state.stocks,
        stockBuyData: state.stockBuyData       
      }; 
} 
  
function mapDispatchToProps(dispatch) {
    return { 
        actions: {
          updateStocks: bindActionCreators(updateStocks, dispatch),
          updateUser: bindActionCreators(updateUser, dispatch),
          closePopUp: bindActionCreators(closePopUp, dispatch),
          buyAction: bindActionCreators(buyAction, dispatch) 
        }
      };
}

export default connect(mapStateToProps,mapDispatchToProps)(PerchaseContainer);
