import React from 'react';
import {Redirect, Route} from 'react-router-dom';

function ProjectManagerRoute({ component: C, appProps, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => !appProps.isSignUpRoute && !appProps.userExists ?
                <Redirect to={{ pathname: "/SignUp", state: { from: appProps.location} }}/>
                : appProps.userType === 'RESOURCE_MANAGER' ?
                    <C {...props} {...appProps} /> :
                    <Redirect to={{ pathname: "/Unauthorised", state: { from: appProps.location} }}/>


            }
        />
    );
}

export default ProjectManagerRoute;