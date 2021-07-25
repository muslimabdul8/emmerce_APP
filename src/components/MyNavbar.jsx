import React from 'react'
import {Navbar, Nav, NavItem, UncontrolledDropdown, DropdownToggle, NavbarBrand, NavbarText,
DropdownMenu, DropdownItem} from 'reactstrap'
import {Link} from 'react-router-dom'
import {connect}from 'react-redux';
import {logoutUser} from '../redux/actions/user'

class MyNavbar extends React.Component{
    render(){
        return(
        <div>
            <Navbar color="danger">
                <NavbarBrand>
                    <Link className="m-4 link-dark" style={{ textDecoration: "none" }} to="/">Emmerce</Link>
                </NavbarBrand>
                <Nav>
                    {
                        this.props.userGlobal.username ? 
                        <>
                    <NavItem>
                        <NavbarText className="nav text-light">Hello, {this.props.userGlobal.username}</NavbarText>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle className="mx-3 text-dark" nav caret>
                            Pages
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>
                               <Link style={{ textDecoration: "none" }} className="text-dark" to="/cart" >Cart({this.props.cartGlobal.cartList.length}) </Link>
                            </DropdownItem>
                            <DropdownItem>
                            <Link style={{ textDecoration: "none" }} className="text-dark" to="/history">History</Link>
                            </DropdownItem>
                            {
                                this.props.userGlobal.role === "admin"?
                            <DropdownItem>
                            <Link style={{ textDecoration: "none" }} to="/admin">Admin</Link>
                            </DropdownItem>
                            : null
                            }
                            <DropdownItem divider />
                            <DropdownItem onClick={this.props.logoutUser}>
                                Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                        </>
                        :
                        <NavItem className="mx-5">
                            <NavbarText>
                                <Link  style={{ textDecoration: "none" }} to="/login">Login</Link> | <Link  style={{ textDecoration: "none" }} to="/register">Register</Link>
                            </NavbarText>
                        </NavItem>
                    }
                </Nav>
                </Navbar>
            </div>
        )
    }
}
const mapStateToProps =(state)=>{
 return{
     userGlobal:state.user,
     cartGlobal :state.cart,
 }
}

const mapDistateToProps = {
    logoutUser,
}

export default connect(mapStateToProps, mapDistateToProps)(MyNavbar)