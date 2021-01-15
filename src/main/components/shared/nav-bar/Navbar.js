import React from "react";
import Grid from "@material-ui/core/Grid";
import NavbarOption from "./NavbarOption";
import Paper from "@material-ui/core/Paper";
import HomeIcon from '@material-ui/icons/Home';
import ViewListIcon from '@material-ui/icons/ViewList';
import {LocalGroceryStore} from "@material-ui/icons";
import EmailIcon from '@material-ui/icons/Email';
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import {retrieveNumOfApplications} from "../../../services/applicationService";
import SearchIcon from '@material-ui/icons/Search';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        backgroundColor: '#0070AD',
        fontcolor: 'white',
        width: '60%',
        marginLeft: '60px',
        marginTop: '60px',
        height: '500px'
    }
});


class Navbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            numOfApps: '0'
        };
    }


    async componentDidMount() {
        if(this.props.user == null){
            return;
        }

        console.log("Making request to receive number of apps")
        const res = await retrieveNumOfApplications(this.props.user.id);

        this.setState({
            loading: false,
            numOfApps: res.numOfApplications
        })
    }

    render() {

        const numOfApps = this.state.numOfApps
        if(this.props.isSignedIn){
            return (
                <Paper className={this.props.classes.paper}>
                    <Grid container spacing={2}>
                        <NavbarOption link={"/"}
                                      icon={HomeIcon}
                                      title={"Home Page"}/>

                        <NavbarOption link="/MyCapgeminiCV"
                                      icon={ViewListIcon}
                                      title={"My Capgemini CV"}/>

                        <NavbarOption link="/FindRoles"
                                      icon={LocalGroceryStore}
                                      title={"Find a new Role"}/>

                        <NavbarOption link="/SearchAccounts"
                                      icon={SearchIcon}
                                      title={"Search Accounts"}/>

                        <NavbarOption link="/MyApplications"
                                      icon={EmailIcon}
                                      title={"My Applications"}
                                      number={numOfApps}
                                      loading={this.state.loading}/>

                    </Grid>
                </Paper>
            )
        } else {
            return (
                <div/>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps)(withStyles(styles)(Navbar));