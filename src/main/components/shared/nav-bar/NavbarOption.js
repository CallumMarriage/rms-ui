import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Typography } from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = makeStyles((theme) => ({
    button: {
        textAlign: 'center',
        color: theme.palette.text.primary,
        width: '100%',
        height: '50px',
        marginTop: '-15px',
        borderBottom: 'Solid black 1px'
    },
}));

const CapgeminiBlueTypography = withStyles({
    root: {
        color: "#0070AD",
        display: "initial"
    }
})(Typography);


export default function NavbarOption(props) {
    const classes = useStyles();
    const TheIcon = props.icon;  // note the capital first letter!

    console.log(props.title)
    return (
        <Grid item xs={12} container>
            <Button className={classes.button}
                    href={props.link}>

                <Grid item xs={4}>
                    {props.children}
                    <TheIcon/>
                </Grid>
                <Grid item xs={4}>
                    <CapgeminiBlueTypography variant="body2">
                        {props.title}
                    </CapgeminiBlueTypography>
                </Grid>
                <Grid item xs={4}>
                    <div>{props.number}</div>
                </Grid>
            </Button>
        </Grid>
    )
}