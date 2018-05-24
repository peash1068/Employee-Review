import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Review from './review2';
import Nav from './Nav2';
import axios from 'axios';

class Layout extends Component {


    render() {
        return (
            <Router>
                <div>

                    <Switch>
                        <Route path='/' component={Review} />
                    </Switch>
                    <Nav/>
                </div>
            </Router>
        );
    }

};

export default Layout;