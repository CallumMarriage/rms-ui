import React from "react";
import Grid from "@material-ui/core/Grid";
import TitleContainer from "../shared/TitleContainer";
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import MyProjects from "./my-accounts/my-projects/MyProjects";
import MyAccounts from "./my-accounts/MyAccounts";

class ProjectManagerSpace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        // Find all Projects for this user.
        // Find all accounts for those projects
        // Group the projects into accounts
        // Render each set in a block with the account name at the top
        // At the end of each set have a 'add project' button
        // The add project button should redirect to a new screen and pass the account number for that set, and user id
        // When the project is added the user should be redirected back to this screen.
        // The accounts should be rendered on this screen in pages of 3.
        // Above the accounts should be an 'Add account button'
    }

    render() {
        return (
            <Grid container>
                <TitleContainer title={'Project and Account Management'}/>
                <Grid item xs={12}>
                    <Link to={"/ProjectManagement/AddNewAccount"}>
                        <Paper>
                            <Button>
                                <Typography variant={"h6"}>
                                    Add a new Account
                                </Typography>
                            </Button>
                        </Paper>
                    </Link>
                </Grid>
                <Grid item xs={12}>
                    <MyAccounts userId={this.props.userId} />
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.user.user.id,
    };
}

export default connect(mapStateToProps)(ProjectManagerSpace);