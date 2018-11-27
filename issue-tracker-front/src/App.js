import React, {Component} from 'react';
import './App.css';
import Main from './components/Main';
import Header from './components/Header';
import {connect} from 'react-redux';
import {BrowserRouter, Redirect, Switch} from 'react-router-dom';
import Cookies from "js-cookie";
import {AUTH_COOKIE} from "./consts";

class App extends Component {

    componentDidMount() {
        let auth = Cookies.get(AUTH_COOKIE);
        if (auth) {
            this.props.dispatch({type: 'LOG_IN', data: JSON.parse(auth)});
        } else {
            this.props.dispatch({type: 'LOG_OUT'});
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Header/>
                    <div className="col-sm-12">
                        <Main/>
                    </div>
                </div>
            </BrowserRouter>

        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.tokenStore
});

export default connect(mapStateToProps)(App);
