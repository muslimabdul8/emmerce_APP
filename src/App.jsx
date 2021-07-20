import React from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.css"

import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Admin from './pages/Admin'
import Cart from './pages/Cart'
import History from './pages/History'
import ProductDetail from './pages/ProductDetail'
import MyNavbar from './components/MyNavbar';


import {connect} from'react-redux'
import {userKeepLogin, checkStorage} from './redux/actions/user'
import {getCartData} from './redux/actions/cart'
// document.body.style = 'background: #A6E3E9;'


class App extends React.Component{



  componentDidMount(){
    const userLocalStorage = localStorage.getItem("userDataEmmerce")
    if (userLocalStorage){
      const userData= JSON.parse(userLocalStorage)
      this.props.userKeepLogin(userData)
      this.props.getCartData(userData.id)
    }else{
      this.props.checkStorage()
    }
  }

  render(){
    if (this.props.userGlobal.storageIsChecked){
      
      return(
        <BrowserRouter>
        <MyNavbar />
        <Switch>
        <Route component={Login} path="/login"/>
        <Route component={Register} path="/register"/>
        <Route component={Admin} path="/admin"/>
        <Route component={Cart} path="/cart"/>
        <Route component={History} path="/history"/>
        <Route component={ProductDetail} path="/product-detail/:productid" />
        <Route component={Home} path="/"/>
        </Switch>
        </BrowserRouter>
      )
    }
    return(
      <div>
        Loading...
      </div>
    )
  }
}
const mapStateToProps = (state)=>{
  return{
    userGlobal: state.user,
  }
}
const mapDispatchToProps = {
  userKeepLogin,
  checkStorage,
  getCartData
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
