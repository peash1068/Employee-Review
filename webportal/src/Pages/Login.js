import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Nav from './Nav';
import axios from 'axios';
import './table.css'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/*import Archives from './Archives';
import AdminEmployeeList from './AdminEmployeeList';*/

import Layout from "./Layout";
import Layout2 from './Layout2';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            adminUser:''
        }

      //  sessionStorage.setItem('User',-1)
     const loggedIn = sessionStorage.getItem('User') === 'true';
    }

    handleClick(event){
        var self = this;
        var apiBaseUrl = "http://localhost:8080/login?";

        axios.get(apiBaseUrl+'password='+this.state.password+'&username='+this.state.username)
            .then(function (response) {
                /*console.log(response);*/
                if(response.data.code==200)
                {
                    window.User=response.data.id;                                       // Setting a Global variable for later use
                    sessionStorage.setItem('User', response.data.id);
                    if(response.data.role==1)
                    {
                      //  alert('admin portal');
                        self.setState({adminUser:1})
                        sessionStorage.setItem('adminUser', 1);
                       // console.log(self.props)

                    }else{
                       // alert('client')
                        self.setState({adminUser:2})
                        sessionStorage.setItem('adminUser', 2);
                    }
                    window.location.reload();
                }else
                {
                    alert('Login Failed');
                }
            })
    }

    render() {
        var user=sessionStorage.getItem('User');
        var admin=sessionStorage.getItem('adminUser');

        if(admin==1){

            return(
                <Router>
                  <Layout/>
                </Router>
            );

        }else if(admin==2){
            return(
                <Router>
                    <Layout2/>
                </Router>
            );
        }else{

            return (
                <div>
                    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <div className="panel panel-default panel-table">
                                <div className="panel-heading">
                                    <div className="row">

                                        <div className="col col-xs-6 logindesign">
                                            <MuiThemeProvider>
                                                <div>
                                                    <AppBar
                                                        title="Login"
                                                    />
                                                    <TextField
                                                        hintText="Enter your Username"
                                                        floatingLabelText="Username"
                                                        onChange = {(event,newValue) => this.setState({username:newValue})}
                                                    />
                                                    <br/>
                                                    <TextField
                                                        type="password"
                                                        hintText="Enter your Password"
                                                        floatingLabelText="Password"
                                                        onChange = {(event,newValue) => this.setState({password:newValue})}
                                                    />
                                                    <br/>
                                                    <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                                                </div>
                                            </MuiThemeProvider>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>




                </div>
            );

        }


    }
}
const style = {
    margin: 50,
};
export default Login;