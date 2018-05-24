import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Review from './review';
import AdminEmployeeList from './AdminEmployeeList';
import Assignment from './Assignment';
import Nav from './Nav';
import axios from 'axios';

class Layout extends Component {


    render() {
        return (
            <Router>
                <div>

                    <Switch>
                        <Route exact path='/' component={AdminEmployeeList} />
                        <Route  path='/review' component={Review}/>
                        <Route  path='/assign' component={Assignment}/>
                    </Switch>
                    <Nav/>
                </div>
            </Router>
        );
    }

};

export default Layout;