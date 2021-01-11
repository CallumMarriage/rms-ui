import React, {Component} from "react";
import {connect} from "react-redux";
import {signIn} from "../../../actions";

class Login extends Component {

    render() {

        return (
            <div/>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
    };
}

export default connect(mapStateToProps, {signIn})(Login);