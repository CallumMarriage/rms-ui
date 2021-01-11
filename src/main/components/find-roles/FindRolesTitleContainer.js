import {Typography} from "@material-ui/core";
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import "./FindRoles.css"

const TitleTyp = withStyles({
    root: {
        color: "white",
        align: 'center',
        height: '100%',
        marginTop: '8%'
    }
})(Typography)


export default function FindRolesTitleContainer() {

    return (
        <div className={"titleContainer"}>
            <TitleTyp variant={"h4"}>
                Find new Roles
            </TitleTyp>
        </div>
    )
}