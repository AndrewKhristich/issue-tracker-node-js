import React, {Component} from 'react';
import connect from "react-redux/src/connect/connect";
import axios from 'axios';
import {API_BASE_URL} from '../../consts';
import {withRouter} from "react-router-dom";

class IssueForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: ''
        }
    }

    handleTitle = (e) => {
        this.setState({title: e.target.value})
    };

    handleContent = (e) => {
        this.setState({content: e.target.value})
    };

    handleCreate = () => {
        let config = {
            headers: {'Authorization': "Bearer " + this.props.auth.token}
        };
        axios.post(API_BASE_URL + 'articles/', {title: this.state.title, content: this.state.content}, config)
            .then(res => {
                this.props.history.push('/issues/')
            })
    };

    render() {
        let logged = this.props.auth.isLogged;
        return (
            <div style={{marginLeft: 30 + 'px', marginTop: 30 + 'px'}}>
                {logged ?
                    <div className="col-md-4">
                        <div>
                            <label className="custom-control-label">Title</label> <br/>
                            <input className="form-control" value={this.state.title} onChange={this.handleTitle}/>
                        </div>
                        <div>
                            <label className="custom-control-label">Content</label> <br/>
                            <input className="form-control" value={this.state.content} onChange={this.handleContent}/>
                        </div>
                        <div style={{marginTop: 10 + 'px'}}>
                            <button type="submit" className="brn btn-primary" onClick={this.handleCreate} disabled={this.props.isLogged}>Submit</button>
                        </div>
                    </div> :
                    <div style={{marginTop: 30 + 'px'}}>
                        <label style={{fontSize: 20 + 'px'}}>
                            Please Sign in to leave an issue
                        </label>
                    </div>}

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.tokenStore
});

export default withRouter(connect(mapStateToProps)(IssueForm))