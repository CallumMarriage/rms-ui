import React from 'react';
import {connect} from "react-redux";

import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import {retrieveResourceManagerName} from "../../services/userService";
import Button from "@material-ui/core/Button";


const StyledButton = withStyles({
    root: {
        border: 'solid 2px #0070AD',
        backgroundColor: '#0070AD',
        margin: '10px',
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
        let role = this.props.role;

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
    return (
        <Grid container style={{marginBottom: '20px'}}>
            <Grid item xs={4}>
                {retrieveButton(role, 'Your Current Role')}
            </Grid>
            <Grid item xs={4}>
                {retrieveButton(project, 'Current Project')}
            </Grid>
            <Grid item xs={4}>
                {retrieveButton(account, 'Current Account')}
            </Grid>
            <Grid item xs={4}>
                {retrieveButton(resourceManager, 'Your Resource Manager')}
            </Grid>
        </Grid>
    )
}

function retrieveButton(data, content) {
    console.log(data)
    if (data == null) {
        return (
            <StyledButton disable={true}>
                <PrimaryTyp variant={"h4"}>
                    {
                        content
                    }
                </PrimaryTyp>
            </StyledButton>
        )
    } else {
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
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        user: state.auth.user,
        currentRole: state.auth.currentRole,
        currentAccount: state.auth.currentAccount,
        currentProject: state.auth.currentProject
    };
}

export default connect(mapStateToProps)(YourRole);