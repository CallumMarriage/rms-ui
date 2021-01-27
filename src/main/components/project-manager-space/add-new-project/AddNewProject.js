import React from "react";
import TitleContainer from "../../shared/TitleContainer";

import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import {Typography, withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MyDatePicker from "./MyDatePicker";
import {addNewProject} from "../../../services/projectService";
import {StyledPaper} from "../../shared/SharedStyledItems";
import {Redirect} from "react-router-dom";


const StyledButton = withStyles((theme) => ({
    root: {
        width: '80%',
        height: '60px',
        color: 'white',
        backgroundColor: theme.palette.primary.main,
        position: 'relative',
        bottom: '0'
    }
}))(Button);


class AddNewProject extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            projectName: null,
            projectCode: null,
            description: null,
            accountNumber: props.location.state.accountNumber,
            hasError: false,
            completed: false,
            added: false,
            userId: props.location.state.userId
        };
    }

    handleChange = (event) => {
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

    async handleProjectCodeChange(event) {
        const projectCode = event.target.value;

        this.setState({
            projectCode: projectCode
        })
    }


    async submit() {
        const res = await addNewProject(this.state)

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
                <Redirect to={"/ProjectManagement"}/>
            )
        }

        return (
            <Grid container>
                <TitleContainer title={"Add a new Project"}/>
                <StyledPaper>
                    <div style={{width: '100%'}}>

                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant={"h6"}>
                                    Add the details for the new project.
                                </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <Grid container>
                                    <Grid item xs={12} style={{marginTop: '20px'}}>
                                        <InputLabel htmlFor="projectName">Project Name</InputLabel>
                                        <TextField id="projectName"
                                                   onChange={this.handleChange}
                                                   aria-describedby="What was your role on the project"
                                                   style={{width: '80%', padding: '10px'}}
                                                   variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={{marginTop: '20px'}}>
                                        <InputLabel htmlFor="accountNumber">Project Code</InputLabel>
                                        <TextField id="accountNumber"
                                                   aria-describedby="What account is the role for?"
                                                   variant="outlined"
                                                   onChange={this.handleProjectCodeChange.bind(this)}
                                                   style={{width: '60%', padding: '10px'}}
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={{marginTop: '20px'}}>
                                        <InputLabel htmlFor="description">Project Description</InputLabel>
                                        <TextField
                                            style={{width: '80%', padding: '10px'}}
                                            multiline={true}
                                            id={"description"}
                                            onChange={this.handleChange}
                                            rows={10}
                                            aria-label="Project description"
                                            placeholder="Briefly describe the project here"
                                            defaultValue=""
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <Grid container>
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
                                                <InputLabel htmlFor="endDate">End Date</InputLabel>
                                                <MyDatePicker id={"startDate"}
                                                              date={this.state.endDate}
                                                              handleChange={this.handleEndDateChange}
                                                />
                                            </Grid>
                                        </Grid>

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


export default AddNewProject;