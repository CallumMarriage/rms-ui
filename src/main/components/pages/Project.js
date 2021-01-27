import React from "react";

import TitleContainer from "../shared/TitleContainer";
import Error from "../shared/Error";
import {retrieveProjectInfo} from "../../services/projectService";

import Grid from "@material-ui/core/Grid";
import {Button, Typography, withStyles} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import RolesChart from "./charts/RolesChart";

const StyledPaper = withStyles({
    root: {
        width: '90%',
        margin: 'auto',
        padding: '10px'
    }
})(Paper)

const ItemPaper = withStyles({
    root: {
        marginTop: '20px',
        width: ''
    }
})(StyledPaper)

const StyledButton = withStyles({
    root: {
        width: '100%',
        marginTop: '10px'
    }
})(Button)

class Project extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            loading: true,
            hasError: false,
            project: null,
            accountName: props.location.state.accountName,
            projectCode: props.location.state.projectCode,
            roleList: []
        }
    }

    async componentDidMount() {
        const res = await retrieveProjectInfo(this.state.projectCode)

        if (res.hasError) {
            this.setState({
                hasError: true,
                loading: false
            })
        }

        this.setState({
            hasError: false,
            loading: false,
            project: res.targetProject,
            roleList: res.roleList
        })
    }

    render() {

        if (this.state.loading) {
            return (<CircularProgress/>
            )
        }

        if (this.state.hasError) {
            return (
                <Error/>
            )
        }

        const project = this.state.project;
        return (
            <Grid container>
                <TitleContainer title={project.projectName +  ' at ' + this.state.accountName}/>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={12}>
                            {project.description}
                        </Grid>
                    </Grid>
                </Grid>
                {/*<Grid item xs={6}>*/}
                {/*    {*/}
                {/*        AccountLink({*/}
                {/*            accountName: this.state.accountName,*/}
                {/*            accountNumber: project.accountNumber*/}
                {/*        }, AccountItem)*/}
                {/*    }*/}
                {/*</Grid>*/}
                <Grid item xs={12}>
                    <RolesChart targetProject={this.state.project}
                                roleList={this.state.roleList}/>
                </Grid>
            </Grid>
        )

    }
}

function AccountItem(props) {
    return (
        <Button>
            {props.props.accountName}
        </Button>
    )
}

function RoleItem(props) {
    return (
        <ItemPaper>
            <StyledButton>

                <Typography variant={"h6"}>
                    {props.props.roleName}
                </Typography>
            </StyledButton>

        </ItemPaper>
    )
}

export default Project;