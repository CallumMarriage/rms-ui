import React from "react";
import Grid from "@material-ui/core/Grid";
import TitleContainer from "../../shared/TitleContainer";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import {FormControl} from "@material-ui/core";

const roleTypes = [
    {
        value: 'SoftwareEngineer',
        label: 'Software Engineer'
    },
    {
        value: 'Tester',
        label: 'Tester'
    },
    {
        value: 'ProjectManager',
        label: 'Project Manager'
    },
    {
        value: 'BusinessAnalyst',
        label: 'Business Analyst'
    },
    {
        value: 'Researcher',
        label: 'Researcher'
    },
    {
        value: 'Other',
        label: 'Other'
    }
]

class AddNewRole extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: null,
            endDate: null,
            roleName: null,
            roleDescription: null,
            roleType: roleTypes[0].value,
            projectCode: null,
            accountNumber: null
        };
    }

    handleChange = (event) => {
        this.setRoleType(event.target.value);
    }

    setRoleType(newRoleType) {
        this.setState({
            roleType: newRoleType
        })
    }

    render() {
        return (
            <Grid container>
                <TitleContainer title={"Add a new Role"}/>
                    <InputLabel htmlFor="roleName">Role Name</InputLabel>
                    <Input id="roleName" aria-describedby="What was your role on the project"/>

                    <TextField
                        id="outlined-select-roleType"
                        select
                        label="Select"
                        value={this.state.roleType}
                        onChange={this.handleChange}
                        helperText="Please select from the list what closest matches your role"
                        variant="outlined"
                    >
                        {roleTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
            </Grid>
        );
    }
}

export default AddNewRole;