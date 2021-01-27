import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import Button from "@material-ui/core/Button";
import {signIn, signOut} from "../../../actions/sso";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";

class SsoAuth extends Component {
    // reference to state has been removed

    componentDidMount() {
        this.load();
    }

    load() {
        window.gapi.load("auth2", () => {
            window.gapi.auth2
                .init({
                    client_id: process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID,
                    scope: "email",
                })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.onAuthChange(this.auth, this.auth.isSignedIn.get());
                    this.auth.isSignedIn.listen(this.onAuthChange);
                });
        });
    }

    onAuthChange = (auth, isSignedIn) => {
        if (isSignedIn) {
            const ssoId = auth.currentUser.get()
                .getBasicProfile()
                .getId();

            this.props.signIn(ssoId);
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = async () => {
        await this.auth.signIn();
        this.onAuthChange(this.auth, true)
    }

    onSignOutClick = () => {
        this.auth.signOut();
        this.props.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if( !this.props.isSignedIn) {
            return (
                <Grid container>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={9}>
                        <Paper style={{margin: 'auto'}}>
                            <Typography variant={'h6'}>
                                Log in using SSO
                            </Typography>
                            <Button onClick={this.onSignInClick}>
                                Sign In
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            );
        } else if (this.props.isSignedIn) {
            return (
                <Button onClick={this.onSignOutClick}>
                    <i className="google icon"/>
                    Sign Out
                </Button>
            );
        }
    }

    render() {
        return (
            <Link to="/" className="item">
                <div>{this.renderAuthButton()}</div>
            </Link>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, {signIn, signOut})(SsoAuth);