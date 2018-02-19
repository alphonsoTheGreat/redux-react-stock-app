import React from 'react'
import { Button, Glyphicon, Well} from 'react-bootstrap'
import './style.css'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const PortfolioComponent = (props) => {
    let myStocks = props.stocks || []
    return (
        <div> 
            {
                myStocks.length > 0 ?
                    <BootstrapTable  data={myStocks}>
                        <TableHeaderColumn dataAlign='center' isKey={true} dataField='symbol' dataSort={ true }>Symbol</TableHeaderColumn>
                        <TableHeaderColumn dataAlign='center' dataField='name' dataSort={ true }>Name</TableHeaderColumn>
                        <TableHeaderColumn dataAlign='center' dataField='quantity' dataSort={ true }>Perchus Quantity</TableHeaderColumn>
                        <TableHeaderColumn dataAlign='center' dataField='purchasePrice' dataSort={ true }>Perchus Price</TableHeaderColumn>
                        <TableHeaderColumn dataAlign='center' dataField='currentPrice' dataSort={ true }>Curren Price</TableHeaderColumn>
                        <TableHeaderColumn dataAlign='center' dataField='win\loss' dataFormat={arrowFormat}>Win\Loss</TableHeaderColumn>
                        <TableHeaderColumn dataAlign='center' dataField='action' dataFormat={ actionFormat} formatExtraData={ props.handleSellBtn }>Win\Loss</TableHeaderColumn>
                    </BootstrapTable>
                :
                    <Well>You have no stocks, in order to buy one click on the search bar at the top of the screen</Well>
            }
        </div>  
    )
}

// return arrow up or down depend on stock profit
const arrowFormat = (row,cell) => {
    let winArrow = <Glyphicon glyph="arrow-up" className='arrow_up'/>
    let lossArrow = <Glyphicon glyph="arrow-down" className='arrow_down'/>
   return cell.purchasePrice - cell.currentPrice > 0 ? lossArrow : winArrow
}

// return sell btn with event
const actionFormat = (row,cell,handleSell) => {
    return <Button bsSize='xs' bsStyle='danger' onClick={()=> {handleSell(cell)}}>Sell</Button>
}



export default PortfolioComponent