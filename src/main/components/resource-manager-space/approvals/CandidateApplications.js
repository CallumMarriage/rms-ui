import Grid from "@material-ui/core/Grid";
import React from "react";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Error from "../../shared/Error";
import {Typography} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {
    approveCandidateApplication,
    markAsInReviewCandidateApplication,
    rejectCandidateApplication,
    retrieveApplicationsForRm
} from "../../../services/applicationService";
import Button from "@material-ui/core/Button";

class CandidateApplications extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            applications: null,
            hasError: false,
            loading: true
        }
    }

    async componentDidMount() {
        await this.retrieveCandidates();
    }

    async retrieveCandidates() {

        const applications = await retrieveApplicationsForRm(this.props.userId)
        if (applications.hasError) {
            this.setState({
                hasError: true,
                loading: false
            })
        } else {
            this.setState({
                applications: applications.applicationInfoList,
                loading: false,
                hasError: false
            })
        }
    }

    async approve(application) {
        this.setState({
            loading: true
        })
        const res = await approveCandidateApplication(application.applicationId, this.props.userId);

        if (res.hasError) {
            this.setState({
                hasError: true,
                loading: false
            })
        } else {
            this.setState({
                hasError: false,
                loading: false
            })
        }
        await this.retrieveCandidates();
        alert('Successfully approved application for candidate')
    }

    async markAsInReview(application) {
        this.setState({
            loading: true
        })

        const res = await markAsInReviewCandidateApplication(application.applicationId, this.props.userId);

        if (res.hasError) {
            this.setState({
                hasError: true,
                loading: false
            })
        } else {
            this.setState({
                hasError: false,
                loading: false
            })
        }

        await this.retrieveCandidates();
        alert('You have updated the status of this application')
    }

    async reject(application) {
        this.setState({
            loading: true
        })

        const res = await rejectCandidateApplication(application.applicationId, this.props.userId);

        if (res.hasError) {
            this.setState({
                hasError: true,
                loading: false
            })
        }

        await this.retrieveCandidates();
        alert('You have rejected the application for candidate')
    }

    renderApproveButton(application) {
        if(this.returnIfNotFinalised(application.applicationStatus)){
            return (
                <TableCell component="th" scope={"row"}>
                    <Button onClick={() => this.approve(application)}>
                        Approve Application
                    </Button>
                </TableCell>
            )
        } else {
            return null;
        }
    }

    renderRejectButton(application) {
        if(this.returnIfNotFinalised(application.applicationStatus)){
            return (
                <TableCell component={"th"} scope={"row"}>
                    <Button onClick={() => this.reject(application)}>
                        Reject Application
                    </Button>
                </TableCell>
            )
        } else {
            return null;
        }
    }

    renderInReviewButton(application) {
        if(application.applicationStatus !== 'IN_REVIEW'
            && application.applicationStatus !== 'ACCEPTED'
            && application.applicationStatus !== 'REJECTED'){

            return (
                <TableCell component="th" scope={"row"}>
                    <Button onClick={() => this.markAsInReview(application)}>
                        Mark as in review
                    </Button>
                </TableCell>
            )
        } else {
            return null;
        }
    }

    returnIfNotFinalised(applicationStatus) {
        return applicationStatus === 'SUBMITTED'
            || applicationStatus === 'IN_REVIEW';
    }


    render() {

        if (this.state.loading) {
            return (
                <CircularProgress style={{marginTop: '20px'}}/>
            )
        } else if (this.state.hasError) {
            return (
                <Error/>
            )
        } else if (this.state.applications.length === 0) {
            return (
                <div>
                    <Typography variant={"h6"}>
                        You have no applications.
                    </Typography>
                </div>
            )
        }

        return (
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant={"h6"} color={"primary"}>
                        Candidate Applications
                    </Typography>
                </Grid>
                <Grid item xs={12}>

                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <CandidateTableCell content={"Candidate ID"}/>
                                    <CandidateTableCell content={"Application date"}/>
                                    <CandidateTableCell content={"Last updated date"}/>
                                    <CandidateTableCell content={"Application Status"}/>
                                    <CandidateTableCell content={"Role ID"}/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.applications.map((application) => (
                                    <TableRow key={application.applicationId}>
                                        <CandidateTableCellRow content={application.applicantId}/>
                                        <CandidateTableCellRow content={application.applicationDate}/>
                                        <CandidateTableCellRow content={application.lastUpdatedDate}/>
                                        <CandidateTableCellRow content={application.applicationStatus}/>
                                        <CandidateTableCellRow content={application.roleId}/>
                                        { this.renderInReviewButton(application) }
                                        { this.renderApproveButton(application) }
                                        { this.renderRejectButton(application) }
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        )
    }
}

function CandidateTableCell(props){
    return (
        <TableCell>
            <Typography variant={"subtitle1"} color={"textPrimary"}>
                {props.content}
            </Typography>
        </TableCell>
    )
}

function CandidateTableCellRow(props){
    return (
        <TableCell component="th" scope="row">
            <Typography variant={"body1"} color={"textSecondary"}>
                {props.content}
            </Typography>
        </TableCell>
    )
}


const mapStateToProps = (state) => {
    return {
        userId: state.user.user.id,
    };
}

export default connect(mapStateToProps)(CandidateApplications);