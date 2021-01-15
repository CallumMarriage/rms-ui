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
import TextField from "@material-ui/core/TextField";

class SearchAccounts extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            accountList: [],
            filteredAccountList: null,
            loading: true,
            hasError: false,
            searchItem: null
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

    handleChange = (event) => {
        this.setState({
            searchItem: event.target.value
        });
        this.setState({
            filteredAccountList: this.state.accountList.filter(account =>
                account.accountName.includes(event.target.value))
        })

    }

    render() {

        let accountList = this.state.accountList;
        if(this.state.filteredAccountList !== null){
            accountList = this.state.filteredAccountList;
        }

        return (
            <Grid container>
                <TitleContainer title={'Search Accounts'}/>
                <Paper style={{
                    width: '100%',
                    minHeight: '350px',
                    maxHeight: '750px',
                    overflow: 'auto',
                    marginBottom: '100px'
                }}>
                    <Grid item xs={12}>
                        <TextField style={{
                            width: '90%',
                            marginTop: '20px',
                            height: '5%'
                        }}
                                   id="outlined-search"
                                   label={"Search By Account Name"}
                                   name={"accountName"}
                                   value={this.state.searchItem}
                                   type="search"
                                   variant="outlined"
                                   onChange={this.handleChange}
                        />
                    </Grid>
                    {renderAccounts(this.state.loading,
                        this.state.hasError, accountList)}
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
        <Grid container style={{marginBottom: '20px'}}>
            {
                accountList.map(account => {
                    return (
                        <AccountItem account={account} key={account.accountCode}/>
                    )
                })
            }
        </Grid>
    )
}


export default SearchAccounts;
