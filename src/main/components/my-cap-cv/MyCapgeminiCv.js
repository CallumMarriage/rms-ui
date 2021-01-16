import React from 'react';
import {connect} from "react-redux";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import {Typography} from "@material-ui/core";

import Role from "../find-roles/Role";
import Error from "../shared/Error";
import {retrieveRoleHistory} from "../../services/roleHistoryService";

import './MyCapgeminiCv.css';
import TitleContainer from "../shared/TitleContainer";
import CircularProgress from "@material-ui/core/CircularProgress";
import CustomizedTimeline from "./Timeline";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

const StyledButton = withStyles({
    root: {
        border: 'solid 2px #0070AD',
        backgroundColor: '#0070AD',
        color: 'white',
        margin: '10px',
        width: '90%',
        "&:hover": {
            backgroundColor: "#12ABDB"
        }
    }
})(Button)

const StyledPaper = withStyles({
    root: {
        border: 'solid 2px #0070AD',
        backgroundColor: 'lightgrey',
        margin: 'auto',
        padding: '10px',
        width: '60%',
    }
})(Paper)

class MyCapgeminiCv extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roleHistory: [],
            loading: true,
            hasError: false
        };
    }

    async componentDidMount() {
        const userId = this.props.userId;
        console.log(userId);
        const res = await retrieveRoleHistory(userId);
        if (res == null) {
            this.setState({
                loading: false
            })
        } else if (res.hasError) {
            this.setState({
                hasError: true,
                error: res.error
            })
        } else {
            this.setState({
                roleHistory: res.rolehistory,
                loading: false
            })
        }

    }

    render() {
        console.log(this.state.roleHistory)
        return (
            <Grid container>
                <TitleContainer title={"My Capgemini CV"}/>
                <Grid item xs={12}>
                    <div style={{marginTop: '20px', marginBottom: '20px'}}>
                        <Paper>
                            <Grid container>
                                <Grid item xs={12}>
                                    <div style={{marginTop: '20px', marginBottom: '20px'}}>
                                        <Typography variant={"h5"}>
                                            Welcome to your Capgemini CV
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant={"subtitle1"}>
                                        Here you can search through your journey at Capgemini.
                                        Each stage has a link to the role you were on at that timee.
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <div style={{margin: '10px'}}>

                                        <Typography variant={"h6"}>
                                            If you think that your history is incomplete click on the below button to
                                            add a
                                            new role.
                                        </Typography>
                                        <Link to={'/AddNewRole'} style={{textDecoration: 'none'}}>
                                            <StyledButton>
                                                Add a new role to your Capgemini CV
                                            </StyledButton>
                                        </Link>
                                        <StyledPaper>
                                            <Typography variant={"subtitle1"}>
                                                Before you add your role make sure you have the account number for the
                                                account that you were on.
                                            </Typography>
                                            <div style={{marginTop: '10px'}}>
                                                <Typography variant={"subtitle2"}>
                                                    Account details can be found here <Link
                                                    to={"/SearchAccounts"}>Capgemini Accounts</Link>
                                                </Typography>
                                            </div>
                                        </StyledPaper>
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        {
                            renderRoleHistory(this.state.loading, this.state.hasError, this.state.roleHistory)
                        }
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

function renderRoleHistory(loading, hasError, roleHistory) {
    if (loading) {
        return (
            <CircularProgress style={{marginTop: '20px'}}/>
        )
    }

    if (hasError) {
        return (
            <Error/>
        )
    }

    if (roleHistory !== undefined && roleHistory.length !== 0) {
        return (
            <Paper style={{
                width: '100%',
                minHeight: '350px',
                maxHeight: '400px',
                overflow: 'auto',
                marginBottom: '100px'
            }}>
                <CustomizedTimeline roleHistory={roleHistory}/>
            </Paper>
        );
    } else {
        return (
            <Paper style={{
                width: '100%',
                minHeight: '350px',
                maxHeight: '400px',
                overflow: 'auto',
                marginBottom: '100px'
            }}>

            </Paper>
        )
    }
}


const mapStateToProps = (state) => {
    console.log(state)
    return {
        userId: state.auth.user.id,
    };
}

export default connect(mapStateToProps)(MyCapgeminiCv);