import React from 'react';

import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

import {connect} from 'react-redux';

import Header from "./components/shared/header/Header";
import Footer from "./components/shared/footer/Footer";
import Navbar from "./components/shared/nav-bar/Navbar";
import MyRouter from "./router/Router";
import CircularProgress from "@material-ui/core/CircularProgress";

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
                                <Grid item xs={3}>
                                    <Navbar/>
                                </Grid>
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
            <Grid item xs={9}>
                {RenderRouter(props)}
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