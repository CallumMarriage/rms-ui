import {Typography} from "@material-ui/core";
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import "./TitleContainer.css"

const TitleTyp = withStyles({
    root: {
        color: "white",
        align: 'center',
        height: '100%',
        marginTop: '6%'
    }
})(Typography)


export default function TitleContainer(props) {

    return (
        <div className={"titleContainer"} style={{height: props.height}}>
            <TitleTyp variant={"h4"}>
                {props.title}
            </TitleTyp>
        </div>
    )
}