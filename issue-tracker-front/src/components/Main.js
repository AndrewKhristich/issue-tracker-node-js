import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import IssueForm from './single_issue/IssueForm'
import IssuesMain from './issues/IssuesMain'
import SingleIssueMain from './single_issue/SingleIssueMain'
import {BrowserRouter, Redirect, Switch} from 'react-router-dom';

class Main extends Component {
    state = {};

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/issues/" component={IssuesMain}/>
                    <Route exact path="/issues/new/" component={IssueForm}/>
                    <Route exact path="/issues/:id/" component={SingleIssueMain}/>
                </Switch>
            </div>
        )
    }
}

export default Main;