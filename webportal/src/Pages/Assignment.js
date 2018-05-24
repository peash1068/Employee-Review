import React, {Component} from 'react';
import Cteaedropdown from './Createdropdown';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import Reviewtbl from './Reviewtbl';

import './table.css';
import axios from 'axios';

class Assignment extends Component {

    constructor() {
        super();
        var apiBaseUrl = "http://localhost:8080/getEmpList";

        this.state = {
            employee: [
                {id: '', emp_name: '', emp_id: ''}
            ],
            employee_list:'',
            assigned_to:''

        }

        var self = this;
        axios.post(apiBaseUrl, null)                             // Populating the employee Dropdown using api
            .then(function (response) {
                self.setState({employee: response.data});
            })
    }

    handleSelect(event){
        this.setState({employee_list:event.target.value});
    }
    handleSelectAsnm(event){
       // alert('ge');
        this.setState({assigned_to:event.target.value});
    }
    handleSave(event){
        var apiSaveAssignmentUrl='http://localhost:8080/saveAssignment';
        var self=this;
        axios.post(apiSaveAssignmentUrl,{employee_list:this.state.employee_list,assigned_to:this.state.assigned_to})
            .then(function (response) {
                if(response.data.code==203){
                    alert('Already Assigned');
                }else if(response.data.code==200){
                    alert('successfully Assigned');
                }else{
                    alert('Failed To assign');
                }
            })
    }

    render() {

        const emp = this.state.employee;
        const Dropdown = emp.map((title, i) => <Cteaedropdown key={i} id={emp[i].id} name={emp[i].emp_name}
                                                              emp_id={emp[i].emp_id}/>);

        return(

            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="well text-center">

                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <div className="panel panel-default panel-table">
                            <div className="panel-heading">
                                <div className="row">

                                    <div className="col col-xs-6 ">
                                        <form>
                                            <div className="form-group">
                                                <label for="{'rate'}" className="control-label">Employee List: </label>
                                                <select className={'form-control'}  onChange={this.handleSelect.bind(this)}>
                                                    <option value={0}>-Select Employee-</option>
                                                    {Dropdown}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label for="{'rate'}" className="control-label">Assign To: </label>
                                                <select className={'form-control'}  onChange={this.handleSelectAsnm.bind(this)}>
                                                    <option value={0}>-Select Employee-</option>
                                                    {Dropdown}
                                                </select>
                                            </div>

                                        </form>
                                        <button type="button" className="btn btn-sm btn-primary btn-create" onClick={this.handleSave.bind(this)}>Assign
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Assignment;