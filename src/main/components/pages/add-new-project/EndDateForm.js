import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import React from "react";

export default function EndDateForm(props) {
    return (
        <FormGroup row>
            <FormControlLabel
                control={
                    <Switch checked={props.currentRole}
                            onChange={props.handleRadioChange}
                            name="currentRole"
                            id="currentRole"/>
                }
                label="Is your current Role"
                style={{padding: '10px', margin: 'auto'}}
            />
        </FormGroup>
    )
}