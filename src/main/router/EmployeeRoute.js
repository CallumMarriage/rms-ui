import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";

function EmployeeRoute({ component: C, appProps, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => rest.isSignedIn
                    ? <C {...props} {...appProps} />
                    : <Redirect
                        to={`/Login?redirect=${props.location.pathname}${props.location.search}`}
                    />}
        />
    );
}

const mapStateToProps = state => ({
    isSignedIn: state.auth.isSignedIn
});

export default connect(mapStateToProps)(EmployeeRoute);