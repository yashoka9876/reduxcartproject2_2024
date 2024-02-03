import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAsync,
} from './productsSlice';
import  './Products.css';
  import { addAsync } from '../cart/cartSlice';


export function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state=> state.product.products))
  useEffect(()=>{
    dispatch(fetchAsync())
  },[])
console.log(products)
  return (
    <div>
      <div >
      {products.map((product)=>
        <div key={product.id} class="card">
        <img src={product.thumbnail} alt={product.title} style={{width:"100%"}}/>
        <h1>{product.title}</h1>
        <p class="price">${product.prize}</p>
        <p>{product.description}</p>
        <p><button onClick={()=> dispatch(addAsync(product))}>Add to Cart</button></p>
     </div>
      

      )}
        

      </div>
    </div>
  );
}
