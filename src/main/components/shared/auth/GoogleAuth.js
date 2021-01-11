import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {signIn, signOut} from "../../../actions";
import Button from "@material-ui/core/Button";
import {retrieveRoleInfo} from "../../../services/roleService";
import {handleInternalLogin} from "../../../services/userService";

class GoogleAuth extends Component {
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

    onAuthChange = async (auth, isSignedIn) => {
        if (isSignedIn) {
            const googleId = auth.currentUser.get().getBasicProfile().getId();

            let userDetails = await this.retrieveUserDetails(googleId);

            if(userDetails === undefined){
                userDetails = await handleInternalLogin(googleId);
                if(userDetails === undefined){
                    return;
                }
            }



            this.props.signIn(
                userDetails.user,
                userDetails.currentRole,
                userDetails.currentAccount,
                userDetails.currentProject);
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = async () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    };

    async retrieveUserDetails(googleId) {
        let userInfo = await retrieveRoleInfo(googleId);

        if(userInfo.hasError){
            return;
        }

        const user = userInfo.user;
        const currentProject = userInfo.currentProject;
        const currentAccount = userInfo.currentAccount;
        const currentRole = userInfo.currentRole;
        return {user, currentProject, currentAccount, currentRole}
    }

    // helper function
    renderAuthButton() {
        if (this.props.isSignedIn === null || !this.props.isSignedIn) {
            return (
                <button onClick={this.onSignInClick}>
                    Sign In
                </button>
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

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);