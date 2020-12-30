import React from 'react';

import './App.css';
import YourRole from './components/your-role/YourRole';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Home from "./components/home/Home";
import FindRoles from "./components/find-roles/FindRoles";
import Login from "./components/login/Login";
import AccountDirectorSpace from "./components/account-director-space/AccountDirectorSpace";
import ProjectManagerSpace from "./components/project-manager-space/ProjectManagerSpace";
import NotFound from "./components/not-found/NotFound";
import Grid from "@material-ui/core/Grid";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Header from "./components/shared/header/Header";
import Footer from "./components/shared/footer/Footer";
import Navbar from "./components/shared/nav-bar/Navbar";

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Ubuntu Light'
    }
});

class App extends React.Component {

    render() {
        return (
            <ThemeProvider theme={theme}>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Header/>
                    </Grid>
                    <Grid item xs={3}>
                        <Navbar/>
                    </Grid>
                    <Grid item xs={8}>
                        <Router>
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/YourRole" component={YourRole}/>
                                <Route exact path="/FindRoles" component={FindRoles}/>
                                <Route exact path="/Login" component={Login}/>
                                <Route exact path="/AccountDirectorSpace" component={AccountDirectorSpace}/>
                                <Route exact path="/ProjectManagerSpace" component={ProjectManagerSpace}/>
                                <Route path="*" exact={true} component={NotFound}/>
                            </Switch>
                        </Router>
                    </Grid>
                    <Grid item xs={12}>
                        <Footer/>
                    </Grid>
                </Grid>
            </ThemeProvider>
        );
    }
}

export default App;
