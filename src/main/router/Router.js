import {Route, Switch} from "react-router-dom";
import EmployeeRoute from "./EmployeeRoute";
import Home from "../components/home/Home";
import MyCapgeminiCv from "../components/my-cap-cv/MyCapgeminiCv";
import FindRoles from "../components/find-roles/FindRoles";
import NotFound from "../components/not-found/NotFound";
import Grid from "@material-ui/core/Grid";
import React from "react";
import Login from "../components/shared/auth/Login";
import LoginRoute from "./LoginRoute";
import MyApplications from "../components/my-applications/MyApplications";
import ViewRole from "../components/pages/ViewRole";
import Account from "../components/pages/Account";
import Project from "../components/pages/Project";

export default function MyRouter(props){
    return(
        <Grid item xs={11}>
            <Switch>
                <LoginRoute exact path="/Login"
                            component={Login}
                            appProps={{
                                isSignedIn:  props.isSignedIn
                            }}
                />
                <EmployeeRoute exact path="/"
                               component={Home}
                               appProps={{
                                   isSignedIn:  props.isSignedIn
                               }}
                />
                {/*<Route exact path="/Login" component={Login}/>*/}
                <EmployeeRoute exact path="/MyCapgeminiCV"
                               component={MyCapgeminiCv}
                               appProps={{
                                   isSignedIn: props.isSignedIn
                               }}
                />
                <EmployeeRoute exact path="/FindRoles"
                               component={FindRoles}
                               appProps={{
                                   isSignedIn:  props.isSignedIn
                               }}/>
                <EmployeeRoute exact path="/MyApplications"
                               component={MyApplications}
                               appProps={{
                                   isSignedIn:  props.isSignedIn
                               }}/>

                <EmployeeRoute path="/Account/:accountId/Project/:projectId/ViewRole/:id"
                               component={ViewRole}
                               appProps={{
                                   isSignedIn:  props.isSignedIn
                               }}/>

                <EmployeeRoute path="/Account/:accountId/Project/:projectId"
                               component={Project}
                               appProps={{
                                   isSignedIn:  props.isSignedIn
                               }}/>

                <EmployeeRoute path="/Account/:accountId"
                               component={Account}
                               appProps={{
                                   isSignedIn:  props.isSignedIn
                               }}/>

                {/*<EmployeeRoute exact path="/AccountDirectorSpace" component={AccountDirectorSpace}/>*/}
                {/*<EmployeeRoute exact path="/ProjectManagerSpace" component={ProjectManagerSpace}/>*/}
                <Route path="*" exact={true} component={NotFound}/>
            </Switch>
        </Grid>
    )
}