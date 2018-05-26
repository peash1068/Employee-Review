import React from "react";

export default class Createdropdown extends React.Component{
    render(props) {
        return(
                <option value={this.props.id}>{this.props.name} ({this.props.email})</option>

        )

    }
}
