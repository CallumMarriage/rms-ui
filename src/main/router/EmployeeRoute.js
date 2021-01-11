import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export default function EmployeeRoute({ component: C, appProps, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => appProps.isSignedIn
                    ? <C {...props} {...appProps} />
                    : <Redirect
                        to={`/Login?redirect=${props.location.pathname}${props.location.search}`}
                    />}
        />
    );
}