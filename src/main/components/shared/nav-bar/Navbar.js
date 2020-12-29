import {BrowserRouter as Router, Link} from "react-router-dom";
import React from "react";

function Navbar(props){
    return (
        <ul>
            <li>
                <Link to="/">Home Page</Link>
            </li>
            <li>
                <Link to="/YourRole">Your Role</Link>
            </li>
            <li>
                <Link to="/FindRoles">Find Roles</Link>
            </li>
            <li>
                <Link to="/AccountDirectorSpace">Account Director</Link>
            </li>
            <li>
                <Link to="/ProjectManagerSpace">Project Management</Link>
            </li>
        </ul>
    )
}

export default Navbar;