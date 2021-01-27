import React from 'react';
import {connect} from 'react-redux';

import Header from "./components/shared/header/Header";
import Footer from "./components/shared/footer/Footer";
import Navbar from "./components/shared/nav-bar/Navbar";
import MyRouter from "./router/Router";
import Grid from "@material-ui/core/Grid";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import CircularProgress from "@material-ui/core/CircularProgress";

import './App.css';
import Auth from "./components/shared/auth/Auth";

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Ubuntu'
    },
    palette: {
        primary: {
            light: '#12ABDB',
            main: '#0070AD',
        },
        secondary: {
            main: '#ffffff',
        }
    },
    success: {
        main: '#A9C23F'
    },
    error: {
        main: '#E03E52'
    },

});

class App extends React.Component {

    render() {

        return (
            <div className="App">
                <ThemeProvider theme={theme}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Header/>
                        </Grid>
                        <Grid container spacing={0}>
                            {renderPage(this.props)}
                        </Grid>
                        <Grid item xs={12}>
                            <Footer/>
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </div>
        );
    }
}

function renderPage(props) {

    if (props.isSignedIn) {
        if (props.userExists) {
            return (
                <Grid container>
                    <Grid item xs={12}>
                        <Auth/>
                    </Grid>
                    <Grid item xs={3}>
                        <Navbar/>
                    </Grid>
                    <Grid item xs={9}>
                        {RenderRouter(props)}
                    </Grid>
                </Grid>
            )
        } else if (props.userExists !== null) {
            return (
                <Grid container>
                    {RenderRouter(props)}
                </Grid>
            )
        }
    }
    if (props.loading) {
        return (
            <Grid item xs={8}>
                <Auth/>
                <CircularProgress style={{margin: 'auto'}}/>
            </Grid>
        )
    }
    return (
        <Grid item xs={8}>
            <Auth/>
        </Grid>
    )
}

function RenderRouter(props) {
    return (<MyRouter isSignedIn={props.isSignedIn}
                      userExists={props.userExists}
                      user={props.user}/>)

}


const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        ssoId: state.auth.ssoId,
        loading: state.auth.loading,
        userExists: state.user.userExists,
        user: state.user.user
    };
}

export default connect(mapStateToProps)(App);