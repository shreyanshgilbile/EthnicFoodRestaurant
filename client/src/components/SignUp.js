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
import { signUpUser, setError } from '../actions';


export default function SignUp() {

    const error = useSelector(state => state.error);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        dispatch({
            type : 'CLEAR_ERROR'
        });
        setIsOpen(!isOpen);
    };

    const [message, setmessage] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setphone] = useState('');
    const [password, setPassword] = useState('');

    useEffect( () => {
        if(error.id === 'REGISTRATION_FAILURE') {
            setmessage(error.message);
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
        if(!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {

            setError(dispatch, "All fields are required", 400, 'REGISTRATION_FAILURE');
        } 
        //check if password meets all requirements
        else if(!password.trim().match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {

            const message = "Password should be minimum of 8 characters & should include atleast 1 lowercase, 1 uppercase, 1 digit & 1 special character";
            setError(dispatch, message, 400, 'REGISTRATION_FAILURE');
        }
        //check if phone number meets all requirements 
        else if(!phone.trim().match(/^[0-9]*$/) || !(phone.trim().length === 10)) {

            setError(dispatch ,"Phone number not valid", 400, 'REGISTRATION_FAILURE');
        }
        //check if name meets all requirements 
        else if(!name.trim().match(/^[a-zA-Z\s]*$/)) {

            setError(dispatch, "Name should contain only letters", 400, 'REGISTRATION_FAILURE');
        }
        else if(name.trim().length < 2) {

            setError(dispatch, "Enter a valid name", 400, 'REGISTRATION_FAILURE');
        }
        //if all fields are valid
        else {
            signUpUser(dispatch, name.trim(), email.trim(), phone.trim(), password.trim());
        }
    }

    return (
        <div>
            <NavLink onClick={toggle} href="#"><i class="bi bi-person-plus-fill"style={{ fontSize: 22 }}>SignUp</i></NavLink>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>SignUp: </ModalHeader>
                <ModalBody>
                    {message ? <Alert color="danger">{message}</Alert> : null}
                    <Form onSubmit = { e => onSubmit(e) }>
                        <FormGroup>
                            <Label for="name">Name:</Label>
                            <Input name="name"
                                id="name"
                                type="text"
                                onChange={ e => setName(e.target.value) } 
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email:</Label>
                            <Input name="email"
                                id="email"
                                type="email"
                                onChange={ e => setEmail(e.target.value) }  
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone">Phone Number:</Label>
                            <Input name="phone"
                                id="phone"
                                type="text"
                                onChange={ e => setphone(e.target.value) }  
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password:</Label>
                            <Input name="password"
                                id="password"
                                type="password"
                                onChange={ e => setPassword(e.target.value) }  
                            />
                        </FormGroup>
                        <Button
                            color="dark"
                            block
                            style={{marginTop : "0.5rem"}}
                            >Register</Button>
                        </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}


