import React from "react";
import Grid from "@material-ui/core/Grid";
import TitleContainer from "../shared/TitleContainer";
import Paper from "@material-ui/core/Paper";
import Application from "../my-applications/Application";
import {retrieveAllAccounts} from "../../services/accountService";
import CircularProgress from "@material-ui/core/CircularProgress";
import Error from "../shared/Error";
import AccountImage from "../pages/AccountImage";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AccountItem from "./AccountItem";

class SearchAccounts extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            accountList: [],
            loading: true,
            hasError: false
        }
    }

    async componentDidMount() {
        this.setState({
            loading: true
        })
        const res = await retrieveAllAccounts();

        console.log(res);

        if (res.hasError) {
            this.setState({
                loading: false,
                hasError: true
            })
        } else {
            this.setState({
                loading: false,
                accountList: res.accountList
            })
        }
    }


    render() {
        return (
            <Grid container>
                <TitleContainer title={'Search Accounts'}/>
                <Paper style={{width: '100%', minHeight: '350px', maxHeight: '400px', overflow: 'auto'}}>
                    {renderAccounts(this.state.loading,
                        this.state.hasError, this.state.accountList)}
                </Paper>
            </Grid>
        )
    }
}

function renderAccounts(loading, hasError, accountList) {

    if (loading) {
        return (
            <CircularProgress style={{marginTop: '20px'}}/>
        )
    }
    if (hasError) {
        return (
            <Error/>
        )
    }

    return (
        <Grid container>
            {
                accountList.map(account => {
                    return (
                        <AccountItem account={account}/>
                    )
                })
            }
        </Grid>
    )
}


export default SearchAccounts;
