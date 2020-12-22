import React from 'react';

import './App.css';
import YourRole from './your-role/YourRole';
import Paper from "@material-ui/core/Paper";

class App extends React.Component {

    render() {
        return (
            <div className="App">
                <Paper variant="outlined" square={true}>
                    <h1>My RMS</h1>
                    <YourRole/>  
                </Paper>
                             
            </div>
        );
    }
}

export default App;
