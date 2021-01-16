import React from "react";

import {Button} from "@material-ui/core";

export default function UpdateAccountImage(props){

    return (
        <div>
            <Button onClick={props.setUpdatingFalse}>
                X
            </Button>
            <input type="file" name="file" onChange={props.onChange.bind(this)}/>
            <Button onClick={() => props.uploadImage()}>
                Upload Image
            </Button>
        </div>
    )
}