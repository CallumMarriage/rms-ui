import React from "react";
import TitleContainer from "../../shared/TitleContainer";

import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import {Typography, withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MyDatePicker from "./MyDatePicker";
import {addNewAccount} from "../../../services/accountService";
import { Redirect }  from "react-router-dom";

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


class AddNewAccount extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            accountName: null,
            accountDescription: null,
            accountNumber: null,
            hasError: false,
            completed: false,
            added: false
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
    }


    async submit() {
        const res = await addNewAccount(this.state)

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
                <TitleContainer title={"Add a new Account"}/>
                <StyledPaper>
                    <div style={{width: '100%'}}>

                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant={"h6"}>
                                    Add the details for the new account.
                                </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <Grid container>
                                    <Grid item xs={12} style={{marginTop: '20px'}}>
                                        <InputLabel htmlFor="accountName">Account Name</InputLabel>
                                        <TextField id="accountName"
                                                   onChange={this.handleChange}
                                                   aria-describedby="What was your role on the project"
                                                   style={{width: '80%', padding: '10px'}}
                                                   variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={{marginTop: '20px'}}>
                                        <InputLabel htmlFor="description">Account Description</InputLabel>
                                        <TextField
                                            style={{width: '80%', padding: '10px'}}
                                            multiline={true}
                                            id={"description"}
                                            onChange={this.handleChange}
                                            rows={10}
                                            aria-label="Account description"
                                            placeholder="Briefly describe the account here"
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
                                                <InputLabel htmlFor="endDate">End Date</InputLabel>
                                                <MyDatePicker id={"startDate"}
                                                              date={this.state.endDate}
                                                              handleChange={this.handleEndDateChange}
                                                />
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


export default AddNewAccount;