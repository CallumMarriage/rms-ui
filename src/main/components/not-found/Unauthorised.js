import React from "react";
import {Typography} from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
function Unauthorised() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <ErrorIcon style={{height: '150px', width: '150px', color: 'red'}}/>
            </Grid>
            <Grid item xs={12}>
                <Typography variant={'body1'}>
                    You are not authorized to visit this page.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Link to={"/"}>
                    <Button>
                        Return home here
                    </Button>
                </Link>
            </Grid>
        </Grid>
    );
}

export default Unauthorised;