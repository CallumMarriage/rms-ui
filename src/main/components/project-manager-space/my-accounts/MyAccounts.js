import Grid from "@material-ui/core/Grid";
import {Typography, withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import React from "react";
import {retrieveAccountsAndProjectsForPm} from "../../../services/projectService";
import CircularProgress from "@material-ui/core/CircularProgress";
import Error from "../../shared/Error";
import Button from "@material-ui/core/Button";
import BuildIcon from '@material-ui/icons/Build';

class MyAccounts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            myAccounts: [],
            hasError: false,
            loading: true
        }
    }

    async componentDidMount() {
        let userId = this.props.userId;

        if (userId === null) {
            return;
        }

        const myAccounts = await retrieveAccountsAndProjectsForPm(userId);


        if (myAccounts.hasError) {
            this.setState({
                hasError: true,
                loading: false
            })
            return;
        }

        this.setState({
            myAccounts: myAccounts.accountAndProjectsList,
            loading: false,
            hasError: false
        })

    }

    render() {
        const myAccounts = this.state.myAccounts;


        if (this.state.loading) {
            return (
                <CircularProgress style={{marginTop: '20px'}}/>
            )
        } else if (this.state.hasError) {
            return (
                <Error/>
            )
        } else if (myAccounts.length === 0) {
            return (
                <div>
                    <Typography variant={"subtitle2"}>
                        You have no accounts.
                    </Typography>
                </div>
            )
        }

        return (
            <Grid container>
                <Grid item xs={12}>
                    <div style={{marginBottom: '100px'}}>
                        <Grid container>
                            {
                                myAccounts.map((account) => {
                                    return (
                                        <Grid item xs={12} key={account.targetAccount.accountNumber}>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <AccountTile account={account.targetAccount}/>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <ProjectsPaper>
                                                        <Grid container>
                                                            {account.projects.map((project) => {
                                                                return (
                                                                    <Grid item xs={6} md={3} key={project.projectCode}>
                                                                        <ProjectTile project={project}/>
                                                                    </Grid>
                                                                )
                                                            })}
                                                            <Grid item xs={3}>
                                                                <AddNewProjectButton>
                                                                    <BuildIcon/>
                                                                    Add a new Project
                                                                </AddNewProjectButton>
                                                            </Grid>
                                                        </Grid>
                                                    </ProjectsPaper>

                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default MyAccounts;

const ProjectsPaper = withStyles({
    root: {
        height: 'fit-content',
        padding: '40px',
        backgroundColor: '#D9D9D6'
    }
})(Paper)

function AccountTile(account) {

    return (
        <AccountPaper style={{marginTop: '20px'}}>
            <Typography variant={"h6"}>
                {account.account.accountName}
            </Typography>
        </AccountPaper>
    )
}


const AccountPaper = withStyles({
    root: {
        width: '50%',
        margin: 'auto',
        background: '#027bb6',
        color: 'white',
        marginLeft: 0,
        borderRadius: 0,
        borderTopRightRadius: '30px'
    }
})(Paper)

const ProjectPaper = withStyles({
    root: {
        width: '100%',
        height: '100%',
        margin: '0px',
        padding: '10px',
    }
})(Paper)

const AddNewProjectButton = withStyles({
    root: {
        backgroundColor: '#2E8B57',
        color: 'white',
        width: '50%',
        height: 'fit-content',
        margin: 'auto',
        padding: '10px'
    }
})(Button)


const ProjectButton = withStyles({
    root: {
        backgroundColor: '#0070AD',
        color: 'white',
        width: '80%',
        height: '60px',
        marginTop: '10%'
    }
})(Button)


function ProjectTile(props) {
    return (
        <ProjectPaper>
            <Typography variant={"h6"}>
                {props.project.projectName}
            </Typography>
            <Typography variant={"body1"}>
                Start Date {props.project.startDate}
            </Typography>
            <Typography variant={"body1"}>
                End Date {props.project.endDate}
            </Typography>
            <Grid container>
                <Grid item xs={6}>
                    <ProjectButton>
                        Update
                    </ProjectButton>
                </Grid>
                <Grid item xs={6}>
                    <ProjectButton>
                        View
                    </ProjectButton>
                </Grid>
            </Grid>
        </ProjectPaper>
    )
}

