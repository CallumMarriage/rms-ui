import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export default function AccountManagerRoute({ component: C, appProps, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                appProps.accountManager && appProps.isSignedIn
                    ? <C {...props} {...appProps} />
                    : <Redirect
                        to={`/notFound?redirect=${props.location.pathname}${props.location.search}`}
                    />}
        />
    );
}