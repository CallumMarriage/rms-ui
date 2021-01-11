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
            numOfApps: 0
        };
    }


    async componentDidMount() {
        const userId = this.props.userId;

        if (userId === undefined || userId == null) {
            return;
        }
        const res = await retrieveNumOfApplications(userId);

        this.setState({
            numOfApps: res.numOfApplications
        })
    }

    render() {

        const numOfApps = this.state.numOfApps

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

                    <NavbarOption link="/MyApplications"
                                  icon={EmailIcon}
                                  title={"My Applications"}
                                  number={numOfApps}/>

                </Grid>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId
    };
}

export default connect(mapStateToProps)(withStyles(styles)(Navbar));