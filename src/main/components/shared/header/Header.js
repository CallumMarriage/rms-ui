import React from "react";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Header(props){
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            Capgemini RMS
        </Paper>

    )
}