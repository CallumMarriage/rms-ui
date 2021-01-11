import React from "react";

class ViewRole extends React.Component {

    render() {
        const { role } = this.props.location.state

        return(
            <div>
                Role Description: {role.description}
            </div>
        )

    }
}
export default ViewRole;