import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Button, Form, FormGroup, Label, Input,
    Modal, ModalHeader, ModalBody, Alert,
    Table } from "reactstrap";
import { placeOrder, setError } from "../actions";

export default function MyCart() {

    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);
    const error = useSelector(state => state.error);
    const dispatch = useDispatch();

    const [msg, setMsg] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => { 
        dispatch({
            type : 'CLEAR_ERROR'
        });
        setMsg(null);
        setIsOpen(!isOpen);
    }

    const onClick = () => {

        let type = document.getElementsByName('radio');
        let orderType;

        for(let i = 0; i < type.length; i++) {
            if(type[i].checked) {
                orderType = type[i].value;
            }
        }

        if(!orderType) {
            setError(dispatch, 'OrderType is Required',400,'ORDER_FAILURE');
        } else {
            placeOrder(dispatch, cart, user, orderType, token);
        }
    }

    const emptyCart = () => {
        dispatch({
            type : 'ORDER_RESET'
        })
    }

    const increaseQty = (id) => {
        
        cart.items = cart.items.map(product => {
            if(product._id === id) {
                product.qty += 1;
                cart.total = (parseFloat(cart.total)+parseFloat(product.price)).toFixed(2);                
            }
            return product;
        })

        dispatch({
            type : 'ADD_TO_CART',
            payload : {
                items : cart.items,
                total : cart.total,
            }
        })
    }

    const decreaseQty = (id) => {

        cart.items = cart.items.map(product => {
            if(product._id === id) {
                product.qty -= 1;
                cart.total = (parseFloat(cart.total)-parseFloat(product.price)).toFixed(2);
            }
            return product;
        })

        cart.items = cart.items.filter(product => product.qty !== 0);

        dispatch({
            type : 'ADD_TO_CART',
            payload : {
                items : cart.items,
                total : cart.total,
            }
        })
    }

    useEffect(() => {
        if(error.id === 'ORDER_FAILURE') {
            setMsg(error.msg);
        }
        if(error.status == null && cart.placed) {
            dispatch({
                type : 'ORDER_RESET'
            })
            setMsg("Success! Your Order has been placed & will be ready in 1 hour.");
        }
    }, [error, cart])

    return (
        <div>
           <NavLink onClick={toggle} href="#"><i class="bi bi-cart4">My Cart</i></NavLink> 
           <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Your Cart: </ModalHeader>
                <ModalBody>

                    {msg && error.id === 'ORDER_FAILURE' ? <Alert color="danger">{msg}</Alert> : null}
                    {msg && error.status == null ? <Alert color="success">{msg}</Alert> : null}

                    {cart.items.length > 0 ?
                    <React.Fragment>
                    <Table striped>
                        <thead>
                            <tr>
                            <th>Item No</th>
                            <th>Item Name</th>
                            <th>quantity</th>
                            <th>Price</th>
                            <th>Update Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                        {cart.items.map((product, index) => (
                            <tr>
                                <th scope="row">{index}</th>
                                <td>{product.productName}</td>
                                <td>{product.qty}</td>
                                <td>{(product.price * product.qty).toFixed(2)}</td>
                                <td><button style={incStyle} onClick = {() => increaseQty(product._id)}>+</button>
                                    <button style={decStyle} onClick = {() => decreaseQty(product._id)}>-</button></td>
                            </tr>
                        ))
                    }
                    <tr>
                        <th scope="row"></th>
                        <td></td>
                        <th>Total</th>
                        <td>{cart.total}</td>
                    </tr>
                    </tbody>
                    </Table>
                        <Form>
                            <FormGroup tag="fieldset">
                            <legend>Order Type: </legend>
                            <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio" value="dinein"/>{' '}
                                Dine-in
                            </Label>
                            </FormGroup>
                            <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio" value="pickup"/>{' '}
                                Pick-up
                            </Label>
                            </FormGroup>
                            </FormGroup>
                        </Form>
                        <Button
                            onClick = {() => onClick()}
                            color="success"
                            block
                            style={{marginTop : "0.5rem"}}
                            >Place Order</Button>
                        <Button
                            onClick = {() => emptyCart()}
                            color="danger"
                            block
                            style={{marginTop : "0.5rem"}}
                            >Empty Cart</Button>    
                    </React.Fragment>
                    :
                    <h4>Nothing to show!</h4>}
                </ModalBody>
           </Modal>
        </div>
    )
}

const incStyle = {
    color : 'white',
    backgroundColor : '#66db24',
    border : 'none',
    padding: '4px 7px',
    cursor : 'pointer',
    marginRight : '5px'
}

const decStyle = {
    color : 'white',
    backgroundColor : '#e31c29',
    border : 'none',
    padding: '4px 7px',
    cursor : 'pointer'
}

