import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL, AUTH_COOKIE} from '../../consts';
import Cookies from 'js-cookie';

class AuthHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    componentDidMount() {
        let auth = Cookies.get(AUTH_COOKIE);
        if (auth) {
            this.props.dispatch({type: 'LOG_IN', data: JSON.parse(auth)});
        }
    }

    handleUsernameChange = (e) => {
        this.setState({username: e.target.value})
    };

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value})
    };

    handleAuth = (url) => {
        let username = this.state.username;
        let password = this.state.password;
        axios.post(url, {username: username, password: password}).then(res => {
            let auth = {};
            let data = res.data;
            auth.token = data.token;
            auth.isLogged = data.success;
            auth.username = data.user.username;
            this.props.dispatch({type: 'LOG_IN', data: auth});
        })
    };

    handleLogin = () => {
        this.handleAuth(API_BASE_URL + 'auth/login');
    };

    handleRegister = () => {
        this.handleAuth(API_BASE_URL + 'auth/register');
    };

    handleLogout = () => {
        window.location.reload();
        this.props.dispatch({type: 'LOG_OUT'});
    };

    render() {
        return (
            <div className="col-md-4">
                {this.props.auth.isLogged ?
                    <div>
                        <button className="col-md-3 btn btn-link" onClick={this.handleLogout}>Logout</button>
                        <label className="col-md-4 head-name">
                            {this.props.auth.username}
                        </label>
                    </div>
                    :
                    <div className="row">
                        <div className="row">
                            <input className="col-md-4" placeholder="Username" onChange={this.handleUsernameChange}/>
                            <input className="col-md-4" type="password" placeholder="Password" onChange={this.handlePasswordChange}/>
                        </div>
                        <div>
                            <button className="col-md-3 btn btn-link" onClick={this.handleLogin}>Sign in</button>
                            <button className="col-md-5 btn btn-link" onClick={this.handleRegister}>Sign up</button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    auth: state.tokenStore
});

export default withRouter(connect(mapStateToProps)(AuthHeader));