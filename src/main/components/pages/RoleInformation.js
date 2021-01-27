import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import {Button, Typography} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Error from "../shared/Error";
import {applyForRole, hasUserAlreadyApplied} from "../../services/applicationService";

class RoleInformation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            hasError: false,
            userAlreadyApplied: false
        }
    }

    async componentDidMount() {
        const res = await hasUserAlreadyApplied(this.props.role.id, this.props.userId);

        if(res.hasError){
            this.setState({
                loading: false,
                hasError: true
            })
        } else {
            this.setState({
                loading: false,
                hasError: false,
                userAlreadyApplied: res.userAlreadyApplied
            })
        }
    }

    RenderApplyButton(){

        if (this.state.loading) {
            return (
                <CircularProgress style={{marginTop: '20px'}}/>
            )
        } else if (this.state.hasError) {
            return (
                <Error/>
            )
        }

        if(this.props.role.isRoleOpen === true){
            return (
                <ListItem>
                    <Grid item xs={12}>
                        <StyledButton onClick={this.apply.bind(this)}>
                            <Typography variant={"body1"}>
                                Apply
                            </Typography>
                        </StyledButton>
                    </Grid>
                </ListItem>
            )
        } else {
            return null;
        }
    }

    async apply() {
        let res = await applyForRole(this.props.userId, this.props.role)

        if (res.hasError) {
            return (
                alert("Failed to apply for role")
            )
        } else {
            return (
                alert("Successfully applied to role")
            )
        }
    }

    renderIsFilled(isRoleOpen){
        if(isRoleOpen === false){
            return 'Yes'
        } else {
            return 'No'
        }
    }

    render() {
        return (
            <StyledPaper>
                <List>
                    <Grid container>
                        <ListItem>
                            <Grid item xs={12}>
                                <Typography variant={'h6'}>
                                    Role information
                                </Typography>
                            </Grid>
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <Grid item xs={6}>
                                <Typography variant={'body1'} color={"primary"}>
                                    Account Name
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant={'body1'}>
                                    {this.props.role.accountName}
                                </Typography>
                            </Grid>
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <Grid item xs={6}>
                                <Typography variant={'body1'} color={"primary"}>
                                    Project Name
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant={'body1'}>
                                    {this.props.role.projectName}
                                </Typography>
                            </Grid>
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <Grid item xs={6}>
                                <Typography variant={'body1'} color={"primary"}>
                                    Desired Grade
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant={'body1'}>
                                    A6
                                </Typography>
                            </Grid>
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <Grid item xs={6}>
                                <Typography variant={'body1'} color={"primary"}>
                                    Role Type
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant={'body1'}>
                                    {this.props.roleType.label}
                                </Typography>
                            </Grid>
                        </ListItem>
                        <Divider variant="inset"/>
                        <ListItem>
                            <Grid item xs={6}>
                                <Typography variant={'body1'} color={"primary"}>
                                    Role Start Date
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant={'body1'}>
                                    {this.props.role.startDate}
                                </Typography>
                            </Grid>
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <Grid item xs={6}>
                                <Typography variant={'body1'} color={"primary"}>
                                    Role End Date
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant={'body1'}>
                                    {this.props.role.endDate}
                                </Typography>
                            </Grid>
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <Grid item xs={6}>
                                <Typography variant={'body1'} color={"primary"}>
                                    Currently filled
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant={'body1'}>
                                    {this.renderIsFilled(this.props.role.isRoleOpen)}
                                </Typography>
                            </Grid>
                        </ListItem>
                        <Divider/>
                        {this.RenderApplyButton()}
                    </Grid>
                </List>
            </StyledPaper>
        )
    }
}


export default RoleInformation;

const StyledPaper = withStyles((theme) => ({
    root: {
        width: '80%',
        padding: '5%',
        margin: 'auto'
    }
}))(Paper)

const StyledButton = withStyles((theme) => ({
        root: {
            marginTop: '2%',
            width: '100%',
            height: '50px',
            backgroundColor: theme.palette.primary.main,
            color: 'white'
        }
    })
)(Button)