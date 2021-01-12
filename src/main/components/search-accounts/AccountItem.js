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
        width: '100%'
    }
})(Button)

const StyledPaper = withStyles({
    root: {
        marginTop: '10px',
        margin: 'auto',
        width: '90%',
        minHeight: '50px',
        border: '2px solid black',
        marginBottom: '10px'
    }
})(Paper)

export default function AccountItem(props) {
    const account = props.account
    console.log(account)
    return (
        <Grid item xs={12} key={account.accountCode}>
            <StyledPaper>
                <Link style={{textDecoration: 'none'}} to={{
                    pathname: `/Account/${account.accountCode}`,
                    state: {accountNumber: account.accountCode}
                }}>
                    <StyledButton>
                        <Grid container>
                            <Grid item xs={6}>
                                <AccountImage accountNumber={account.accountCode}/>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant={'h4'}>
                                    {account.accountName}
                                </Typography>
                            </Grid>
                        </Grid>
                    </StyledButton>
                </Link>
            </StyledPaper>
        </Grid>)
}