import React from 'react'
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom"

import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Admin from './pages/Admin'
import Cart from './pages/Cart'
import History from './pages/History'
import ProductDetail from './pages/ProductDetail'


class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
      <Switch>
      <Route component={Login} path="/login"/>
      <Route component={Register} path="/register"/>
      <Route component={Admin} path="/admin"/>
      <Route component={Cart} path="/cart"/>
      <Route component={History} path="/history"/>
      <Route component={ProductDetail} path="/productdetail"/>
      <Route component={Home} path="/"/>
      </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
