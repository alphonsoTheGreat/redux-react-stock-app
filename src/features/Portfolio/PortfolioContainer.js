import React, {Component} from 'react'
import api from './../../api'
import './style.css'
import Portfolio from './PortfolioComponent'
import {updateStocks ,updateUser, sellAction} from './../../redux/actions/actions'
import { connect } from "react-redux";
import {bindActionCreators} from 'redux'
import _ from 'lodash'
import {Modal, Button, Well} from 'react-bootstrap'

class PortfolioContainer extends Component{

    constructor(props){
        super(props)
        this.state = {
            user: {},
            stcoks:[],
            confirmModal: false
        }
        this.handleDataChange = this.handleDataChange.bind(this)
        this.handleSellBtn = this.handleSellBtn.bind(this)
        this.getReleventStocks = this.getReleventStocks.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.openModal = this.openModal.bind(this)
        
    }

    handleDataChange = () => {
        this.setState({
            stocks: store.getState().stocks[0],
            user:store.getState().user})
    }

    handleSellBtn = (stock) => {
        let {stockToSell} = this.state
        // http call for sale stock
        api.sellStock(stockToSell.symbol)
            .then(funds => {
                // fire action for sale stock
                this.props.actions.sellAction(stockToSell)
                this.state.stockToSell = {}
                this.handleClose()
            })
    
    }

    getReleventStocks = () => {
        let userStocks = this.props.user.myStocks || [];
        let allStocks = this.props.stocks[0] || [];
        
        let symbolVal = []
        userStocks.forEach(s => {
            symbolVal.push(s)
        })

        userStocks.forEach(v => {
            allStocks.forEach(s => {
                if(s.symbol === v.symbol)
                    v = Object.assign(v,s)

            })
        })
        return userStocks
    }

    handleClose = () => {
        this.setState({confirmModal: false})
    }

    openModal = (stockToSell) =>{
        this.setState({confirmModal:true,stockToSell})
    }

    render() {

        let protfolioStocks = this.getReleventStocks();
        let releventStocks = this.props.user.myStocks
        let {symbol} = this.state.stockToSell || ''

        return (
            <div className='portfolio_container'>
                <Portfolio stocks={releventStocks} handleSellBtn = {this.openModal}/>
                
                <Modal bsSize="small" show={this.state.confirmModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title> Stock Sell</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Well>are you sure you want to sale {symbol}</Well>   
                    </Modal.Body>
                    <Modal.Footer>
                    <Button  bsStyle='success' onClick={() => {this.handleSellBtn()}}>Confirm</Button>
            </Modal.Footer>
                </Modal>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return { 
        stocks: state.stocks,
        user:state.user,
        sellAction: state.action === 'sellaction' ? true : false
    };
};

const mapDispatchToProps = (dispatch) => {
    return { 
        actions: {
            updateStocks: bindActionCreators(updateStocks, dispatch),
            updateUser: bindActionCreators(updateUser, dispatch),
            sellAction: bindActionCreators(sellAction, dispatch)
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(PortfolioContainer);
