import React from "react";

export default class Article extends React.Component {
    render(props) {

        var role=''
        if(this.props.role==1)
        {
            role='Admin';
        }else{
            role='User';
        }

        return (
            <tr>

                <td class="hidden-xs">{this.props.id}</td>
                <td>{this.props.name}</td>
                <td>{this.props.emp_id}</td>
                <th>{this.props.email}</th>
                <td>{this.props.password}</td>
                <td>{role}</td>
                <td align="center">
                    <button class="btn btn-default" onClick={this.props.edit.bind(this, this.props)}>Edit</button> &nbsp;
                    <button id={this.props.id} class="btn btn-danger" onClick={this.props.delete.bind(this, this.props.id)}><em class="fa fa-trash"></em>Delete</button>
                </td>
            </tr>
        );
    }
}
