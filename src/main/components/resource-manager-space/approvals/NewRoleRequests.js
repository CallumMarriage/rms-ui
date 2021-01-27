import Grid from "@material-ui/core/Grid";
import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";


import TableContainer from "@material-ui/core/TableContainer";
import CircularProgress from "@material-ui/core/CircularProgress";
import Error from "../../shared/Error";
import {Typography} from "@material-ui/core";
import {retrieveNewRoleRequestsForRm} from "../../../services/roleService";
import {connect} from "react-redux";

class NewRoleRequests extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newRoleRequests: null,
            hasError: false,
            loading: true
        }
    }

    async componentDidMount() {
        const res = await retrieveNewRoleRequestsForRm(this.props.userId);

        if(res.hasError){
            this.setState({
                hasError: true,
                loading: false
            })
        } else {
            this.setState({
                loading: false,
                hasError: false,
                newRoleRequests: res.newRoleRequests
            })
        }
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
        } else if (this.state.newRoleRequests.length === 0) {
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
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Candidate Id</TableCell>
                                    <TableCell align="right">Candidate name</TableCell>
                                    <TableCell align="right">New Role Name</TableCell>
                                    <TableCell align="right">Account Number</TableCell>
                                    <TableCell align="right">Project Code</TableCell>
                                    <TableCell align="right">Proposed Start Date</TableCell>
                                    <TableCell align="right">New End Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.newRoleRequests.map((request) => (
                                    <TableRow key={request.id}>
                                        <TableCell component="th" scope="row">
                                            {request.candidateId}
                                        </TableCell>
                                        <TableCell align="right">
                                            {request.proposedRoleName}
                                        </TableCell>
                                        <TableCell align="right">
                                            {request.accountNumber}
                                        </TableCell>
                                        <TableCell align="right">
                                            {request.projectCode}
                                        </TableCell>
                                        <TableCell align="right">
                                            {request.proposedStartDate}
                                        </TableCell>
                                        <TableCell align="right">
                                            {request.proposedEndDate}
                                        </TableCell>
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


const mapStateToProps = (state) => {
    return {
        userId: state.user.user.id,
    };
}

export default connect(mapStateToProps)(NewRoleRequests);