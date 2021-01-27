import React from "react";

import Grid from "@material-ui/core/Grid";
import TitleContainer from "../../shared/TitleContainer";
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
import {retrieveCandidatesForResourceManager} from "../../../services/candidateService";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

class ViewCandidates extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            hasError: false,
            candidates: []
        }
    }

    async componentDidMount() {

        const res = await retrieveCandidatesForResourceManager(this.props.userId);
        console.log(res);
        if (res.hasError) {
            this.setState({
                loading: false,
                hasError: true
            })
        }

        this.setState({
            candidates: res.candidates,
            loading: false
        })
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
        } else if (this.state.candidates.length === 0) {
            return (
                <div>
                    <Typography variant={"h6"}>
                        There are no candidates assigned to you.
                    </Typography>
                </div>
            )
        }

        return (
            <Grid container>
                <TitleContainer title={"View Employees"}/>
                <Paper>
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Candidate Id</TableCell>
                                    <TableCell align="right">Full name</TableCell>
                                    <TableCell align="right">Current Role ID</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.candidates.map((candidate) => (
                                    <TableRow key={candidate.id}>
                                        <TableCell component="th" scope="row">
                                            {candidate.id}
                                        </TableCell>
                                        <TableCell align="right">
                                            {candidate.fullName}
                                        </TableCell>
                                        <TableCell align="right">
                                            {candidate.currentRoleId}
                                        </TableCell>
                                        <TableCell align={"right"}>
                                            <Link style={{textDecoration: 'none'}} to={{
                                                pathname: `/ViewCandidates/Candidate/${candidate.id}`,
                                                state: {
                                                    candidateId: candidate.id,
                                                    currentRoleId: candidate.currentRoleId,
                                                    fullName: candidate.fullName,
                                                    userSpecialism: candidate.userSpecialism
                                                }
                                            }}>
                                                <Button>
                                                    View Candidate
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.user.user.id
    };
}

export default connect(mapStateToProps)(ViewCandidates);