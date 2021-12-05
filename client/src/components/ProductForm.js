import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Alert, Modal,
    ModalHeader,
    ModalBody,
    NavLink } from 'reactstrap';
import { addProduct, setError, getProducts } from '../actions';


export default function ProductForm() {

    const error = useSelector(state => state.error);
    const token = useSelector(state => state.auth.token);
    const added = useSelector(state => state.product.added);
    const skip = useSelector(state => state.product.skip);
    const search = useSelector(state => state.product.search);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    
    const toggle = () => { 
        dispatch({
            type : 'CLEAR_ERROR'
        });
        setIsOpen(!isOpen);
    }

    const [message, setmessage] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(null);
    const [quantity, setquantity] = useState(null);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    useEffect( () => {
        if(error.id === 'ITEM_ADD_FAILURE') {
            setmessage(error.message);
        }
        
        if(error.status === null && added) {
            if(isOpen) {
                toggle();
                dispatch({
                    type : 'RESET'
                })
                if(search) {
                    getProducts(dispatch, search.category, search.minPrice, search.maxPrice, search.searchTerm, skip);
                }
            }
        }
    }, [error, added] )

    const onSubmit = e => {

        e.preventDefault();

        if(!name.trim() || !description.trim() || !price.trim() || !category.trim() || !image || !quantity.trim()) {
            setError(dispatch, "All fields are required", 400, 'ITEM_ADD_FAILURE');

        }
        else if(name.trim().length < 3) {
            setError(dispatch, "Name should contain atleast 3 characters!", 400, 'ITEM_ADD_FAILURE');

        }
        else if(parseFloat(price) < 0) {
            setError(dispatch, "Invalid Price", 400, 'ITEM_ADD_FAILURE');
            
        }
        else if(parseFloat(quantity) < 0) {
            setError(dispatch, "Add valid quantity", 400, 'ITEM_ADD_FAILURE');
        }
        else if(description.trim().length < 15) {
            setError(dispatch, "Description should contain atleast 15 characters", 400, 'ITEM_ADD_FAILURE');
            
        } 
        else if(description.trim().length > 200) {
            setError(dispatch, "Description can contain atmost 200 characters", 400, 'ITEM_ADD_FAILURE');
            
        } else {
            addProduct(dispatch, token, name.trim(), description.trim(), parseFloat(price), parseFloat(quantity), category.trim(), image);
        }
    }

    return (
        <div>
           <NavLink onClick={toggle} href="#">Add Product</NavLink> 
           <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Enter Details of the Item to Add: </ModalHeader>
                <ModalBody>
                { message ? <Alert color="danger">{message}</Alert> : null }
           <Form onSubmit = { e => onSubmit(e) }>
                <FormGroup>
                    <Label for="productName">Name: </Label>
                    <Input type="text" 
                        name="productName" 
                        id="productName" 
                        placeholder="Enter the name of the item"
                        onChange={ e => setName(e.target.value) } 
                        />
                </FormGroup>
                <FormGroup>
                    <Label for="price">Price: </Label>
                    <Input type="text" 
                        name="price" 
                        id="price" 
                        placeholder="Enter price for the item" 
                        onChange={ e => setPrice(e.target.value) }
                        />
                </FormGroup>
                <FormGroup>
                    <Label for="quantity">Quantity Available: </Label>
                    <Input type="text" 
                        name="quantity" 
                        id="quantity" 
                        placeholder="Enter quantity of item available" 
                        onChange={ e => setquantity(e.target.value) }
                        />
                </FormGroup>
                <FormGroup>
                    <Label for="Category">Category: </Label>
                    <Input type="select" name="Category" id="Category" onChange={ e => setCategory(e.target.value) }>
                        <option value="" selected>choose</option>
                        <option value="starters">Starters</option>
                        <option value="main course">Main course</option>
                        <option value="drinks">Drinks</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="decription">Item Description: </Label>
                    <Input type="textarea" 
                        name="description" 
                        id="description" 
                        placeholder="text"
                        onChange={ e => setDescription(e.target.value) }
                        />
                </FormGroup>
                <FormGroup>
                    <Label for="image">Item Image: </Label>
                    <Input type="file" 
                        name="image" 
                        id="image"
                        accept="image/png, image/jpeg, image/jpg" 
                        onChange={ e => setImage(e.target.files[0])} required/>
                    <FormText color="danger">
                    Upload only .png, .jpeg or .jpg file types.
                    </FormText>
                </FormGroup>
                <Button color="blue">Add item</Button>
            </Form>
            </ModalBody>
            </Modal>
        </div>
    )
}

