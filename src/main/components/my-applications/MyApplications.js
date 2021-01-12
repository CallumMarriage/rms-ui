import React from 'react';
import {connect} from "react-redux";

import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import {retrieveApplications} from "../../services/applicationService";

import Application from "./Application";
import Error from "../shared/Error";
import TitleContainer from "../shared/TitleContainer";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";

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
        const userId = this.props.user.id;
        const res = await retrieveApplications(userId);
        this.setState({potentialRoles: []})
        if (res == null) {
            this.setState({
                loading: false
            })
        } else if (res.hasError) {
            this.setState({
                hasError: true,
                error: res.error,
                loading: false
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

        return (
            <Grid container style={{marginBottom: '40px'}}>
                <TitleContainer title={'My Applications'}/>
                <Paper style={{width: '100%', minHeight: '350px', maxHeight: '400px', overflow: 'auto'}}>
                    {renderApplicationContainer(this.state.loading, this.state.hasError, this.state.applications)}
                </Paper>
            </Grid>

        )
    }
}

function renderApplicationContainer(loading, hasError, applications) {
    if (loading) {
        return (
            <CircularProgress style={{marginTop: '20px'}}/>
        )
    } else if (hasError) {
        return (
            <Error/>
        )
    } else if (applications.length === 0) {
        return (
            <div>
                <Typography variant={"h6"}>
                    You have no applications.
                </Typography>
            </div>
        )
    }
    {
        return (
            <div>
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
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
}

export default connect(mapStateToProps)(MyApplications);