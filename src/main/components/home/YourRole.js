import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {retrieveResourceManagerName} from "../../services/userService";

import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import {AccountLink, ProjectLink, RoleLink} from "../shared/Links";


const StyledButton = withStyles({
    root: {
        border: 'solid 2px #0070AD',
        backgroundColor: '#0070AD',
        margin: '10px',
        height: '100px',
        width: '90%',
        "&:hover": {
            backgroundColor: "#12ABDB"
        }
    },
    disabled: {
        border: 'solid 2px lightgrey',
        backgroundColor: 'lightgrey',
        margin: '10px',
        width: '90%',
        "&:hover": {
            backgroundColor: "lightgrey"
        }
    }
})(Button)

const StyledPaper = withStyles({
    root: {
        margin: '20px',
        width: '100%',
        padding: '10px',
        textTransform: 'none',
        border: 'solid 5px green'
    }
})(Paper)

const ErrorStyledPaper = withStyles({
    root: {
        border: 'solid 5px red',
    }
})(StyledPaper)

const PrimaryTyp = withStyles({
    root: {
        color: 'white',
        padding: '10px',
        fontSize: '1em'
    }
})(Typography)

const SecondaryHeaderTyp = withStyles({
    root: {
        color: '#0070AD',
        padding: '10px',
        fontSize: '1.5em'

    }
})(Typography)

class YourRole extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentRole: null,
            currentAccount: null,
            currentProject: null,
            currentResourceManager: null
        };
    }

    async componentDidMount() {
        console.log(this.props.user)
        if (this.props.user.resourceManagerId == null) {
            return;
        }

        const response = await retrieveResourceManagerName(
            this.props.user.resourceManagerId);

        if (response.hasError) {
            return
        }

        this.setState({
            currentResourceManager: response.id
        })
    }

    render() {
        let project = this.props.currentProject;
        let account = this.props.currentAccount;
        let role = this.props.currentRole;

        return (
            <Paper style={{width: '80%', margin: 'auto', marginTop: '50px', padding: '30px', marginBottom: '50px'}}>
                <SecondaryHeaderTyp>
                    Here you can find out all your current information
                </SecondaryHeaderTyp>
                {returnInfo(project, account, role, this.state.currentResourceManager)}
            </Paper>
        )
    }
}

function returnInfo(project, account, role, resourceManager) {

    if (role === null || role === undefined) {
        return (
            <Grid container style={{marginBottom: '20px'}}>
                <Grid item xs={12}>
                    <Typography variant={"h6"}>
                        You are not currently assigned to a project.
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button>
                        <StyledPaper>
                            <Typography variant={"h6"}>
                                Starting looking now
                            </Typography>
                            <Link to={"/FindRoles"} style={{textDecoration: 'none'}}>
                                <Typography variant={"subtitle1"}>
                                    To get started you can find available roles here!
                                </Typography>
                            </Link>
                        </StyledPaper>
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button>
                        <ErrorStyledPaper>
                            <Typography variant={"h6"}>
                                Is your project missing?
                            </Typography>
                            <Link to={"/MyCapgeminiCv"} style={{textDecoration: 'none'}}>
                                <Typography variant={"subtitle1"}>
                                    If your current project is not being shown you can find instructions here on how to
                                    make
                                    sure our system is up to date.
                                </Typography>
                            </Link>
                        </ErrorStyledPaper>
                    </Button>
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid container style={{marginBottom: '20px'}}>
            <Grid item xs={4}>
                {
                    RoleLink(role, RoleButton)
                }
            </Grid>
            <Grid item xs={4}>
                {
                    ProjectLink(project, ProjectButton)
                }
            </Grid>
            <Grid item xs={4}>
                {
                    AccountLink({
                        accountNumber: account.accountCode,
                        accountName: account.accountName
                    }, AccountButton)
                }
            </Grid>
            <Grid item xs={4}>
                {/*{retrieveButton(resourceManager, 'Your Resource Manager')}*/}
            </Grid>
        </Grid>
    )
}

function RoleButton(props) {
    let message = 'Current Role: ' + props.props.id;
    return (
        <div>
            {
                LinkButton(message)
            }
        </div>
    )
}

function AccountButton(props) {
    console.log(props)
    let message = 'Current Account: ' + props.props.accountNumber
    return (
        <div>
            {
                LinkButton(message)
            }
        </div>
    )
}

function ProjectButton(props) {
    let message = 'Current Project: ' + props.props.projectCode

    return (
        <div>
            {
                LinkButton(message)
            }
        </div>
    )
}

function LinkButton(content) {
    return (
        <StyledButton>
            <PrimaryTyp variant={"h4"}>
                {
                    content
                }
            </PrimaryTyp>
        </StyledButton>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        currentRole: state.auth.currentRole,
        currentAccount: state.auth.currentAccount,
        currentProject: state.auth.currentProject
    };
}

export default connect(mapStateToProps)(YourRole);