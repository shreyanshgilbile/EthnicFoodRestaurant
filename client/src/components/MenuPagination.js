import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { limit } from '../actions';


export default function MenuPagination({move}) {

    const items = useSelector(state => state.product.items);
    const [pagination, setPagination] = useState([]);

    useEffect(() => {
        if(items) {
            let list = [];
            for(let i = 0; i < Math.ceil(items.length/limit); i++) {
                list.push(i+1);
            }
            setPagination(list);
        }
    }, [items])
    
    return ( 
        <div className="row">
        <div className="col-lg-1" style={{float: "none", margin: "0 auto"}}>
            <nav>
                <ul className="pagination">
                    {pagination.map(i => (
                        <li key={i} className="page-item">
                            <a onClick={() => move(i)} href="#" className="page-link">
                                {i}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
        </div>
    )
}
