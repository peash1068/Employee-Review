import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Nav extends Component {

    constructor() {
        super()
        this.state = {
            collapsed: true,
        };
    }

    toggleCollapse() {

        if(this.state.collapsed==true)
        {
            this.setState({
                    collapsed : false
                }

            )
        }else{
            this.setState(
                {
                    collapsed:true
                }
            );
        }

    }
    handelLogout(event){
        sessionStorage.setItem('adminUser', -1);
        window.location.reload();
    }


    render(){
        const navClass=this.state.collapsed ? "collapse" : "";
        const featuredClass='';
        const archivesClass='';
        //  console.log('GO');

        return(
            <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li className={featuredClass}>
                                <Link to={'/'} onClick={this.toggleCollapse.bind(this)}>Post Review</Link>
                            </li>
                            <li>
                                <a onClick={this.handelLogout.bind(this)}>logout</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>


        );

    };
}

export default Nav;

