import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import IssueComponent from "../issues/IssueComponent";
import axios from 'axios';
import {API_BASE_URL, AUTH_COOKIE} from '../../consts';
import Cookies from 'js-cookie';
import Comment from './Comment'
import CommentForm from './CommentForm'

class SingleIssueMain extends Component {
    state = {
        id: this.props.match.params.id,
        isAuthor: false,
    };

    componentDidMount() {
        let config = {};
        let authCookie = JSON.parse(Cookies.get(AUTH_COOKIE));
        console.log(authCookie)
        if (authCookie.token) {
            config = {
                headers: {'Authorization': "Bearer " + authCookie.token}
            };
        }
        axios.get(API_BASE_URL + 'articles/' + this.state.id, config)
            .then(res => {
                let data = res.data;
                data.article.comments.reverse();
                this.setState({isAuthor:data.isAuthor})
                this.props.dispatch({type: 'SET_ISSUE', data: data.article})
            })
            .catch(err => {
                console.log(err);
            });
    }

    listComments = () => {
        let isAuthor = this.state.isAuthor;
        let issue = this.props.issue;
        console.log(isAuthor);
        let unresolved = issue.status!=='Created';
        return issue.comments.map(comment => <Comment key={comment._id} unresolved={unresolved && isAuthor} comment={comment}/>)
    };

    render() {
        let issue = this.props.issue;
        let hasComment = issue.comments && issue.comments.length > 0;
        return (
            <div>
                <div>
                    <IssueComponent key={issue._id} issue={issue}/>
                </div>
                <div style={{marginTop: 30 + 'px'}} hidden={!this.props.auth.isLogged}>
                    <CommentForm issue={issue}/>
                </div>
                <div style={{marginTop: 30 + 'px'}} hidden={this.props.auth.isLogged}>
                    <label>
                        Please sign in to leave comments
                    </label>
                </div>
                <div>
                    {hasComment ? this.listComments() : <div style={{fontSize: 20 + 'px'}}>No comments found</div>}
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    issues: state.issueStore,
    auth: state.tokenStore,
    issue: state.singleStore
});

export default withRouter(connect(mapStateToProps)(SingleIssueMain));