import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";

function SignUpRoute({component: C, appProps, ...rest}) {
    return (
        <Route
            {...rest}
            render={props => rest.isSignedIn ?
                !appProps.userExists ?
                    <C {...props} {...appProps} />
                    : <Redirect to={{pathname: "/", state: {from: appProps.location}}}/>
                    : <Redirect to={{pathname: "/Login", state: {from: appProps.location}}}/>

            }
        />
    );
}

const mapStateToProps = state => ({
    isSignedIn: state.auth.isSignedIn,
    userExists: state.userExists
});

export default connect(mapStateToProps)(SignUpRoute);