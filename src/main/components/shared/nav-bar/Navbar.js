import React from "react";
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
import BusinessIcon from '@material-ui/icons/Business';
import Divider from "@material-ui/core/Divider";
import PeopleIcon from '@material-ui/icons/People';
import DoneAllIcon from '@material-ui/icons/DoneAll';

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
        if (this.props.user == null) {
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

        if (this.props.isSignedIn) {
            return (
                <Paper className={this.props.classes.paper}>
                    <NavbarOption link={"/"}
                                  icon={HomeIcon}
                                  title={"Home Page"}/>
                    <Divider/>
                    <NavbarOption link="/MyCapgeminiCV"
                                  icon={ViewListIcon}
                                  title={"My Capgemini CV"}/>
                    <Divider/>
                    <NavbarOption link="/Applications/FindRoles"
                                  icon={LocalGroceryStore}
                                  title={"Find a new Role"}/>
                    <Divider/>
                    <NavbarOption link="/SearchAccounts"
                                  icon={SearchIcon}
                                  title={"Search Accounts"}/>

                    {
                        RenderProjectManagementComponent(
                            "/ProjectManagement",
                            BusinessIcon,
                            "Manage Projects", this.props.user.userType
                        )
                    }
                    {
                        RenderResourceManagerComponent(
                            "/ResourceManagement/ViewCandidates",
                            PeopleIcon,
                            "View Candidates",
                            this.props.user.userType
                        )
                    }

                    {
                        RenderResourceManagerComponent(
                            "/ResourceManagement/Approvals",
                            DoneAllIcon,
                            "Approvals",
                            this.props.user.userType
                        )
                    }

                    <Divider/>
                    <NavbarOption link="/Applications/MyApplications"
                                  icon={EmailIcon}
                                  title={"My Applications"}
                                  number={numOfApps}
                                  loading={this.state.loading}/>
                    <Divider/>

                </Paper>
            )
        } else {
            return (
                <div/>
            )
        }
    }
}

function RenderProjectManagementComponent(link, icon, title, userType) {
    if (userType === 'PROJECT_MANAGER') {
        return (
            <div>
                <Divider />
                <NavbarOption link={link}
                              icon={icon}
                              title={title}/>
            </div>
        )
    } else {
        return null;
    }
}

function RenderResourceManagerComponent(link, icon, title, userType,) {
    if (userType === 'RESOURCE_MANAGER') {
        return (
            <div>
                <Divider />
                <NavbarOption link={link}
                              icon={icon}
                              title={title}/>
            </div>
        )
    } else {
        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        isSignedIn: state.auth.isSignedIn,
    };
}

export default connect(mapStateToProps)(withStyles(styles)(Navbar));