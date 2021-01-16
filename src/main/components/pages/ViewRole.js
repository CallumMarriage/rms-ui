import React from "react";
import {connect} from "react-redux";

import {getRoleTypes} from "../shared/RoleTypes";
import Error from "../shared/Error";
import TitleContainer from "../shared/TitleContainer";
import {retrieveRole} from "../../services/roleService";
import {applyForRole} from "../../services/applicationService";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

class ViewRole extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userAlreadyApplied: false,
            hasError: false,
            loading: true,
            role: this.props.location.state.role
        }
    }

    async componentDidMount() {
        if (this.state.role.dataMissing) {
            const res = await retrieveRole(this.state.role.id);

            if (res === undefined || res.hasError) {
                this.setState({
                    loading: false,
                    hasError: true
                })
            }

            this.setState({
                loading: false,
                hasError: false,
                role: res
            })
        } else {
            this.setState({
                loading: false
            })
        }
    }

    async apply() {
        const userId = this.props.userId;
        let res = await applyForRole(userId, this.props.location.state.role)

        if (res !== undefined && res.hasError) {
            return (
                alert("Failed to apply for role")
            )
        } else {
            return (
                alert("Successfully applied to role")
            )
        }
    }

    render() {

        const role = this.state.role;

        if (this.state.loading) {
            return <CircularProgress/>
        }

        if (this.state.hasError) {
            return (
                <Error/>
            );
        }

        const roleType = getRoleTypes()
            .find(roleT => roleT.value === role.roleType).label

        return (
            <Grid container>
                <TitleContainer title={`${role.roleName} at ${role.projectName}`}/>
                <Grid item xs={6}>
                    <Paper>
                        <Typography variant={'h5'}>
                            Role responsibilities
                        </Typography>
                        <Typography variant={'body1'}>
                            {role.description}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <Typography variant={'h5'}>
                            {roleType}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={this.apply.bind(this)}>
                        Apply
                    </Button>
                </Grid>
            </Grid>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.user.id,
    };
}

export default connect(mapStateToProps)(ViewRole);
