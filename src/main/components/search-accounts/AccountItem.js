import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AccountImage from "../pages/AccountImage";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {withStyles} from "@material-ui/core";
import {Link} from "react-router-dom";

const StyledButton = withStyles({
    root: {
        width: '100%',
        textTransform: 'none'
    }
})(Button)

const StyledPaper = withStyles({
    root: {
        margin: '20px',
        width: '90%',
        height: '240px',
        border: '0.5px solid black'
    }
})(Paper)

export default function AccountItem(props) {
    const account = props.account
    return (
        <Grid item lg={4} md={6} xs={12} key={account.accountCode}>
            <Link style={{textDecoration: 'none'}} to={{
                pathname: `/Account/${account.accountCode}`,
                state: {accountNumber: account.accountCode}
            }}>
                <StyledPaper>

                    <StyledButton>
                        <Grid container>
                            <Grid item xs={12}>
                                <AccountImage accountNumber={account.accountCode}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant={'body1'} style={
                                    {
                                        fontSize: '0.8em',
                                        position: 'relative',
                                        bottom: '0px'
                                    }
                                }>
                                    {account.description}
                                </Typography>
                            </Grid>
                        </Grid>
                    </StyledButton>
                </StyledPaper>
            </Link>
        </Grid>)
}