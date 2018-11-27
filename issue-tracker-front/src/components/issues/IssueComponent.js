import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class IssueComponent extends Component {

    state = {
        issue: this.props.issue
    };

    render() {
        let issue = this.state.issue;
        return (
            <div className="col-md-12" style={{marginTop: 20 + 'px'}}>
                <div className="col-md-5 issueComponent">
                    <div className="iss-title">
                        <NavLink exact to={"/issues/" + issue._id}><label>{issue.title}</label></NavLink>
                    </div>
                    <div className="iss-content">
                        <label className="col-md-9">{issue.content}</label>
                        <label className="col-md-3"> {new Date(issue.createDate).toLocaleDateString("en-US")}</label>
                    </div>
                    <div className="iss-status">
                        <label className="">
                            {issue.status}
                        </label>
                    </div>
                    <br/>
                </div>
            </div>
        )
    }
}

export default IssueComponent;