import React from "react";

export default class Assignmenttbl extends React.Component {
    render(props) {

        return (
            <tr>

                <td className="hidden-xs">{this.props.id}</td>
                <td>{this.props.name}</td>
                <td>{this.props.emp_id}</td>
                <td>{this.props.email}</td>
                <td align="center">
                    <button id={this.props.id} className="btn btn-danger" onClick={this.props.delete.bind(this, this.props.id)}><em class="fa fa-trash"></em>Delete</button>
                </td>
            </tr>
        );
    }
}
