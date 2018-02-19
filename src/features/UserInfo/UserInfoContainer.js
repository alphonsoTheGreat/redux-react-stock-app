import React, {Component} from 'react'
import api from './../../api'
import UserUI from './UserInfoComponent'
import './style.css'
import { connect } from "react-redux";

class UserInfoContainer extends Component{
  
    constructor(props){
        super(props)
        this.state = {
            user: props.user || {},
            resetUserParent: props.userRest 
        }

    }

    render() {
        return (
            <div className='user_info_container'>
                <UserUI resetBtn={this.state.resetUserParent} user={this.props.user} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
        user:state.user 
    };
};

export default connect(mapStateToProps)(UserInfoContainer);
// export default UserInfoContainer