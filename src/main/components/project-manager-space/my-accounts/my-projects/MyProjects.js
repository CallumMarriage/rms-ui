import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {ProjectLink} from "../../../shared/Links";
import React from "react";
import {retrieveProjectsForProjectManager} from "../../../../services/projectService";
import CircularProgress from "@material-ui/core/CircularProgress";
import Error from "../../../shared/Error";

class MyProjects extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            myProjects: [],
            hasError: false,
            loading: true
        }
    }

    async componentDidMount() {
        let projectManagerId = this.props.projectManagerId;

        if (projectManagerId === null) {
            return;
        }

        const projects = await retrieveProjectsForProjectManager(projectManagerId);

        if (projects.hasError) {
            this.setState({
                hasError: true,
                loading: false
            })
        }

        this.setState({
            myProjects: projects.projects,
            loading: false,
            hasError: false
        })

    }

    render() {
        const myProjects = this.state.myProjects;


        if (this.state.loading) {
            return (
                <CircularProgress style={{marginTop: '20px'}}/>
            )
        } else if (this.state.hasError) {
            return (
                <Error/>
            )
        } else if (myProjects.length === 0) {
            return (
                <div>
                    <Typography variant={"subtitle2"}>
                        You have no projects.
                    </Typography>
                </div>
            )
        }

        return (
            <Grid container>
                <Grid item xs={12}>
                    My Projects
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        {
                            myProjects.map((project) => {
                                return (
                                    <Grid item xs={12} key={project.projectCode}>
                                        {ProjectLink(project, ProjectTile)}
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default MyProjects;

function ProjectTile(project){
    return (
        <Paper>
            <Typography variant={"h6"}>
                {project.props.projectName}
            </Typography>
        </Paper>
    )
}

