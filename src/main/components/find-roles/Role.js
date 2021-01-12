import React from "react";
import {Link} from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import {createMuiTheme, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

import {ThemeProvider} from "styled-components";

import AccountImage from "../pages/AccountImage";

const theme = createMuiTheme({
    typography: {
        h5: {
            fontSize: 12,
        },
        body1: {
            fontWeight: 500,
        },
    },
});

const StyledButton = withStyles({
    root: {
        width: '100%',
        textTransform: 'none'
    },
    label: {
        textTransform: 'none'
    },
})(Button);

const WhiteTypo = withStyles({
    root: {
        color: "#0070AD",
        display: "initial",
        textTransform: 'none'
    }
})(Typography)

export default function Role(props) {

    return (
        <Paper style={{marginTop: '20px', height: 'fit-content', marginBottom: '50px'}}>
            <ThemeProvider theme={theme}>
                <Grid container style={{height: 'match-parent'}}>
                    <Grid item xs={4} style={{height: 'match-parent'}}>
                        <AccountImage accountNumber={props.accountNumber}/>

                        <Grid item xs={12} style={{border: 'solid 1px #0070AD'}}>
                            <Link style={{textDecoration: 'none'}} to={{
                                pathname: `/Account/${props.accountNumber}`,
                                state: {account: props}
                            }}>
                                <StyledButton>
                                    <WhiteTypo variant="h5" color="secondary">
                                        {props.accountName}
                                    </WhiteTypo>
                                </StyledButton>
                            </Link>
                        </Grid>

                        <Grid item xs={12} style={{border: 'solid 1px green'}}>

                            <Link style={{textDecoration: 'none'}} to={{
                                pathname: `/Account/${props.accountNumber}/Project/${props.projectCode}`,
                                state: {project: props}
                            }}>
                                <StyledButton>
                                    <WhiteTypo variant="h5" color="secondary">
                                        {props.projectName}
                                    </WhiteTypo>
                                </StyledButton>
                            </Link>
                        </Grid>
                    </Grid>

                    <Grid item xs={8} style={{height: 'match-parent', background: '#ECECEC'}}>

                        <Link style={{textDecoration: 'none'}} to={{
                            pathname: `/Account/${props.accountNumber}/Project/${props.projectCode}/ViewRole/${props.id}`,
                            state: {role: props}
                        }}>
                            <StyledButton>
                                <Grid item xs={6}>
                                    <Typography variant="h5">
                                        {props.roleName}
                                    </Typography>

                                    <Typography variant="h5">
                                        {props.description}
                                    </Typography>

                                    <Typography variant="h5">
                                        {props.startDate}
                                    </Typography>
                                </Grid>
                            </StyledButton>
                        </Link>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </Paper>
    )
}
