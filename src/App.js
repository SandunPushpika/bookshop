import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import Create from './Component/create.component';
import Edit from './Component/edit.component';
import Index from './Component/index.component';
import profits from './Component/profits.component';
import Homepage from './Component/homepage.component';
import 'react-app-polyfill/stable';

class App extends Component{
    render(){
      return(
        <Router>
          <div className="bodycontainer">
              <nav className="navigationbar clearfix">
                <Link to={'/'} className="name">BookShop Manager</Link>
                <div className="menus">
                  <ul className="list">
                      <li>
                        <Link to={'/'} className="listitem">Home</Link>
                      </li>
                      <li>
                        <Link to={'/edit'} className="listitem">Stock</Link>
                      </li>
                      <li>
                        <Link to={'/create'} className="listitem">Add Book</Link>
                      </li>
                      <li>
                        <Link to={'/Index'} className="listitem">Sellings</Link>
                      </li>
                      <li>
                        <Link to={'/profits'} className="listitem">Profit Manager</Link>
                      </li>
                      
                  </ul>
                </div>
              </nav><br/>
              <h1 className="center">Welcome to BookShop Manager</h1>
              <div className="componentrednder">
              <Switch>
              <Route exact path='/' component={Homepage}/>
                <Route exact path='/edit' component={Edit}/>
                <Route exact path='/create' component={Create}/>
                <Route exact path='/Index' component={Index}/>
                <Route exact path='/profits' component={profits}/>
              </Switch>
              </div>
             
              <br/>
              
          </div>
          
        </Router>
      );
    }
}

export default App;
