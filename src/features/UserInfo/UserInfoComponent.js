import React from 'react'

import {Panel,Glyphicon, Tooltip, OverlayTrigger} from 'react-bootstrap'

const UserInfoComponent = (props) => {
    let {username,funds} = props.user
    
    return (
        <Panel bsStyle="primary">
            <Panel.Heading>
            <Glyphicon glyph="user" /> <Panel.Title >{username}</Panel.Title>
            </Panel.Heading>
            <Panel.Body>{funds}$ 
                <OverlayTrigger placement="top" overlay={tooltip}>
                    <Glyphicon glyph="refresh" onClick={props.resetBtn}/>
                </OverlayTrigger>
            </Panel.Body>
           
        </Panel>

    )
}

const tooltip = (
    <Tooltip id="tooltip">
      <strong>Click to RESET account</strong>
    </Tooltip>
  );

export default UserInfoComponent