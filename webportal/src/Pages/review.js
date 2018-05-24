import React, {Component} from 'react';
import Cteaedropdown from './Createdropdown';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import Reviewtbl from './Reviewtbl';

import './table.css';
import axios from 'axios';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width:'50%'
    }
};


class Review extends Component {
    constructor() {
        super();
        var apiBaseUrl = "http://localhost:8080/getEmpList";

        this.state = {
            employee: [
                {id: '', emp_name: '', emp_id: ''}
            ],
            searchTag: '',
            searchResult: [],
            modalIsOpen: false,
            action: 'insert',
            modal: {id: '', name: '', rate: '', emp_id: '', review: ''}
        }

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        var self = this;
        axios.post(apiBaseUrl, null)                             // Populating the employee Dropdown using api
            .then(function (response) {
                self.setState({employee: response.data});
            })
    }

    openModal(){
        this.setState({modalIsOpen: true,action:'insert',modal:{id: '', name: '', rate: '', emp_id: '', review: ''}});
    }

    afterOpenModal() {
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    handleSelect(event) {                                        // Changing state on Select
        this.setState({searchTag: event.target.value})
    }

    handleSerch(event) {
        var apiReviewUrl = 'http://localhost:8080/getEmpReview';
        var self = this;
        axios.post(apiReviewUrl, {id: self.state.searchTag})      // Getting Employee Review
            .then(function (response) {
                self.setState({searchResult: response.data});
            })

    }

    deleteRecordHandeler(param, e) {
        var apiDeleteUrl = "http://localhost:8080/deleteReview";
        var apiReviewUrl = 'http://localhost:8080/getEmpReview';
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

    editRecordHandeler(param, e) {
        var self=this;
        self.setState({modal:param});
        self.setState({action:'update',modalIsOpen: true});

    }

    handleReviewChange(event){
        var self=this;
        let items = Object.assign({}, this.state.modal);
        items.review=event.target.value;
        self.setState({modal: items});

    }
    handleSubmit(event){
        var self=this;
        var apiPostReviewUrl='http://localhost:8080/review';
        var apiReviewUrl = 'http://localhost:8080/getEmpReview';

        if(this.state.searchTag==''){
            alert('Please Search an employee first');
        }else{
            var data={
                id:this.state.modal.id,
                action:this.state.action,
                emp_unq_id:this.state.searchTag,
                reviewer_unq_id:sessionStorage.getItem('User'),
                review:this.state.modal.review,
                rate:this.state.modal.rate
            }

            axios.post(apiPostReviewUrl,data)
                .then(function (response) {
                    if(response.data.code==200){
                        alert('Success');
                        axios.post(apiReviewUrl, {id: self.state.searchTag})      // Refreshing Employee Review
                            .then(function (response) {
                                self.setState({searchResult: response.data,modalIsOpen:false});
                            })

                    }else{
                        alert('Failed');
                    }
                })

        }



    }
    handleRateChange(event){
        var self=this;
        let items = Object.assign({}, this.state.modal);
        items.rate=event.target.value;
        self.setState({modal: items});
    }


    render() {

       // console.log('Se :', window.User);
        const emp = this.state.employee;
        const reviewer = this.state.searchResult;
        const Dropdown = emp.map((title, i) => <Cteaedropdown key={i} id={emp[i].id} name={emp[i].emp_name}
                                                              emp_id={emp[i].emp_id}/>);
        const review = reviewer.map((title, i) => <Reviewtbl key={i} id={reviewer[i].id} name={reviewer[i].emp_name}
                                                             emp_id={reviewer[i].emp_id} review={reviewer[i].review}
                                                             rate={reviewer[i].rate}
                                                             delete={this.deleteRecordHandeler.bind(this)}
                                                             edit={this.editRecordHandeler.bind(this)}/>);


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
                                        <h3 className="panel-title">Employee Reviews</h3>
                                    </div>
                                    <div className="col col-xs-6 text-right">
                                        <button type="button" className="btn btn-sm btn-primary btn-create" onClick={this.openModal}>Add Review
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-body">
                                <table className="table table-striped table-bordered table-list">
                                    <thead>
                                    <tr>
                                        <th className="hidden-xs">ID</th>
                                        <th>Reviewer Name</th>
                                        <th>Reviewer ID</th>
                                        <th>Rate (Scale of 0-10)</th>
                                        <th>Review</th>
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
                            <label for="{'rate'}" className="control-label">Rates: </label>
                            <input border="1px" className={'form-control'} type={'text'} id={'rate'} value={this.state.modal.rate}  onChange ={this.handleRateChange.bind(this)} placeholder={'Scale of 0 to 10'}></input>
                        </div>

                        <div className="form-group">
                            <label for="{'review'}" className="control-label">Review: </label>
                            <textarea border="1px" className={'form-control'}  id={'review'} value={this.state.modal.review}  onChange ={this.handleReviewChange.bind(this)} > </textarea>
                        </div>



                    </form>
                    <button className={'btn btn-primary'} onClick={this.handleSubmit.bind(this)}>Save</button>
                </Modal>

            </div>

        )
    };
}

export default Review;