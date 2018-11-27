import React, {Component} from 'react'
import axios from 'axios'
import {API_BASE_URL} from '../../consts'
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: ''
        }
    }

    handleComment = () => {
        let config = {
            headers: {'Authorization': "Bearer " + this.props.token}
        };

        let request = {
            articleId: this.props.issue._id,
            comment: {
                content: this.state.content
            }
        };
        axios.post(API_BASE_URL + 'articles/comment/', request, config)
            .then(res => {
                this.setState({content : ''});
                this.props.dispatch({type : 'ADD_COMMENT', data : res.data});
            })
    };

    handleContentChange = (e) => {
        this.setState({content: e.target.value})
    };

    render() {
        return (
            <div className="col-md-5 text-right" style={{marginTop:30+'px', marginLeft:30+'px'}}>
                <div>
                    <textarea className="col-md-7 form-control" value={this.state.content} onChange={this.handleContentChange}/>
                </div>
                <button className="btn btn-link" disabled={!this.state.content} onClick={this.handleComment}>Comment</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.tokenStore.token
});

export default withRouter(connect(mapStateToProps)(CommentForm));