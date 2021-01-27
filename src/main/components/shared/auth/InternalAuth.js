import React, {Component} from "react";
import {connect} from "react-redux";
import {updateUserCreds, updateUserExists} from "../../../actions/user";
import {retrieveUserInfo, userExists} from "../../../services/userService";
import {Redirect} from "react-router-dom";
import Grid from "@material-ui/core/Grid";

class InternalAuth extends React.Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.isSignedIn !== this.props.isSignedIn ||
            nextProps.userExists !== this.props.userExists
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        await this.load();
    }

    componentWillUnmount() {
    }

    async load() {

        if (this.props.userExists !== null) {
            return;
        }

        if (this.props.isSignedIn) {

            const res = await userExists(this.props.ssoId);

            if (res.userExist) {
                let userInfo = await retrieveUserInfo(this.props.ssoId);
                if (userInfo.hasError) {
                    return;
                }
                console.log('User exists')
                this.onInternalAuthChangeExists(true, userInfo);
            } else {
                console.log('Registering as user not existing: ' + res)
                this.onInternalAuthChange(false);
            }
        }
    }

    onInternalAuthChangeExists(userExists, userInfo) {
        this.props.updateUserCreds(userInfo.user,
            userInfo.currentRole,
            userInfo.currentProject,
            userInfo.currentAccount)
        this.props.updateUserExists(userExists);
    }

    onInternalAuthChange(userExists) {
        this.props.updateUserExists(userExists);
    }


    render() {

        return (
            <Grid container/>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        userExists: state.user.userExists,
        ssoId: state.auth.ssoId
    };
}

export default connect(mapStateToProps, {updateUserExists, updateUserCreds})(InternalAuth);