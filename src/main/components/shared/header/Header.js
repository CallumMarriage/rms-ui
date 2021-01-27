import React from "react";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";

import logo from '../../../images/Capgemini-RMS-logo-latest.png';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Header(){
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <span>
                <img src={logo} alt="Logo" style={{ "width": "280px", "height": "60px"}}/>
            </span>
        </Paper>

    )
}