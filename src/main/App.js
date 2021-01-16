import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router} from "react-router-dom";

import DateFnsUtils from '@date-io/date-fns';

import Header from "./components/shared/header/Header";
import Footer from "./components/shared/footer/Footer";
import Navbar from "./components/shared/nav-bar/Navbar";
import MyRouter from "./router/Router";

import MuiPickersUtilsProvider from "@material-ui/pickers/MuiPickersUtilsProvider";
import Grid from "@material-ui/core/Grid";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import CircularProgress from "@material-ui/core/CircularProgress";

import './App.css';

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Ubuntu'
    },
    palette: {
        primary: {
            main: '#0070AD',
        },
        secondary: {
            main: '#12ABDB',
        }
    },
});

class App extends React.Component {

    render() {
        return (
            <div className="App">
                    <ThemeProvider theme={theme}>

                        <Grid container spacing={3}>
                            <Router>
                                <Grid item xs={12}>
                                    <Header/>
                                </Grid>
                                <Grid container spacing={0}>
                                    {renderPage(this.props)}

                                </Grid>
                                <Grid item xs={12}>
                                    <Footer/>
                                </Grid>
                            </Router>
                        </Grid>
                    </ThemeProvider>
            </div>
        );
    }
}

function renderPage(props) {
    if (props.isSignedIn) {
        return (
            <Grid container>
                <Grid item xs={3}>
                    <Navbar/>
                </Grid>
                <Grid item xs={9}>
                    {RenderRouter(props)}
                </Grid>
            </Grid>
        );
    } else if (props.loading) {
        return (
            <Grid item xs={8}>
                <CircularProgress style={{margin: 'auto'}}/>
            </Grid>
        )
    }
}

function RenderRouter(props) {
    if (!props.loading) {
        return (<MyRouter isSignedIn={props.isSignedIn}/>)
    } else {
        return (<div>loading...</div>)
    }
}


const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        loading: state.auth.loading
    };
}

export default connect(mapStateToProps)(App);