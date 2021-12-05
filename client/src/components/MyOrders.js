import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from "reactstrap";
import { getOrders } from '../actions'

export default function MyOrders() {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);
    const data = useSelector(state => state.order.data);
    const dispatch = useDispatch();

    useEffect(() => {
        getOrders(dispatch,token);
    }, [])

    return (
        <div style={{marginTop : "20px"}}>
            {isAuthenticated ?
            user.isAdmin ?
            <h4>This Page is for displaying Customer's Orders</h4>
            :
            data.map((item, index) => (
                <div className="container">
                <h5>Order {index+1}:</h5>
                <Table striped>
                    <thead>
                    <tr>
                    <th>Item No</th>
                    <th>Item Name</th>
                    <th>quantity</th>
                    <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                        {item.items.map((value, loc) => (
                            <tr>
                            <th scope="row">{loc}</th>
                            <td>{value.name}</td>
                            <td>{value.qty}</td>
                            <td>{(value.price * value.qty).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                
                    <p style={{"fontWeight" : "bold"}}>OrderType: {item.orderType}</p>
                    <p style={{"fontWeight" : "bold"}}>Booking Time:
                        {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'numeric', day: 'numeric',
                                                        hour: 'numeric', minute: 'numeric', second: 'numeric',
                                                        hour12: true}).format(new Date(item.bookingTime))}</p>
                    <p style={{"fontWeight" : "bold"}}> Total Bill: {item.totalBill}</p>

                </div>
            ))
            :
            <h4>Please Login to See Your Orders</h4> }
        </div>
    )
}
