import {Link} from "react-router-dom";
import React from "react";

export function AccountLink(props, Content) {
    console.log(props);
    return (
        <Link style={{textDecoration: 'none'}} to={{
            pathname: `/Account/${props.accountNumber}`,
            state: {accountNumber: props.accountNumber}
        }}>
            <Content props={props}/>
        </Link>
    )
}

export function ProjectLink(props, Content) {
    return (
        <Link style={{textDecoration: 'none'}} to={{
            pathname: `/Account/${props.accountNumber}/Project/${props.projectCode}`,
            state: {projectCode: props.projectCode, accountName: props.accountName}
        }}>
            <Content props={props}/>
        </Link>
    )
}

export function RoleLink(props, Content) {
    return (
        <Link style={{textDecoration: 'none'}} to={{
            pathname: `/Account/${props.accountNumber}/Project/${props.projectCode}/ViewRole/${props.id}`,
            state: {role: props}
        }}>
            <Content props={props}/>
        </Link>
    )

}