import React, {Component} from 'react';
import Cteaedropdown from './Createdropdown';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import Assignmenttbl from './Assignmenttbl';

import './table.css';
import axios from 'axios';



class Review extends Component {
    constructor() {
        super();
        var apiBaseUrl = "http://localhost:8080/getEmpList";

        this.state = {
            employee: [
                {id: '', emp_name: '', emp_id: '',email:''}
            ],
            searchTag: '',
            searchResult: [],
            modalIsOpen: false,
        }


        var self = this;
        axios.post(apiBaseUrl, null)                             // Populating the employee Dropdown using api
            .then(function (response) {
                self.setState({employee: response.data});
            })
    }


    handleSelect(event) {                                        // Changing state on Select
        this.setState({searchTag: event.target.value})
    }

    handleSerch(event) {
        var apiReviewUrl = 'http://localhost:8080/getAssignment';
        var self = this;
        axios.post(apiReviewUrl, {id: self.state.searchTag})      // Getting Employee Review
            .then(function (response) {
                self.setState({searchResult: response.data});
            })

    }

    deleteRecordHandeler(param, e) {
        var apiDeleteUrl = "http://localhost:8080/deleteAssignment";
        var apiReviewUrl = 'http://localhost:8080/getAssignment';
        var self = this;
        axios.post(apiDeleteUrl, {id: param})
            .then(function (response) {
                if (response.data.code == 200) {
                    axios.post(apiReviewUrl, {id: self.state.searchTag})      // Refreshing Employee Review
                        .then(function (response) {
                            self.setState({searchResult: response.data});
                        })
                } else {
                    alert('Record Could not be deleted')
                }
            })

    }

    render() {

        // console.log('Se :', window.User);
        const emp = this.state.employee;
        const reviewer = this.state.searchResult;
        const Dropdown = emp.map((title, i) => <Cteaedropdown key={i} id={emp[i].id} name={emp[i].emp_name}
                                                              emp_id={emp[i].emp_id} email={emp[i].email}/>);
        const review = reviewer.map((title, i) => <Assignmenttbl key={i} id={reviewer[i].id} name={reviewer[i].emp_name}
                                                             emp_id={reviewer[i].emp_id}
                                                              email={reviewer[i].email}
                                                             delete={this.deleteRecordHandeler.bind(this)}
                                                            />);


        return (
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
                                        <label> Select Employee :</label>
                                        <select className={'form-control'} onChange={this.handleSelect.bind(this)}>
                                            <option value={0}>-Select Employee-</option>
                                            {Dropdown}
                                        </select>

                                    </div>
                                    <div className="col col-xs-3 text-right">
                                        <button type="button" className="btn btn-sm btn-primary btn-create"
                                                onClick={this.handleSerch.bind(this)}>Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="row">
                    <div className="col-md-10 col-md-offset-1">

                        <div className="panel panel-default panel-table">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col col-xs-6">
                                        <h3 className="panel-title">Assigned Employees to him/her</h3>
                                    </div>
                                    <div className="col col-xs-6 text-right">

                                    </div>
                                </div>
                            </div>
                            <div className="panel-body">
                                <table className="table table-striped table-bordered table-list">
                                    <thead>
                                    <tr>
                                        <th className="hidden-xs">ID</th>
                                        <th>Name</th>
                                        <th>Employee ID</th>
                                        <th>Employee Email</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {review}
                                    </tbody>
                                </table>

                            </div>
                            <div className="panel-footer">
                                <div className="row">
                                    <div className="col col-xs-4">Page 1 of 5
                                    </div>
                                    <div className="col col-xs-8">
                                        <ul className="pagination hidden-xs pull-right">
                                            <li><a href="#">1</a></li>
                                            <li><a href="#">2</a></li>
                                            <li><a href="#">3</a></li>
                                            <li><a href="#">4</a></li>
                                            <li><a href="#">5</a></li>
                                        </ul>
                                        <ul className="pagination visible-xs pull-right">
                                            <li><a href="#">«</a></li>
                                            <li><a href="#">»</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


            </div>

        )
    };
}

export default Review;