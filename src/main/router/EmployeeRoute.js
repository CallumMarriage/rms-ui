import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";

function EmployeeRoute({ component: C, appProps, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => appProps.isSignedIn?
                 !appProps.userExists ?
                <Redirect to={{ pathname: "/SignUp", state: { from: appProps.location} }}/>
                :
                <C {...props} {...appProps} />:
                <Redirect to={{ pathname: "/Login", state: { from: appProps.location} }}/>
            }
        />
    );
}

const mapStateToProps = state => ({
    isSignedIn: state.auth.isSignedIn
});

export default connect(mapStateToProps)(EmployeeRoute);