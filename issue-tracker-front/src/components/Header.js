import React, {Component} from 'react';
import AuthHeader from './auth/AuthHeader'
import {Link, NavLink} from 'react-router-dom'

class Header extends Component {

    render() {
        return (
            <div className="col-md-10 align-content-center">
                    <AuthHeader/>
                    <NavLink className="col-md-2 head-item" exact to="/issues/">All Issues</NavLink>
                    <NavLink className="col-md-2 head-item" exact to="/issues/new">Create Issue</NavLink>
            </div>
        )
    }

}

export default Header;