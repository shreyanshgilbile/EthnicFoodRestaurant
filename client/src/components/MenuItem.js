import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Card, CardImg, CardText, CardBody, Col, Row, CardLink, 
    CardTitle, CardSubtitle, Button, CardFooter,
  } from 'reactstrap';
import EditForm from "./EditForm";
import { deleteProduct } from "../actions";


export default function MenuItem() {

    const items = useSelector(state => state.product.items);
    const user = useSelector(state => state.auth.user);
    const cart = useSelector(state => state.cart);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    const [cards, setCards] = useState([]);

    const onClick = id => { deleteProduct(dispatch, id, token); }

    const addToCart = item => { 

        let isPresent = false;
        let interimItems = [];

        interimItems = cart.items.map(product => {
            
            if(product._id === item._id) {
                isPresent = true;
                product.qty += 1;
            }
            return product;
        })

        if(!isPresent) { interimItems.push({...item, qty : 1}); }
        let interimTotal = (parseFloat(cart.total)+parseFloat(item.price)).toFixed(2);

        dispatch({
        type: 'ADD_TO_CART',
        payload : { 
            items : interimItems,
            total : interimTotal 
        }
    })
}

    useEffect(() => {
        if(items) {
             
            let interim = items.result.map((item, index) => (

                index%2 === 0 ? 

                    index+1 < items.result.length ?

                                <Row className="mb-2">
                                <Col sm="6" className="mb-2">  
                                <Card inverse style={{ backgroundColor: '#0022CC', borderColor: '#333'}}>
                                <CardImg top width="50%" src={"/products/"+item._id+"/images"} alt={item.productName} />
                                <CardBody style={{color: '#FFDF00'}}>  
                                    <CardTitle>{item.productName}</CardTitle>
                                    <CardSubtitle>{item.category}</CardSubtitle>
                                    <CardText>{item.description}</CardText>

                                    {
                                    isAuthenticated ? 
                                    user.isAdmin ?

                                    <Row>
                                    <CardLink><EditForm item={item}/></CardLink>
                                    <CardLink><Button style={btnStyle} onClick = {() => onClick(item._id)} >Delete</Button></CardLink>
                                    </Row>  
                                    : 
                                    <Button style={btnStyle} onClick = {() => addToCart(item)}>Add to Cart</Button> 
                                    : 
                                    <CardText style={{color : "white"}}></CardText>
                                    }
                                </CardBody>
                                    <CardFooter style={{color: '#FFDF00'}}>Price: ${item.price}</CardFooter>   
                                </Card>
                                </Col>

                                <Col sm="6" className="mb-2">
                                <Card inverse style={{ backgroundColor: '#0022CC', borderColor: '#333'}}>
                                <CardImg top width="50%" src={"/products/"+items.result[index+1]._id+"/images"} alt={items.result[index+1].productName} />
                                <CardBody style={{color: '#FFDF00'}}>
                                    <CardTitle>{items.result[index+1].productName}</CardTitle>
                                    <CardSubtitle>{items.result[index+1].category}</CardSubtitle>
                                    <CardText>{items.result[index+1].description}</CardText>

                                    {
                                    isAuthenticated ? 
                                    user.isAdmin ? 

                                    <Row>
                                    <CardLink><EditForm item={items.result[index+1]}/></CardLink> 
                                    <CardLink><Button style={btnStyle} onClick = {() => onClick(items.result[index+1]._id)}>Delete</Button></CardLink>
                                    </Row>  
                                    : 
                                    <Button style={btnStyle} onClick = {() => addToCart(items.result[index+1])}>Add to Cart</Button> 
                                    : 
                                    <CardText style={{color : "white"}}></CardText>
                                    }
                                </CardBody>
                                    <CardFooter style={{color: '#FFDF00'}}>Price: ${items.result[index+1].price}</CardFooter>
                                </Card> 
                                </Col>  
                                </Row> 
                        :   
                        <Row>
                            <Col sm="6" className="mb-2">
                            <Card inverse style={{ backgroundColor: '#0022CC', borderColor: '#333'}}>
                            <CardImg top width="50%" src={"/products/"+item._id+"/images"} alt={item.productName} />
                            <CardBody style={{color: '#FFDF00'}}>  
                                <CardTitle>{item.productName}</CardTitle>
                                <CardSubtitle>{item.category}</CardSubtitle>
                                <CardText>{item.description}</CardText>
                                {
                                isAuthenticated ? 
                                user.isAdmin ?

                                <Row>
                                <CardLink><EditForm item={item}/></CardLink>
                                <CardLink><Button style={btnStyle} onClick = {() => onClick(item._id)}>Delete</Button></CardLink> 
                                </Row>  
                                : 
                                <Button style={btnStyle} onClick = {() => addToCart(item)}><i class="bi bi-cart-plus">Add</i></Button> 
                                : 
                                <CardText style={{color : "white"}}></CardText>}
                            </CardBody>
                                <CardFooter style={{color: '#FFDF00'}}>Price: ${item.price}</CardFooter>
                            </Card>
                            </Col>
                            </Row>
                :  
                null 
            ))
            setCards(interim);
        }
    }, [items, isAuthenticated, cart])

    return (
        <div>
            {cards}   
        </div>
    )
}

const btnStyle = {
    color : '#00CC88',
    backgroundColor : '#FFDF00'
}