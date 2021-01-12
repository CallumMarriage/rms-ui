import React from "react";
import Grid from "@material-ui/core/Grid";
import TitleContainer from "../shared/TitleContainer";
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";
import {getRoleTypes} from "../shared/RoleTypes";

class ViewRole extends React.Component {

    render() {
        const { role } = this.props.location.state

        const roleType = getRoleTypes()
            .find(roleT => roleT.value === role.roleType).label

        return(
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
            </Grid>
        )

    }
}
export default ViewRole;