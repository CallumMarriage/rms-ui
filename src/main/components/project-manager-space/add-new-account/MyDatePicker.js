import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
    DatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Switch from "@material-ui/core/Switch";

export default function MyDatePicker(props){

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker value={props.date}
                            showTodayButton={true}
                            openTo={"year"}
                            format="dd/MM/yyyy"
                            inputVariant={"outlined"}
                            onChange={props.handleChange}
                            style={{width: '80%', padding: '20px'}}/>
            </MuiPickersUtilsProvider>
        </div>
    );
}