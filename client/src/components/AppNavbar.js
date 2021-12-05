import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from "react-router-dom";
import LogIn from './LogIn';
import SignUp from './SignUp';
import ProductForm from './ProductForm';
import MyCart from "./MyCart";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { logoutUser, getOrders } from '../actions';


const AppNavbar = () => { //(props) was removed

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);
    const order = useSelector(state => state.order);
    const token = localStorage.getItem('token');

    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const onClick = async () => {

        getOrders(dispatch, token);
        setRedirect(true);
        
    }
    
    return (
        <div>
            {redirect ? <Redirect to='/Orders'></Redirect> : null} 
            <Navbar  bg="dark" variant="dark" expand="md">
                <NavbarBrand href="/"><img src="logo.png"></img></NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem >
                        <NavLink href="/"><i class="bi bi-house-door-fill"style={{ fontSize: 20 }}>Home</i></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#About"><i class="bi bi-info-circle-fill"style={{ fontSize: 20 }}>About</i></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/Menu"><i class="bi bi-menu-down"style={{ fontSize: 20 }}>Menu</i></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#Contact"><i class="bi bi-person-lines-fill"style={{ fontSize: 20 }}>Contact</i></NavLink>
                    </NavItem>
                </Nav>
            { ((token && isAuthenticated === null) || (isAuthenticated)) ?
            <Nav navbar>
        
            {user ? user.isAdmin ? 
            <NavItem>
            <ProductForm />
            </NavItem> 
            :
            <React.Fragment>
            <NavItem>
            <MyCart /> 
            </NavItem>
            <NavItem>
                <NavLink onClick = {() => onClick()} href="#"><i class="bi bi-card-checklist" style={{ fontSize: 20 }}>My Orders</i></NavLink>
            </NavItem>
            </React.Fragment>  
            : 
            null
            }    
            <NavItem>
                <NavLink onClick = {() => logoutUser(dispatch, user._id, token)} href="#"><i class="bi bi-box-arrow-right"style={{ fontSize: 20 }}>LogOut</i></NavLink>
            </NavItem>
            </Nav>     
            :
            <Nav navbar>
                <NavItem>
                    <SignUp />
                </NavItem>
                <NavItem>
                    <LogIn />
                </NavItem>
            </Nav> }
        </Collapse>
      </Navbar>
    </div>
    )
}

export default AppNavbar;

