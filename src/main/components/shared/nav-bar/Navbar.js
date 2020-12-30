import React from "react";
import Grid from "@material-ui/core/Grid";
import NavbarOption from "./NavbarOption";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import HomeIcon from '@material-ui/icons/Home';
import ViewListIcon from '@material-ui/icons/ViewList';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '80%',
        marginLeft: '30px',
        marginTop: '20px',
        height: '600px'
    }
}));


function Navbar(props) {

    const classes = useStyles();

    return (

        <Paper className={classes.paper}>
            <Grid container spacing={3}>
                <NavbarOption link={"/"}
                              icon={HomeIcon}
                              title={"Home Page"}
                              number={0}/>

                <NavbarOption link="/YourRole"
                              icon={ViewListIcon}
                              title={"Past Roles"}
                              number={0}/>

            </Grid>
        </Paper>

        // <ul>
        //     <li>
        //         <div>
        //             <Button href="/">Home Page</Button>
        //             <div>0</div>
        //         </div>
        //     </li>
        //     <li>
        //         <Button href="/YourRole">Your Role</Button>
        //     </li>
        //     <li>
        //         <Button href="/FindRoles">Find Roles</Button>
        //     </li>
        //     <li>
        //         <Button href="/AccountDirectorSpace">Account Director</Button>
        //     </li>
        //     <li>
        //         <Button href="/ProjectManagerSpace">Project Management</Button>
        //     </li>
        // </ul>
    )
}

export default Navbar;