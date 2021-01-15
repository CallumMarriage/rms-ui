import React from "react";
import {connect} from "react-redux";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import {Typography} from "@material-ui/core";

import YourRole from "./YourRole";

import "./Home.css";
import TitleContainer from "../shared/TitleContainer";

const HomeTitleTyp = withStyles({
    root: {
        color: "white",
        align: 'center',
        height: '100%',
        margin: 'auto',
        marginTop: '8%'
    }
})(Typography)

const SecondaryHeaderTyp = withStyles({
    root: {
        color: '#0070AD',
        padding: '10px',
        fontSize: '1.5em'

    }
})(Typography)

const PrimaryTyp = withStyles({
    root: {
        color: '#OF999C',
        padding: '10px',
        fontSize: '1em'
    }
})(Typography)

class Home extends React.Component {

    render() {

        return (
            <Grid container style={{marginBottom: '40px'}}>
                <TitleContainer title={"My Home Screen"}/>
                <Grid item xs={12}>
                    <Paper>
                        <Grid container>

                            <Grid item xs={6} style={{borderRight: '1px black solid'}}>
                                <SecondaryHeaderTyp>
                                    Welcome
                                </SecondaryHeaderTyp>
                                <PrimaryTyp>
                                    Welcome to the RMS (Resource Management System).
                                    Here you can keep track of your journey through Capgemini and keep a look out for
                                    new
                                    roles.
                                    The aim of this website is to give you more control of your Capgemini destiny.
                                </PrimaryTyp>
                            </Grid>
                            <Grid item xs={6}>
                                <SecondaryHeaderTyp>
                                    Our aim
                                </SecondaryHeaderTyp>
                                <PrimaryTyp>
                                    You can search through our role database and register your interest in the ones you
                                    like.
                                    Once you have 'applied' to a role your resource manager will then handle the
                                    application
                                    process.
                                    When your resource manager has completed the application process they will update
                                    this
                                    service.
                                </PrimaryTyp>
                            </Grid>
                        </Grid>
                        <YourRole userId={this.props.userId}/>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        userId: state.auth.user.id,
    };
}

export default connect(mapStateToProps)(Home);