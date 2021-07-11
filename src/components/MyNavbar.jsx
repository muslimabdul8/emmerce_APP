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
            <Navbar color="light" light>
                <NavbarBrand>MJ LTD</NavbarBrand>
                <Nav>
                    {
                        this.props.userGlobal.username ? 
                        <>
                    <NavItem>
                        <NavbarText>Hello, {this.props.userGlobal.username}</NavbarText>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Pages
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                               <Link to="/cart" >Cart</Link>
                            </DropdownItem>
                            <DropdownItem>
                            <Link to="/history">History</Link>
                            </DropdownItem>
                            {
                                this.props.userGlobal.role === "admin"?
                            <DropdownItem>
                            <Link to="/admin">Admin</Link>
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
                        <NavItem>
                            <NavbarText>
                                <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
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
     userGlobal:state.user
 }
}

const mapDistateToProps = {
    logoutUser,
}

export default connect(mapStateToProps, mapDistateToProps)(MyNavbar)