import React from "react";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        paddingTop: '1%',
        paddingBottom: '1%',
        borderRadius: 0,
        textAlign: 'center',
        width: '100%',
        color: 'white',
        position: "fixed",
        backgroundColor: '#2B0A3D',
        bottom: 0,
        lef:0
    },
}));


export default function Footer(props){
    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.paper}>
                Footer
            </Paper>
        </div>

    )
}