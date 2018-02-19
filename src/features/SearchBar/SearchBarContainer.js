import React, {Component} from 'react'
import { Panel , Badge, Label,Glyphicon} from 'react-bootstrap'
import {Typeahead} from 'react-bootstrap-typeahead'; 
import { connect } from "react-redux";
import {bindActionCreators} from 'redux'

import {updateStocks ,updateUser, openPopUp, userReset} from './../../redux/actions/actions'
import UserUI from './../UserInfo/UserInfoContainer'
import api from './../../api'

import './style.css'

class SearchBarConrainer extends Component{
  
    constructor(props){
        super(props)
        this.state = {
            user: props.user || {},
            stocks: props.stocks || [],
            perchusPopUp: false,
            reserUser: props.actions.userReset,
            searchStocks: []
        }
        this.handleUserReset = this.handleUserReset.bind(this)
        this.createSearchItem = this.createSearchItem.bind(this)
        this.handleItemClick = this.handleItemClick.bind(this)
        this.filterStockArray = this.filterStockArray.bind(this)
    }

    handleUserReset = () => {

        api.resetUser()
            .then((data)=> {
            // fire redux action
            this.state.reserUser()

            
        })
    }

    handleItemClick = (clickedStock) => {
        // let redux know im intrested in this stock
        if(clickedStock.length > 0)
            this.props.actions.openPopUp(clickedStock)
        // update the state for perchuse-pop-up to be open with this stock
        // informetion and buy btn 
    
    }

    createSearchItem = (item) => {
        return(
            <div className='search_bar_item'>
                <Label bsStyle="info" >{item.symbol}</Label>
                 <span className='margin_left'>{item.name}</span> 
                 <Badge  className='margin_left' pullRight={true}>current price: {item.currentPrice}$</Badge>
            </div>
        )
    }

    filterStockArray = (userStocks) => {
        // clone arr to work on
        // let stockClone = Object.assign(allStocks[0]) 
        let stockClone = _.map(this.props.stocks[0], _.clone);
        // pull perchus stock from arr
         _.pullAllBy(stockClone,userStocks,'symbol')
        this.state.searchStocks = stockClone

    }   
    
    render() {   
        
        this.filterStockArray(this.props.user.myStocks)
        // filter the stocks array( pull perchused stocks)
        
        return (
            <Panel bsStyle="primary">
                <Panel.Body > 
                    <div className='search_bar_container'>
                        <div className='user_ui'>
                            <UserUI userRest={this.handleUserReset}/>
                        </div>
                        <div className='search_bar_component'>
                            <Typeahead
                                placeholder='Search for stock by : symbol,name or price'
                                labelKey={(option) => `${option.symbol} | name: ${option.name} current price: ${option.currentPrice}$`}
                                renderMenuItemChildren={(result, props) => this.createSearchItem(result)}
                                options={this.state.searchStocks}
                                onChange={this.handleItemClick}/>
                        </div>
                    </div>
                </Panel.Body>
            </Panel>
        );
    }
}
const mapStateToProps = state => {
    return { 
        stocks: state.stocks,
        user:state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return { 
        actions: {
            updateStocks: bindActionCreators(updateStocks, dispatch),
            updateUser: bindActionCreators(updateUser, dispatch),
            openPopUp: bindActionCreators(openPopUp , dispatch),
            userReset: bindActionCreators(userReset,dispatch)

        }
      };
  }
export default connect(mapStateToProps,mapDispatchToProps)(SearchBarConrainer);