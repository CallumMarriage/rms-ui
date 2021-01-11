import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Typography} from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";

import "./NavbarOption.css"

const useStyles = makeStyles((theme) => ({
    button: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '100%',
        height: '40px',
        "&.active": {
            backgroundColor: 'black',
        },
    },
}));

const CapgeminiBlueTypography = withStyles({
    root: {
        color: "white",
        display: "initial",
        fontSize: 14,
        textTransform: 'none'
    }
})(Typography);

function conditionalRenderNumber(number) {
    if (number === undefined) {
        return (
            <Grid item xs={2}>
            </Grid>)
    } else {
        return (
            <Grid item xs={2}>
                <CapgeminiBlueTypography variant={"h6"}>
                    {number}
                </CapgeminiBlueTypography>
            </Grid>
        )
    }
}


export default function NavbarOption(props) {
    const classes = useStyles();
    const TheIcon = props.icon;

    return (
        <Grid item xs={12} container>
            <Button className={classes.button}
                    href={props.link}>

                <Grid item xs={3}>
                    {props.children}
                    <TheIcon/>
                </Grid>
                <Grid item xs={7}>
                    <CapgeminiBlueTypography variant="body2">
                        {props.title}
                    </CapgeminiBlueTypography>
                </Grid>
                {conditionalRenderNumber(props.number)}
            </Button>
        </Grid>
    )
}