import React, {Component} from 'react';
import connect from "react-redux/src/connect/connect";
import axios from 'axios';
import {API_BASE_URL} from '../../consts';

class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comment : this.props.comment,
            unresolved : this.props.unresolved
        }
    }

    handleResolve = () => {
        let config = {
            headers: {'Authorization': "Bearer " + this.props.token}
        };

        let request = {
            type : "Resolved",
            articleId : this.props.issue._id,
            commentId : this.state.comment._id
        };
        axios.post(API_BASE_URL + 'articles/resolve', request, config)
            .then(res => {
                let comment = this.state.comment;
                comment.resolved = true;
                this.setState({unresolved : true, comment : comment})
                this.props.dispatch({type: 'RESOLVE'});
            })
    };

    render() {
        let comment = this.props.comment;
        console.log(this.props.unresolved);
        return (
            <div className="col-md-12" style={{marginTop:20+'px', marginLeft:20+'px'}}>
                <div className="col-md-5 row">
                    <label className="col-md-9">{comment.content}</label>
                    <label className="col-md-5 username">{comment.authorId.username}</label>
                </div>
                <div className="col-md-1" hidden={this.props.unresolved}>
                    <button onClick={this.handleResolve}>R</button>
                </div>
                <div hidden={!comment.resolved}>
                    <span className="glyphicon glyphicon-ok"></span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    issue : state.singleStore,
    token : state.tokenStore.token
});

export default connect(mapStateToProps)(Comment)