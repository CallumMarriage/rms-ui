import Role from "./Role";
import Paper from "@material-ui/core/Paper";
import React from "react";

import "./RolesContainer.css";

export default function RolesContainer (props) {
    return (
        <Paper className={"rolesContainer"}>
            {props.potentialRoles.map(role => {
                return (
                    <div id={role.id}>
                        <Role projectName={role.projectName}
                              projectCode={role.projectCode}
                              accountName={role.accountName}
                              accountNumber={role.accountNumber}
                              roleName={role.roleName}
                              description={role.description}
                              startDate={role.startDate}
                              endDate={role.endDate}
                              key={role.id}
                              roleType={role.roleType}
                              id={role.id}
                        />
                    </div>
                )
            })}
        </Paper>
    )
}