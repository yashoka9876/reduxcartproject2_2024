import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAsync, fetchAsync, updateAsync } from './cartSlice';

import  './Cart.css';

export function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state=> state.cart.items));

  const totalAmount=items.reduce((a,b)=>{
    return a+=b.quantity*b.price;
  },0)
  console.log(totalAmount);

  const changeHandler=(obj)=>{
    dispatch(updateAsync(obj))
  }

  return (
    <div>
      <ul >
        {items.map((item)=> <li key={item.id} id={item.id} class="cart-item">
        
          <img
          className="img-fluid"
          src={item.thumbnail}
          alt=""
          />
          <div className="description">
            <p>{item.title}</p>
            <span>{item.brand}</span>
            <strong>${item.price}</strong>
          </div>
          <div className="quantity">
            Quantity
            <select value={item.quantity} onChange={(event)=>changeHandler({id:item.id,quantity:event.target.value})}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <div>
            <button onClick={()=>{dispatch(deleteAsync(item.id))}} class='button'>X</button>
          </div>
        </li>
          
        )}
      </ul>
      <div class="totalAmount">
        <span>total Amount</span>
        <span>${totalAmount}.00</span>
      </div>
    </div>
  );
}
