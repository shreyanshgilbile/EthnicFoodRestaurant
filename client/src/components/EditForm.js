import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Alert, Modal,
    ModalHeader,
    ModalBody } from "reactstrap";
import { editProduct, getProducts, setError } from '../actions';


export default function EditForm({item}) {

    const error = useSelector(state => state.error);
    const token = useSelector(state => state.auth.token);
    const edited = useSelector(state => state.product.edited);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    
    const toggle = () => { 
        dispatch({
            type : 'CLEAR_ERROR'
        }); 
        setIsOpen(!isOpen);
    }

    const [message, setmessage] = useState(null);
    const [id, setId] = useState(item._id);
    const [name, setName] = useState(item.productName);
    const [price, setPrice] = useState(item.price.toString());
    const [qty, setQty] = useState(item.qty.toString());
    const [category, setCategory] = useState(item.category);
    const [description, setDescription] = useState(item.description);
    const [image, setImage] = useState(null);

    useEffect( () => {

        setId(item._id);
        setName(item.productName);
        setPrice(item.price.toString());
        setQty(item.qty.toString());
        setCategory(item.category);
        setDescription(item.description);
        
        if(error.id === 'ITEM_EDIT_FAILURE') {
            setmessage(error.message);
        }
        if(error.status === null && edited) {
            if(isOpen) {
                toggle();
                dispatch({
                    type : 'RESET'
                })
            }
        }
    }, [error, edited, item] )

    const onSubmit = e => {

        e.preventDefault();

        if(!name.trim() || !description.trim() || !price.trim() || !category.trim() || !qty.trim()) {
            setError(dispatch, "All fields are required", 400, 'ITEM_EDIT_FAILURE');

        }
        else if(name.trim().length < 3) {
            setError(dispatch, "Name should contain atleast 3 characters!", 400, 'ITEM_EDIT_FAILURE');

        }
        else if(parseFloat(price) < 0) {
            setError(dispatch, "Price should be a positive Number", 400, 'ITEM_EDIT_FAILURE');
            
        }
        else if(parseFloat(qty) < 0) {
            setError(dispatch, "Quantity Available cannot be a negative number", 400, 'ITEM_EDIT_FAILURE');
            
        }
        else if(description.trim().length < 10) {
            
            setError(dispatch, "Description should contain atleast 10 characters", 400, 'ITEM_EDIT_FAILURE');
            
        } 
        else if(description.trim().length > 150) {
            setError(dispatch, "Description can contain atmost 150 characters", 400, 'ITEM_EDIT_FAILURE');
            
        } else {
            editProduct(dispatch, token, name.trim(), description.trim(), parseFloat(price), parseFloat(qty), category.trim(), image, id);
        }
    }


    return (
        <div>
            <Button style={btnStyle} onClick={toggle}>Edit</Button>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit Details of the Item: </ModalHeader>
                <ModalBody>
                    { message ? <Alert color="danger">{message}</Alert> : null }
                    <Form onSubmit = { e => onSubmit(e) }>
                        <FormGroup>
                        <Label for="productName">Name: </Label>
                        <Input type="text" 
                            name="productName" 
                            id="productName" 
                            placeholder="Enter the name of the item"
                            value={name}
                            onChange={ e => setName(e.target.value)}
                 
                        />
                        </FormGroup>
                        <FormGroup>
                        <Label for="qty">Quantity Available: </Label>
                        <Input type="text" 
                        name="qty" 
                        id="qty" 
                        placeholder="Enter quantity of item available"
                        value={qty}
                        onChange={ e => setQty(e.target.value) } 
                        
                        />
                        </FormGroup>
                        <FormGroup>
                        <Label for="price">Price: </Label>
                        <Input type="text" 
                        name="price" 
                        id="price" 
                        placeholder="Enter price for the item"
                        value={price}
                        onChange={ e => setPrice(e.target.value) } 
                        
                        />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Category">Category: </Label>
                            <Input type="select" 
                                name="Category" 
                                id="Category" 
                                value={category}
                                onChange={ e => setCategory(e.target.value) }>
                                <option value="">choose</option>
                                <option value="starters" selected={category.toLowerCase() === "starters"}>Starters</option> 
                                <option value="main course" selected={category.toLowerCase() === "main course"}>Main Course</option>
                                <option value="drinks" selected={category.toLowerCase() === "drinks"}>drinks</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="decription">Item Description: </Label>
                            <Input type="textarea" 
                                name="description" 
                                id="description"  
                                placeholder="text"
                                value={description}
                                onChange={ e => setDescription(e.target.value) }                            
                                />
                        </FormGroup>
                        <FormGroup>
                            <Label for="image">Item Image: </Label>
                            <Input type="file" 
                                name="image" 
                                id="image"
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={ e => setImage(e.target.files[0])} 
                                />
                            <FormText color="danger">
                            Note: Only Upload a File if you want to replace the existing image. 
                            Upload only .png, .jpeg or .jpg file types. 
                            </FormText>
                        </FormGroup>
                        <Button color="dark">Submit</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

const btnStyle = {
    color : '#996515',
    backgroundColor : '#FFDF00'
}
