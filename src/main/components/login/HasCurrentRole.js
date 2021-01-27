import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import React from "react";

export default function HasCurrentRole(props) {
    return (
        <FormGroup row>
            <FormControlLabel
                control={
                    <Switch checked={props.hasCurrentRole}
                            onChange={props.handleRadioChange}
                            name="hasCurrentRole"
                            id="hasCurrentRole"/>
                }
                label="Are you currently engaged in a role?"
                style={{padding: '10px', margin: 'auto'}}
            />
        </FormGroup>
    )
}