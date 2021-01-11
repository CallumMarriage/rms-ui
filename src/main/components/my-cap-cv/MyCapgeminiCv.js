import React from 'react';
import {connect} from "react-redux";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import {Typography} from "@material-ui/core";

import Role from "../pages/Role";
import Error from "../shared/Error";
import {retrieveRoleHistory} from "../../services/roleHistoryService";

import './MyCapgeminiCv.css';

const MyCapCvTitle = withStyles({
    root: {
        color: "white",
        align: 'center',
        height: '100%',
        margin: 'auto'
    }
})(Typography)

class MyCapgeminiCv extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roleHistory: [],
            loading: true,
            hasError: false
        };
    }

    async componentDidMount() {
        const userId = this.props.userId;

        const res = await retrieveRoleHistory(userId);

        if (res == null) {
            this.setState({
                loading: false
            })
        } else if (res.hasError){
            this.setState({
                hasError: true,
                error: res.error
            })
        } else {
            this.setState({
                roleHistory: res.rolehistory,
                loading: false
            })
        }

    }

    render() {

        if (this.state.loading) {
            return (<div/>)
        }

        if(this.state.hasError) {
            return (
                <Error/>
            )
        }


        const roleHistory = this.state.roleHistory;

        if(roleHistory === undefined || roleHistory.length === 0){
            return (
                <Paper>
                    <h3>
                        You have no past roles.
                    </h3>
                </Paper>
            );
        }


        return (
            <Grid container>
                <Grid item xs={12}>
                    <div className={"capCvTitleContainer"}>
                        <MyCapCvTitle variant={"h6"}>
                            Your Home Page
                        </MyCapCvTitle>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        {roleHistory.map(role => {
                            console.log(role)
                            return (
                                <Role projectName={role.projectName}
                                      projectCode={role.projectCode}
                                      accountName={role.accountName}
                                      accountNumber={role.accountNumber}
                                      roleName={role.roleName}
                                      description={role.description}
                                      startDate={role.startDate}
                                      endDate={role.endDate}
                                />
                            )
                        })}
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
    };
}

export default connect(mapStateToProps)(MyCapgeminiCv);