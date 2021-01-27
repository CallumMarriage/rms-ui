import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Typography} from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";

import "./NavbarOption.css"
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    button: {
        textAlign: 'center',
        color: theme.palette.secondary.main,
        width: '100%',
        minHeight: '50px',
        height: 'fit-content',
        "&.active": {
            backgroundColor: 'black',
        },
    },
}));

const CapgeminiBlueTypography = withStyles((theme) => ({
    root: {
        color: theme.palette.secondary.main,
        display: "initial",
        fontSize: 14,
        textTransform: 'none'
    }
}))(Typography);

function conditionalRenderNumber(number, loading) {
    if (number === undefined) {
        return (<div/>)
    }
    let Value = () => {
        return (
            <CircularProgress style={{color: 'white'}}/>
        )
    }

    if (!loading) {
        Value = () => {
            return (
                <CapgeminiBlueTypography variant={"h6"}>
                    {number}
                </CapgeminiBlueTypography>
            )
        }
    }

    return (
        <Value/>
    )

}


export default function NavbarOption(props) {
    const classes = useStyles();
    const TheIcon = props.icon;

    return (
        <Button className={classes.button}
                href={props.link}>
            <Grid container>

                <Grid item xs={12} lg={3}>
                    {props.children}
                    <TheIcon/>
                </Grid>
                <Grid item xs={9} lg={7}>
                    <CapgeminiBlueTypography variant="body2">
                        {props.title}
                    </CapgeminiBlueTypography>
                </Grid>
                <Grid item xs={2} lg={2}>
                    {conditionalRenderNumber(props.number, props.loading)}
                </Grid>
            </Grid>

        </Button>
    )
}