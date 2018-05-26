import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import Article from '../Component/Article';
import './table.css';
import axios from 'axios';



// Custom CSS for the modal
const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        width                 : '50%'
    }
};

class AdminEmployeeList extends Component {

    constructor() {
        super();
        var apiBaseUrl = "http://localhost:8080/getEmpList";

        this.state = {
            employee:[
                {id:1,emp_name:'',emp_id:''}
            ],
            modalIsOpen: false,
            action: 'insert',
            modal:{id:'',name:'',password:'',emp_id:'',role:'0',email:''}
        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        var self = this;

        axios.post(apiBaseUrl,null)                             // Populating the employee table using api
            .then(function (response) {
                 self.setState({employee:response.data});
              //  console.log(self.state)
            })

    }


    openModal(){
        this.setState({modalIsOpen: true,action:'insert',modal:{id:'',name:'',password:'',emp_id:'',role:'0',email:''}});  //Resetting state
    }

    afterOpenModal() {
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }


    deleteRecordHandeler(param, e){                              // Delete Employee
      //  console.log(param);
        var apiDeleteUrl = "http://localhost:8080/deleteEmp";
        var apiBaseUrl = "http://localhost:8080/getEmpList";
        var self=this;

        axios.post(apiDeleteUrl,{id:param})
            .then(function (response) {
               if(response.data.code==200)
               {
                   axios.post(apiBaseUrl,null)                // Refreshing the employee table
                       .then(function (response) {
                           self.setState({employee:response.data});
                           //  console.log(self.state)
                       })
               }else{
                   alert('Record Could not be deleted')
               }
            })
    }

    editRecordHandeler(param, e){                           // Edit Record Handler
        var self=this;
        self.setState({modal:param});
        self.setState({action:'update',modalIsOpen: true});

    }

    handleNameChange(event){                                // Handling Form Name Input Change
        var self=this;
        let items = Object.assign({}, this.state.modal);
        items.name=event.target.value;
        self.setState({modal: items});

    }
    handlePasswordChange(event){                             // Handling Form PassWord Input Change
        var self=this;
        let items = Object.assign({}, this.state.modal);
        items.password=event.target.value;
        self.setState({modal: items});
    }
    handleEmpIdChange(event){                                // Handling Form  Input Change
        var self=this;
        let items = Object.assign({}, this.state.modal);
        items.emp_id=event.target.value;
        self.setState({modal: items});
    }
    handleRoleChange(event){                                 // Handling Form Input Change
        var self=this;
        let items = Object.assign({}, this.state.modal);
        items.role=event.target.value;
        self.setState({modal: items});
    }
    handleEmailChange(event){
        var self=this;
        let items = Object.assign({}, this.state.modal);
        items.email=event.target.value;
        self.setState({modal: items});
    }

    handleSubmit(event){                                     // Handling Form Submitt
        var apiUpdateUrl='http://localhost:8080/addDelemp';
        var apiBaseUrl = "http://localhost:8080/getEmpList";
        var self=this;
        var data={
            action:this.state.action,
            id:this.state.modal.id,
            name:this.state.modal.name,
            password:this.state.modal.password,
            emp_id:this.state.modal.emp_id,
            role:this.state.modal.role,
            email:this.state.modal.email
        }


        axios.post(apiUpdateUrl,data)
            .then(function (response) {
                if(response.data.code==200){
                    alert('Success');
                    axios.post(apiBaseUrl,null)                // Refreshing the employee table
                        .then(function (response) {
                            self.setState({employee:response.data,modalIsOpen:false});
                        })

                }else{
                    alert('Failed');
                }
            })

    }
    componentWillMount() {
        Modal.setAppElement('body');
    }


    render() {
       // console.log('Edit: ',this.state.modal);
        const emp=this.state.employee;                          // Creating Table body
        const Articles =emp.map((title, i) => <Article key={i} id={emp[i].id} name={emp[i].emp_name} emp_id={emp[i].emp_id} email={emp[i].email} password={emp[i].password}  role={emp[i].role} delete={this.deleteRecordHandeler.bind(this)} edit={this.editRecordHandeler.bind(this)}/> );


        return (
            <div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="well text-center">

                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-10 col-md-offset-1">

                        <div class="panel panel-default panel-table">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col col-xs-6">
                                        <h3 class="panel-title">Employee List</h3>
                                    </div>
                                    <div class="col col-xs-6 text-right">
                                        <button type="button" class="btn btn-sm btn-primary btn-create" onClick={this.openModal}>Create New</button>
                                    </div>
                                </div>
                            </div>
                            <div class="panel-body">
                                <table class="table table-striped table-bordered table-list">
                                    <thead>
                                    <tr>
                                        <th class="hidden-xs">ID</th>
                                        <th>Name</th>
                                        <th>Employee ID</th>
                                        <th>Email</th>
                                        <th>Password</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {Articles}
                                    </tbody>
                                </table>

                            </div>
                            <div class="panel-footer">
                                <div class="row">
                                    <div class="col col-xs-4">Page 1 of 5
                                    </div>
                                    <div class="col col-xs-8">
                                        <ul class="pagination hidden-xs pull-right">
                                            <li><a href="#">1</a></li>
                                            <li><a href="#">2</a></li>
                                            <li><a href="#">3</a></li>
                                            <li><a href="#">4</a></li>
                                            <li><a href="#">5</a></li>
                                        </ul>
                                        <ul class="pagination visible-xs pull-right">
                                            <li><a href="#">«</a></li>
                                            <li><a href="#">»</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <h12 ref={subtitle => this.subtitle = subtitle}>Create New </h12><span><a onClick={this.closeModal}>close</a></span>

                    <div><br/></div>
                    <form>
                        <input type={'hidden'} value={this.state.modal.id}/>
                        <div className="form-group">
                            <label for="emp_name" className="control-label">Name : </label>
                            <input border="1px" type={'text'} id={'emp_name'} className={'form-control'} value={this.state.modal.name}  onChange ={this.handleNameChange.bind(this)} required/>
                        </div>

                        <div className="form-group">
                            <label for="{'password'}" className="control-label">Password : </label>
                            <input border="1px" className={'form-control'} type={'text'} id={'password'} value={this.state.modal.password}  onChange ={this.handlePasswordChange.bind(this)} />
                        </div>

                        <div className="form-group">
                            <label for="{'emp_id'}" className="control-label">Employee ID : </label>
                            <input border="1px" className={'form-control'} type={'text'} id={'emp_id'} value={this.state.modal.emp_id}  onChange ={this.handleEmpIdChange.bind(this)} />
                        </div>

                        <div className="form-group">
                            <label for="{'email'}" className="control-label">Email ID : </label>
                            <input border="1px" className={'form-control'} type={'email'} id={'email'} value={this.state.modal.email}  onChange ={this.handleEmailChange.bind(this)} pattern="[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*"  />
                        </div>

                        <div className="form-group">
                            <label for="role" className="control-label">Role : </label>
                            <select id={'role'} className={'form-control'} onChange ={this.handleRoleChange.bind(this)}>
                                <option value={-1} >-Select-</option>
                                <option value={1} >Admin</option>
                                <option value={0} >User</option>
                            </select>
                        </div>


                    </form>
                    <button className={'btn btn-primary'} onClick={this.handleSubmit.bind(this)}>Save</button>
                </Modal>


            </div>
        );
    }
}

export default AdminEmployeeList;