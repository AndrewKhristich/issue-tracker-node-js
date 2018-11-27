import React, {Component} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../consts';
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import IssueComponent from './IssueComponent';


class IssuesMain extends Component {

    componentWillMount() {
        axios.get(API_BASE_URL + 'articles/')
            .then(value => {
                this.props.dispatch({type: 'SET_ISSUES', data: value.data.content});
            })
    }

    listIssues() {
        return this.props.issues.map(value =>
            (
                <IssueComponent key={value._id} issue={value}/>
            )
        )
    }

    render() {
        return (
            <div className="col-md-12">
                <ul>
                    {this.listIssues()}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    issues: state.issueStore
});

export default withRouter(connect(mapStateToProps)(IssuesMain));