import React from "react";
import {connect} from "react-redux";

import {getRoleTypes} from "../../shared/RoleTypes";
import TitleContainer from "../../shared/TitleContainer";
import {addNewRole} from "../../../services/roleService";

import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import {Typography, withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MyDatePicker from "./MyDatePicker";
import EndDateForm from "./EndDateForm";
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {retrieveAccountInfo} from "../../../services/accountService";
import CircularProgress from "@material-ui/core/CircularProgress";
import Redirect from "react-router-dom/es/Redirect";

const StyledPaper = withStyles({
    root: {
        marginBottom: '50px',
        width: '90%',
        paddingRight: '10%',
        paddingLeft: '10%',
        paddingBottom: '20px',
        paddingTop: '20px'

    }
})(Paper)

const StyledButton = withStyles({
    root: {
        width: '80%',
        height: '60px',
        color: 'white',
        backgroundColor: '#0070AD',
        position: 'relative',
        bottom: '0'
    }
})(Button);


class AddNewRole extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date(),
            endDate: null,
            roleName: null,
            roleDescription: null,
            roleType: getRoleTypes()[0].value,
            project: null,
            potentialProjects: [],
            accountName: null,
            accountNumber: null,
            loadingAccountVerification: false,
            hasError: false,
            currentRole: true,
            completed: false,
            accountCorrect: undefined,
            added: false
        };
    }

    handleChange = (event) => {
        console.log(event.target.id)
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleStartDateChange = (date) => {
        this.setState({
            startDate: date
        })
    }

    handleEndDateChange = (date) => {
        this.setState({
            endDate: date
        })
    }

    handleRadioChange = (event) => {
        this.setState({
            [event.target.name]: event.target.checked,
            endDate: null
        });
    }

    async handleAccountChange(event) {
        const accountNumber = event.target.value;

        this.setState({
            accountNumber: accountNumber
        })


        if (accountNumber == null || accountNumber === "" || accountNumber.length < 10) {
            this.setState({
                accountCorrect: false,
                loadingAccountVerification: false,
                completed: false
            })
        } else {

            this.setState({
                loadingAccountVerification: true,
                completed: true
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
                    accountName: res.account.accountName,
                    potentialProjects: potentialProjects
                })
            }
        }
    }

    setRoleType(event) {
        this.setState({
            roleType: event.target.value
        })
    }

    setProject(event) {
        this.setState({
            project: event.target.value
        })
    }

    async submit() {
        console.log(this.state);
        const res = await addNewRole(this.props.userId, this.state)

        if (res !== undefined && res.hasError) {
            this.setState({
                hasError: res.hasError
            })
        } else {
            this.setState({
                added: true
            })
            alert('Successfully Added new role');
        }
    }

    render() {

        if(this.state.added){
            return (
                <Redirect to={"/MyCapgeminiCv"}/>
            )
        }

        return (
            <Grid container>
                <TitleContainer title={"Add a new Role"}/>
                <StyledPaper>
                    <div style={{width: '100%'}}>

                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant={"h6"}>
                                    Add your role details
                                </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <Grid container>
                                    <Grid item xs={12} style={{marginTop: '20px'}}>
                                        <InputLabel htmlFor="roleName">Role Name</InputLabel>
                                        <TextField id="roleName"
                                                   onChange={this.handleChange}
                                                   aria-describedby="What was your role on the project"
                                                   style={{width: '80%', padding: '10px'}}
                                                   variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={{marginTop: '20px'}}>
                                        <InputLabel htmlFor="roleType">Role Type</InputLabel>
                                        <TextField
                                            id="roleType"
                                            select
                                            value={this.state.roleType}
                                            onChange={this.setRoleType.bind(this)}
                                            helperText="Please select from the list what closest matches your role"
                                            variant="outlined"
                                            style={{width: '80%', padding: '10px'}}>
                                            {getRoleTypes().map((option) => (
                                                <MenuItem id={"roleType"}
                                                          name={"roleType"}
                                                          key={option.value}
                                                          value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} style={{marginTop: '20px'}}>
                                        <InputLabel htmlFor="description">Role Description</InputLabel>
                                        <TextField
                                            style={{width: '80%', padding: '10px'}}
                                            multiline={true}
                                            id={"description"}
                                            onChange={this.handleChange}
                                            rows={10}
                                            aria-label="Role description"
                                            placeholder="What are the main responsibilities of the role?"
                                            defaultValue=""
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <Grid container>
                                    <Grid item xs={12} style={{marginTop: '20px'}}>
                                        <InputLabel htmlFor="accountNumber">Account Number</InputLabel>
                                        <TextField id="accountNumber"
                                                   aria-describedby="What account is the role for?"
                                                   variant="outlined"
                                                   onChange={this.handleAccountChange.bind(this)}
                                                   style={{width: '60%', padding: '10px'}}
                                        />
                                        {
                                            renderAccountVerified(
                                                this.state.loadingAccountVerification,
                                                this.state.accountCorrect,
                                                this.state.completed)}
                                    </Grid>
                                    <Grid item xs={12} style={{marginTop: '20px'}}>
                                        <InputLabel htmlFor="project">Project</InputLabel>
                                        <TextField
                                            id="project"
                                            select
                                            value={this.state.project}
                                            onChange={this.setProject.bind(this)}
                                            helperText="Please select from the list what closest matches your role"
                                            variant="outlined"
                                            style={{width: '80%', padding: '10px'}}>
                                            {this.state.potentialProjects.map((option) => (
                                                <MenuItem key={option.id} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} style={{marginTop: '20px'}}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <InputLabel htmlFor="startDate">Start Date</InputLabel>
                                                <MyDatePicker id={"startDate"}
                                                              date={this.state.startDate}
                                                              handleChange={this.handleStartDateChange}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Paper style={{width: '80%', padding: '5px', margin: 'auto'}}>
                                                    <EndDateForm currentRole={this.state.currentRole}
                                                                 handleRadioChange={this.handleRadioChange}/>
                                                    {
                                                        renderEndDate(
                                                            this.state.currentRole,
                                                            this.state.endDate,
                                                            this.handleEndDateChange)
                                                    }
                                                </Paper>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                    <Grid item xs={12} style={{marginTop: '20px'}}>

                                    </Grid>
                                    <Grid item xs={12}>
                                        <StyledButton onClick={this.submit.bind(this)}>
                                            Submit
                                        </StyledButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </StyledPaper>
            </Grid>
        );
    }
}

function renderAccountVerified(loading, verified, completed) {

    if (loading) {
        return (
            <CircularProgress style={{ marginTop: '20px'}}/>
        )
    }

    if (completed) {
        if (verified) {
            return (
                <CheckCircleIcon style={{width: '50px', height: '50px', color: "green"}}/>
            )
        } else {
            return (
                <ErrorIcon style={{color: "red"}}/>
            )
        }
    }

    return (
        <div/>
    )
}

function renderEndDate(currentRole, endDate, handleChange) {
    if (!currentRole) {
        return (
            <div>
                <InputLabel htmlFor="endDate">End Date</InputLabel>
                <MyDatePicker id={"endDate"} date={endDate} handleChange={handleChange}/>
            </div>
        )
    } else {
        return (
            <Typography variant={"subtitle2"}>
                If current role leave this enabled.
            </Typography>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.user.id,
    };
}

export default connect(mapStateToProps)(AddNewRole);