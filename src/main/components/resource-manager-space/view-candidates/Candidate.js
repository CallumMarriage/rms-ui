import Grid from "@material-ui/core/Grid";
import TitleContainer from "../../shared/TitleContainer";
import React from "react";
import Paper from "@material-ui/core/Paper";
import {Typography, withStyles} from "@material-ui/core";
import {retrieveRoleHistory} from "../../../services/roleHistoryService";
import CircularProgress from "@material-ui/core/CircularProgress";
import {RoleLink} from "../../shared/Links";

class Candidate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roleHistory: [],
            currentRoleId: this.props.location.state.currentRoleId,
            candidateId: this.props.location.state.candidateId,
            userSpecialism: this.props.location.state.userSpecialism,
            hasError: false,
            loading: true,
            fullName: this.props.location.state.fullName
        }
    }

    async componentDidMount() {

        const res = await retrieveRoleHistory(this.state.candidateId);

        if (res.hasError) {
            this.setState({
                hasError: true,
                loading: false
            })
        } else {
            this.setState({
                roleHistory: res.rolehistory,
                loading: false,
                hasError: false
            })
        }
    }

    render() {
        return (
            <Paper>
                <Grid container>
                    <TitleContainer title={this.state.fullName}/>

                    <Grid item xs={6}>
                        <Paper>
                            <Typography variant={"h6"}>
                                This candidate is a {this.state.userSpecialism}
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={6}>

                        <Paper style={{padding: '20px'}}>
                            <Typography variant={"h6"}>
                                Role History
                            </Typography>
                            {
                                RenderRoleHistory(this.state.loading,
                                    this.state.hasError,
                                    this.state.roleHistory, this.state.currentRoleId)
                            }
                        </Paper>
                    </Grid>

                </Grid>
            </Paper>
        )
    }
}

function RenderRoleHistory(loading, hasError, roleHistory, currentRoleId) {
    if (loading) {
        return (
            <CircularProgress style={{marginTop: '20px'}}/>
        )
    } else if (hasError) {
        return (
            <Typography variant={"subtitle1"}>
                Oops, something has gone wrong retrieving the role history for this user.
            </Typography>
        )
    } else {

        return (
            <Paper>
                <Grid container>
                    {
                        roleHistory.map((role) => {
                            role.currentRoleId = currentRoleId
                            return (
                                <Grid item xs={12} key={role.id}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            {
                                                RoleLink(role, RenderRole)
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Paper>
        )
    }
}

const StyledRolePaper = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.secondary.main,
        margin: '10px',
        padding: '20px'
    }
}))(Paper);

function RenderRole(props) {
    const role = props.props
    return (
        <StyledRolePaper>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant={"body1"}>
                        {role.roleName} at {role.accountName}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {
                        RenderTitle(role, role.currentRoleId)
                    }
                </Grid>
            </Grid>
        </StyledRolePaper>
    )
}

function RenderTitle(role, currentRoleId) {
    if (role.id === currentRoleId) {
        return (
            <Typography variant={"body2"}>
                This is the candidate's current role.
            </Typography>
        )
    } else {
        return (
            <Typography variant={"body2"}>
                From {role.startDate} until {role.endDate}
            </Typography>
        )
    }
}

export default Candidate;