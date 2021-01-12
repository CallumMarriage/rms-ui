import React from "react";
import Grid from "@material-ui/core/Grid";
import TitleContainer from "../shared/TitleContainer";
import Paper from "@material-ui/core/Paper";
import Application from "../my-applications/Application";
import {retrieveAllAccounts} from "../../services/accountService";
import CircularProgress from "@material-ui/core/CircularProgress";
import Error from "../shared/Error";

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

        if(res.hasError){
            this.setState({
                loading: false,
                hasError: true
            })
        } else {
            console.log('here')
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

function renderAccounts(loading, hasError, accountList){

    if(loading){
        return (
            <CircularProgress style={{marginTop: '20px'}}/>
        )
    }
    if(hasError){
        return (
            <Error/>
        )
    }

    return(
        <div>
            {
                accountList.map(account => {
                    return (
                        <div className={'row'} key={account.accountNumber}>
                            <p>{account.accountName}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}


export default SearchAccounts;
