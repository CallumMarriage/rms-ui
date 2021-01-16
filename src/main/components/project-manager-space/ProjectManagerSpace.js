import React from "react";
import Grid from "@material-ui/core/Grid";
import TitleContainer from "../shared/TitleContainer";
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

class ProjectManagerSpace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Grid container>
                <TitleContainer title={'Project and Account Management'}/>
                <Grid item xs={6}>
                    <Link to={"/AddNewAccount"}>
                        <Paper>

                            <Button>
                                <Typography variant={"h6"}>
                                    Add a new Account
                                </Typography>
                            </Button>
                        </Paper>
                    </Link>

                </Grid>

                <Grid item xs={12}>
                </Grid>

                <Grid item xs={6}>
                    <Paper>
                        <Typography variant={"h6"}>
                            Your current accounts
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={6}>
                    <Paper>
                        <Typography variant={"h6"}>
                            Your current projects
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default ProjectManagerSpace;