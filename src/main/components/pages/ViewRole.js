import React from "react";
import {connect} from "react-redux";

import {getRoleTypes} from "../shared/RoleTypes";
import Error from "../shared/Error";
import TitleContainer from "../shared/TitleContainer";
import {retrieveRole} from "../../services/roleService";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import RoleInformation from "./RoleInformation";

class ViewRole extends React.Component {

    constructor(props) {
        super(props);

        let role = null;

        if (props.location.state !== undefined) {
            role = props.location.state.role;
        }

        this.state = {
            userAlreadyApplied: false,
            hasError: false,
            loading: true,
            role: role
        }
    }

    async componentDidMount() {

        let shouldRequestData = false;
        let roleId = null;

        if (this.props.location.state === undefined) {
            shouldRequestData = true;
            roleId = this.props.match.params.id;
        } else if (this.state.role.dataMissing) {
            shouldRequestData = true;
            roleId = this.state.role.id;
        }

        if (shouldRequestData) {
            const res = await retrieveRole(roleId);

            if (res === undefined || res.hasError) {
                this.setState({
                    loading: false,
                    hasError: true
                })
                return;
            }

            this.setState({
                role: res
            })
        }

        this.setState({
            loading: false,
            hasError: false,
        })
    }

    render() {

        const role = this.state.role;

        if (this.state.loading) {
            return <CircularProgress/>
        }

        if (this.state.hasError) {
            console.log('here')
            return (
                <Error/>
            );
        }

        const roleType = getRoleTypes()
            .find(roleT => roleT.value === role.roleType);

        if (roleType === undefined) {
            return (
                <Error/>
            )
        }

        return (
            <Grid container style={{marginBottom: '50px'}}>
                <TitleContainer title={`${role.roleName} at ${role.projectName}`}/>
                <Grid item xs={7}>
                    <Paper>
                        <Typography variant={'h5'}>
                            Role responsibilities
                        </Typography>
                        <Typography variant={'body1'} style={{padding: '40px', textAlign: 'left'}}>
                            {role.description}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                    <RoleInformation role={role}
                                     userId={this.props.userId}
                                     roleType={roleType}
                    />
                </Grid>
            </Grid>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.user.user.id,
    };
}

export default connect(mapStateToProps)(ViewRole);
