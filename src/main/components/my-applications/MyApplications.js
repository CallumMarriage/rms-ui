import React from 'react';
import {connect} from "react-redux";

import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import {retrieveApplications} from "../../services/applicationService";

import Error from "../shared/Error";
import TitleContainer from "../shared/TitleContainer";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {AccountLink, ProjectLink, RoleLink} from "../shared/Links";


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

    return (
        <Paper style={{margin: '10px'}}>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Application ID</TableCell>
                            <TableCell align="right">Application date</TableCell>
                            <TableCell align="right">Role ID</TableCell>
                            <TableCell align="right">Project code</TableCell>
                            <TableCell align="right">Account number</TableCell>
                            <TableCell align="right">Application Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applications.map((application) => (
                            <TableRow key={application.applicationId}>
                                <TableCell component="th" scope="row">
                                    {application.applicationId}
                                </TableCell>
                                <TableCell align="right">
                                    {application.applicationDate}
                                </TableCell>
                                <TableCell align="right">
                                    {
                                        RoleLink({
                                            accountNumber: application.accountId,
                                            projectCode: application.projectId,
                                            id: application.roleId,
                                            dataMissing: true
                                        }, RoleItem)
                                    }
                                </TableCell>
                                <TableCell align="right">
                                    {
                                        ProjectLink({
                                            accountNumber: application.accountId,
                                            projectCode: application.projectId
                                        }, ProjectItem)
                                    }
                                </TableCell>
                                <TableCell align="right">
                                    {
                                        AccountLink({
                                            accountNumber: application.accountId
                                        }, AccountItem)
                                    }
                                </TableCell>
                                <TableCell align="right">{application.applicationStatus}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

function ProjectItem(props) {
    return (
        <div>
            {props.props.projectCode}
        </div>
    )
}

function AccountItem(props) {
    return (
        <div>
            {props.props.accountNumber}
        </div>
    )
}

function RoleItem(props) {
    return (
        <div>
            {props.props.id}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
}

export default connect(mapStateToProps)(MyApplications);