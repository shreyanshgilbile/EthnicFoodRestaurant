import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
 } from 'reactstrap';
 import { signInUser, setError } from '../actions';

export default function LogIn() {

    const error = useSelector(state => state.error);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => { 
        dispatch({
            type : 'CLEAR_ERROR'
        });
        setIsOpen(!isOpen);
    }

    const [msg, setMsg] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect( () => {
        if(error.id === 'LOGIN_FAILURE') {
            setMsg(error.msg);
        }
        if(isAuthenticated) {
            if(isOpen) {
                toggle();
            }
        }
    }, [error, isAuthenticated] )

    const onSubmit = e => { 
        e.preventDefault();
        //perform validation
        if(!email.trim() || !password.trim()) {

            setError(dispatch, "All fields are required", 400, 'LOGIN_FAILURE');
        } else {
            signInUser(dispatch, email, password);
        } 
    }    

    return (
        <div>
            <NavLink onClick={toggle} href="#"><i class="bi bi-person-lines-fill"style={{ fontSize: 22 }}>SignIn</i></NavLink>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>SignIn: </ModalHeader>
                <ModalBody>
                    {msg ? <Alert color="danger">{msg}</Alert> : null}
                    <Form onSubmit = { e => onSubmit(e) }>
                        <FormGroup>
                            <Label for="email">Email:</Label>
                            <Input name="email"
                                id="email"
                                type="email"
                                placeholder="enter email id"
                                onChange={ e => setEmail(e.target.value) } 
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password:</Label>
                            <Input name="password"
                                id="password"
                                type="password"
                                placeholder="enter your password"
                                onChange={ e => setPassword(e.target.value) } 
                            />
                        </FormGroup>
                        <Button
                            color="dark"
                            block
                            style={{marginTop : "0.5rem"}}
                            >SignIn</Button>
                        </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

