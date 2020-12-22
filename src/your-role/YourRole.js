import React from 'react';

import './YourRole.css';

import Paper from "@material-ui/core/Paper";
import axios from 'axios';
import {Typography} from '@material-ui/core';

import {retrieveRoleInfo} from './roleDao';

class YourRole extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roleName: null,
            accountNumber: null,
            projectCode: null,
            startDate: null,
            endDate: null,
            description: null,
            accountName: null
        };
    }

    async componentDidMount() {
        let roleInfo = await retrieveRoleInfo();
        if (roleInfo === undefined || roleInfo === null){
            return;
        }
        if (roleInfo.accountNumber !== null) {
            // let accountInfo = await this.retrieveAccountInfo(this.state.accountNumber);
            this.setState({
                roleName: roleInfo.roleName,
                accountNumber: roleInfo.accountNumber,
                projectCode: roleInfo.projectCode,
                startDate: roleInfo.startDate,
                endDate: roleInfo.endDate,
                description: roleInfo.description,
                // accountName: accountInfo.accountName
            })
        }
    }

    async retrieveAccountInfo(accountId) {
        try {
            console.log('Making request to Account API')
            let res = await axios.get(`http://${process.env.REACT_APP_API_HOST}/account/id/${accountId}`);
            console.log(res)
            if (res.status !== 200) {
                throw Error(res.statusText);
            }

            return  res.data;

        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <Paper className="ContentBox" color="text.primary" elevation={3}>
                <Typography variant="h3" id="roleName"> {this.state.roleName} </Typography>
                <Typography variant="subtitle1" id="desc"> {this.state.description} </Typography>
                <p> Start Date: {this.state.startDate} </p>
                <p> Expected End Date: {this.state.endDate} </p>
                <p> {this.state.accountNumber} </p>
                <p> {this.state.projectNumber} </p>
            </Paper>
        );
    }
}

export default YourRole;
