import React from 'react';
import {connect} from "react-redux";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import {Typography} from "@material-ui/core";

import TitleContainer from "../shared/TitleContainer";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {retrieveAccountInfo} from "../../services/accountService";
import {retrieveProjectInfo} from "../../services/projectService";
import HasCurrentRole from "./HasCurrentRole";
import {handleAddNewUser} from "../../services/userService";
import {updateUserCreds, updateUserExists} from "../../actions/user";
import {Redirect} from "react-router-dom";
import {getEmployeeTypes} from "../shared/EmployeeTypes";
import {getRoleTypes} from "../shared/RoleTypes";

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

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            currentRole: "PLEASE_SELECT",
            potentialRoles: [],
            potentialProjects: [],
            currentProject: "PLEASE_SELECT",
            currentAccount: null,
            userSpecialism: null,
            loading: true,
            hasCurrentRole: false,
            hasError: false,
            employeeType: "CANDIDATE",
            employeeTypes: getEmployeeTypes(),
            completed: false
        };
    }

    async handleAccountChange(event) {
        const accountNumber = event.target.value;

        if (accountNumber == null || accountNumber === "" || accountNumber.length < 10) {
            this.setState({
                accountCorrect: false,
                loadingAccountVerification: false,
                completed: false
            })
        } else {

            this.setState({
                loadingAccountVerification: true,
            })

            const res = await retrieveAccountInfo(accountNumber);

            let doesExist = false;

            if (res.hasError) {
                doesExist = false
            }
            if (res.account !== undefined) {
                doesExist = true
            }

            if (!doesExist) {
                this.setState({
                    loadingAccountVerification: false,
                    accountCorrect: false,
                    accountNumber: accountNumber
                })
            } else {

                let potentialProjects = [];

                res.projectList.forEach(project => {
                    let projectInfo = {
                        label: project.projectName,
                        id: project.projectCode,
                        value: project
                    }
                    potentialProjects.push(projectInfo)
                })

                this.setState({
                    loadingAccountVerification: false,
                    accountCorrect: true,
                    currentAccount: res.account.accountName,
                    potentialProjects: potentialProjects,
                    accountNumber: accountNumber
                })
            }
        }
    }

    handleRadioChange = (event) => {
        this.setState({
            [event.target.name]: event.target.checked,
            endDate: null
        });
    }

    async submit() {

        let roleId = null
        if (this.state.currentRole != null) {
            roleId = this.state.currentRole.id;
        }

        const res = await handleAddNewUser(this.props.ssoId, this.state.name, roleId,
            this.state.employeeType, this.state.userSpecialism);

        if (res.hasError) {
            alert('There has been an error')
        }

        const userDetails = res.user;
        const currentRole = res.currentRole;
        const currentProject = res.currentProject;
        const currentAccount = res.currentAccount;

        alert('You have succesfully created your profile!')
        this.props.updateUserCreds(userDetails, currentRole, currentAccount, currentProject);
        this.props.updateUserExists(true);

        this.setState({
            completed: true
        })
    }


    setEmployeeType(event) {
        this.setState({
            employeeType: event.target.value
        })
    }

    setUserSpecialism(event) {
        this.setState({
            userSpecialism: event.target.value
        })
    }

    async setProject(event) {

        const project = event.target.value;

        const projectInfo = await retrieveProjectInfo(project.projectCode);

        if (projectInfo.hasError) {
            alert('issue');
            return;
        }

        let potentialRoles = [];

        projectInfo.roleList.forEach(role => {
            let roleInfo = {
                label: role.roleName,
                id: role.id,
                value: role
            }
            potentialRoles.push(roleInfo)
        })

        this.setState({
            currentProject: event.target.value,
            potentialRoles: potentialRoles
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    setRole(event) {
        this.setState({
            currentRole: event.target.value
        })
    }


    RenderCurrentRoleOptions() {
        if (!this.state.hasCurrentRole) {
            return (
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant={"subtitle2"}
                                    style={{paddingRight: '20%', paddingLeft: '20%', paddingBottom: '5%'}}>
                            If you are currently engaged on a project enable this toggle and search for your role.
                        </Typography>
                    </Grid>
                </Grid>
            )
        }

        return (
            <Grid container>
                <Grid item xs={12} style={{marginTop: '20px'}}>
                    <InputLabel htmlFor="accountNumber">Account Number</InputLabel>
                    <TextField id="accountNumber"
                               aria-describedby="What account are you on?"
                               variant="outlined"
                               onChange={this.handleAccountChange.bind(this)}
                               style={{width: '60%', padding: '10px'}}
                    />
                    {/*{*/}
                    {/*    renderAccountVerified(*/}
                    {/*        this.state.loadingAccountVerification,*/}
                    {/*        this.state.accountCorrect,*/}
                    {/*        this.state.completed)}*/}
                </Grid>
                {this.renderProjectList()}
                {this.renderRoleList()}

            </Grid>
        )
    }

    renderProjectList() {
        if (this.state.potentialProjects.length === 0) {
            return null;
        } else {
            return (
                <Grid item xs={12} style={{marginTop: '20px'}}>
                    <InputLabel htmlFor="currentProject">Current Project</InputLabel>
                    <TextField
                        id="currentProject"
                        select
                        value={this.state.currentProject}
                        onChange={this.setProject.bind(this)}
                        helperText="Please select from the list your project"
                        variant="outlined"
                        style={{width: '80%', padding: '10px'}}>
                        {this.state.potentialProjects.map((option) => (
                            <MenuItem key={option.id} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            )
        }
    }

    renderRoleList() {
        if (this.state.potentialRoles.length === 0) {
            return null;
        } else {
            return (
                <Grid item xs={12} style={{marginTop: '20px'}}>
                    <InputLabel htmlFor="currentRole">Current Role</InputLabel>
                    <TextField
                        id="currentRole"
                        select
                        value={this.state.currentRole}
                        onChange={this.setRole.bind(this)}
                        helperText="Please select from the list the role you have"
                        variant="outlined"
                        style={{width: '80%', padding: '10px'}}>
                        {this.state.potentialRoles.map((option) => (
                            <MenuItem key={option.id} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            )
        }
    }

    render() {

        if (this.state.completed) {
            return (
                <Redirect to={"/"}/>
            )
        }

        return (
            <Paper style={{width: '100%', margin: 'auto', marginBottom: '100px'}}>

                <Grid container>
                    <Grid item xs={1} md={2}>

                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Grid container>
                            <TitleContainer title={"Sign up to our service"}/>
                            <Grid item xs={12}>
                                <Paper>
                                    <Typography variant={"h6"}>
                                        It looks like it is your first time signing into our service!
                                    </Typography>
                                    <Typography variant={"subtitle1"} style={{padding: '30px'}}>
                                        Fill in your details in the form below so that you can start shaping your
                                        Capgemini
                                        journey
                                    </Typography>
                                    <Grid container>
                                        <Grid item xs={12} md={6}>
                                            <Grid container>
                                                <Grid item xs={12} style={{marginTop: '20px'}}>
                                                    <InputLabel htmlFor="roleName">Your Name</InputLabel>
                                                    <TextField id="name"
                                                               name="name"
                                                               onChange={this.handleChange}
                                                               aria-describedby="Your name"
                                                               style={{width: '80%', padding: '10px'}}
                                                               variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} style={{marginTop: '20px'}}>
                                                    <InputLabel htmlFor="roleName">What type of employee are
                                                        you?</InputLabel>
                                                    <Grid item xs={12} style={{marginTop: '20px'}}>
                                                        <TextField
                                                            id="currentRole"
                                                            select
                                                            value={this.state.employeeType}
                                                            onChange={this.setEmployeeType.bind(this)}
                                                            helperText="Please select from the list the role you have"
                                                            variant="outlined"
                                                            style={{width: '80%', padding: '10px'}}>
                                                            {this.state.employeeTypes.map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} style={{marginTop: '20px'}}>
                                                    <InputLabel htmlFor="roleName">What is your specialist field?</InputLabel>
                                                    <Grid item xs={12} style={{marginTop: '20px'}}>
                                                        <TextField
                                                            id="userSpecialism"
                                                            select
                                                            value={this.state.userSpecialism}
                                                            onChange={this.setUserSpecialism.bind(this)}
                                                            helperText="Please select from the list what closest matches your specialist area"
                                                            variant="outlined"
                                                            style={{width: '80%', padding: '10px'}}>
                                                            {getRoleTypes().map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Grid container>
                                                <Grid item xs={12} style={{marginTop: '20px'}}>
                                                    <HasCurrentRole currentRole={this.state.hasCurrentRole}
                                                                    handleRadioChange={this.handleRadioChange}/>
                                                </Grid>
                                                {this.RenderCurrentRoleOptions()}
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} style={{marginBottom: '20px'}}>
                                            <StyledButton onClick={this.submit.bind(this)}>
                                                Submit
                                            </StyledButton>
                                        </Grid>
                                    </Grid>

                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1} md={2}>

                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ssoId: state.auth.ssoId
    };
}

export default connect(mapStateToProps, {updateUserExists, updateUserCreds})(SignUp);