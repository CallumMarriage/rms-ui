import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from '@material-ui/core/styles';
import blueGrey from "@material-ui/core/colors/blueGrey";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '100%',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    button: {
        padding: theme.spacing(5),
        textAlign: 'center',
        color: theme.palette.text.primary,
        width: '100%',
        height: '100px',
        backgroundColor: "#80B8D6"
    },
    paperBody: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        marginTop: '15px',
        textAlign: 'center',
        width: '100%'
    },
}));

function Home(props) {

    const classes = useStyles();

    return (
        <div id="main">
            <Grid container spacing={3}>
                <Grid container>
                    <Grid item xs={3}/>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>Home Page</Paper>
                        <Paper className={classes.paperBody}>
                            <Grid container item xs={12} spacing={3}>
                                <Grid item xs={6} spacing={3}>
                                    <Button href="/FindRoles" className={classes.button}>Find Roles</Button>
                                </Grid>
                                <Grid item xs={6} spacing={3}>
                                    <Button href="/YourRole" className={classes.button}>Your Role</Button>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} spacing={3}>
                                <Grid item xs={6} spacing={3}>
                                    <Button href="/AccountDirectorSpace" className={classes.button}>Account Director
                                        Space</Button>
                                </Grid>
                                <Grid item xs={6} spacing={3}>
                                    <Button href="/ProjectManagerSpace" className={classes.button}>Project Manager
                                        Space</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home;