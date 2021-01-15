import React from "react";
import Grid from "@material-ui/core/Grid";
import TitleContainer from "../../shared/TitleContainer";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import {getRoleTypes} from "../../shared/RoleTypes";
import Paper from "@material-ui/core/Paper";
import {Typography, withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {addNewRole} from "../../../services/roleService";
import {connect} from "react-redux";

const StyledPaper = withStyles({
    root: {
        marginBottom: '50px',
        width: '90%'
    }
})(Paper)

const StyledButton = withStyles((theme) => ({
    root: {
        width: '80%',
        height: '60px',
        color: 'white',
        backgroundColor: '#0070AD',
        position: 'relative',
        bottom: '0'
    }
}))(Button);


class AddNewRole extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: null,
            endDate: null,
            roleName: null,
            roleDescription: null,
            roleType: getRoleTypes()[0].value,
            projectCode: null,
            accountNumber: null,
            hasError: false
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    setRoleType(newRoleType) {
        this.setState({
            roleType: newRoleType
        })
    }

    async submit() {
        const res = await addNewRole(this.props.userId, this.state)

        if(res !== undefined && res.hasError){
            this.setState({
                hasError: res.hasError
            })
        }
    }

    render() {
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
                                            label="Select"
                                            value={this.state.roleType}
                                            onChange={this.handleChange}
                                            helperText="Please select from the list what closest matches your role"
                                            variant="outlined"
                                            style={{width: '80%', padding: '10px'}}
                                        >
                                            {getRoleTypes().map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
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
                                            rows={4}
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
                                                   onChange={this.handleChange}
                                                   style={{width: '80%', padding: '10px'}}
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={{marginTop: '20px'}}>
                                        <InputLabel htmlFor="projectCode">Project Code</InputLabel>
                                        <TextField id="projectCode"
                                                   aria-describedby="What project is the role for?"
                                                   variant="outlined"
                                                   onChange={this.handleChange}
                                                   style={{width: '80%', padding: '10px'}}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <StyledButton onClick={this.submit}>
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

const mapStateToProps = (state) => {
    console.log(state);
    return {
        userId: state.auth.user.id,
    };
}

export default connect(mapStateToProps)(AddNewRole);