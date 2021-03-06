import React from "react";

export default class Reviewtbl extends React.Component {
    render(props) {

        return (
            <tr>

                <td className="hidden-xs">{this.props.id}</td>
                <td>{this.props.name}</td>
                <td>{this.props.emp_id}</td>
                <td>{this.props.email}</td>
                <td>{this.props.rate}</td>
                <td>{this.props.review}</td>
                <td align="center">
                    <button className="btn btn-default" onClick={this.props.edit.bind(this, this.props)}>Update</button> &nbsp;
                    <button id={this.props.id} className="btn btn-danger" onClick={this.props.delete.bind(this, this.props.id)}><em class="fa fa-trash"></em>Delete</button>
                </td>
            </tr>
        );
    }
}
