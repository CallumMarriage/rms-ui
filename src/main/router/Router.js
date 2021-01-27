import {Route, Switch} from "react-router-dom";
import EmployeeRoute from "./EmployeeRoute";
import Home from "../components/home/Home";
import MyCapgeminiCv from "../components/my-cap-cv/MyCapgeminiCv";
import FindRoles from "../components/find-roles/FindRoles";
import NotFound from "../components/not-found/NotFound";
import Grid from "@material-ui/core/Grid";
import React from "react";
import MyApplications from "../components/my-applications/MyApplications";
import ViewRole from "../components/pages/ViewRole";
import Account from "../components/pages/Account";
import Project from "../components/pages/Project";
import AddNewRole from "../components/my-cap-cv/add-new-role/AddNewRole";
import SearchAccounts from "../components/search-accounts/SearchAccounts";
import ProjectManagerSpace from "../components/project-manager-space/ProjectManagerSpace";
import AddNewAccount from "../components/project-manager-space/add-new-account/AddNewAccount";
import AddNewProject from "../components/project-manager-space/add-new-project/AddNewProject";
import SignUp from "../components/login/SignUp";
import ProjectManagerRoute from "./ProjectManagerRoute";
import Unauthorised from "../components/not-found/Unauthorised";
import SignUpRoute from "./SignUpRoute";
import ResourceManagerRoute from "./ResourceManagerRoute";
import ViewCandidates from "../components/resource-manager-space/view-candidates/ViewCandidates";
import Approvals from "../components/resource-manager-space/approvals/Approvals";
import Candidate from "../components/resource-manager-space/view-candidates/Candidate";

export default function MyRouter(props) {
    return (
        <Grid item xs={11}>
            <Switch>
                <SignUpRoute exact path={'/SignUp'}
                               component={SignUp}
                               appProps={{
                                   isSignedIn: props.isSignedIn,
                                   userExists: props.userExists
                               }}/>
                { createEmployeeRoute("/", props, Home) }

                { createEmployeeRoute("/SignUp", props, Home)}
                { createEmployeeRoute("/MyCapgeminiCV", props, MyCapgeminiCv) }
                { createEmployeeRoute("/MeetOurResourceManagers", props, MyCapgeminiCv) }
                { createEmployeeRoute("/AddNewRole", props, AddNewRole) }
                { createEmployeeRoute("/SearchAccounts", props, SearchAccounts) }
                { createEmployeeRoute("/ResourceManager/:id", props, MyCapgeminiCv) }

                { createEmployeeRoute("/Applications/FindRoles", props, FindRoles) }
                { createEmployeeRoute("/Applications/MyApplications", props, MyApplications) }

                { createEmployeeRoute("/Account/:accountId/Project/:projectId/ViewRole/:id", props,  ViewRole ) }
                { createEmployeeRoute("/Account/:accountId/Project/:projectId", props, Project) }
                { createEmployeeRoute("/Account/:accountId", props, Account) }

                { createResourceManagerRoute("/ResourceManagement/Approvals", props, Approvals)}
                { createResourceManagerRoute("/ResourceManagement/ViewCandidates", props, ViewCandidates)}

                { createResourceManagerRoute("/ViewCandidates/Candidate/:candidateId", props,
                    Candidate)}

                { createProjectManagerRoute("/ProjectManagement", props, ProjectManagerSpace) }
                { createEmployeeRoute("/ProjectManagement/AddNewAccount", props, AddNewAccount) }
                { createEmployeeRoute("/ProjectManagement/AddNewProject", props, AddNewProject) }
                <Route path="/Unauthorised" exact={true} component={Unauthorised}/>
                <Route path="*" exact={true} component={NotFound}/>
            </Switch>
        </Grid>
    )
}

function createProjectManagerRoute(path, props, component) {

    let userType = null;
    if(props.user !== undefined && props.user !== null ){
        userType = props.user.userType;
    }

    return (
        <ProjectManagerRoute exact path={path}
                             component={component}
                             appProps={{
                                 isSignedIn: props.isSignedIn,
                                 userExists: props.userExists,
                                 userType: userType
                             }}/>
    )
}

function createResourceManagerRoute(path, props, component) {

    let userType = null;
    if(props.user !== undefined && props.user !== null ){
        userType = props.user.userType;
    }

    return (
        <ResourceManagerRoute exact path={path}
                             component={component}
                             appProps={{
                                 isSignedIn: props.isSignedIn,
                                 userExists: props.userExists,
                                 userType: userType
                             }}/>
    )
}

function createEmployeeRoute(path, props, component) {

    return (
        <EmployeeRoute exact path={path}
                       component={component}
                       appProps={{
                           isSignedIn: props.isSignedIn,
                           userExists: props.userExists
                       }}/>
    )
}