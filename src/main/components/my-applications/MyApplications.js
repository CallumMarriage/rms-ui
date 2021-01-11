import React from 'react';
import {connect} from "react-redux";

import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import {retrieveApplications} from "../../services/applicationService";

import Application from "./Application";
import Error from "../shared/Error";

class MyApplications extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            applications: [],
            loading: true,
            hasError: false
        };
    }

    async componentDidMount() {
        const userId = this.props.userId;
        const res = await retrieveApplications(userId);
        console.log(res)
        this.setState({potentialRoles: []})
        if (res == null) {
            this.setState({
                loading: false
            })
        } else if (res.hasError){
            this.setState({
                hasError: true,
                error: res.error
            })
        } else {
            this.setState({
                applications: res.applicationInfoList,
                loading: false,
                searching: false
            })
        }
    }

    render() {

        if (this.state.loading) {
            return (
                <Paper style={{width: '100%', minHeight: '350px', maxHeight: '400px', overflow: 'auto'}}>
                    <CircularProgress style={{marginTop: '20px'}}/>
                </Paper>
            )
        }

        if(this.state.hasError){
            return (
                <Error/>
            )
        }

        const applications = this.state.applications;

        return (
            <Paper>
                {
                    applications.map(application => {
                        return (
                            <div className={'row'} key={applications.applicationId}>
                                <Application projectId={application.projectId}
                                             applicationDate={application.applicationDate}
                                             applicationStatus={application.applicationStatus}
                                />
                            </div>
                        )
                    })
                }
            </Paper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
    };
}

export default connect(mapStateToProps)(MyApplications);