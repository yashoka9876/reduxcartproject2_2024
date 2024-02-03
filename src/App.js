import React, { useEffect, useState } from 'react';
import { Products } from './features/products/Products';
import './App.css';
import { Cart } from './features/cart/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsync } from './features/cart/cartSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log('Hai this one is not true')
    dispatch(fetchAsync())  
  },[])
  const [showCart,setShowCart]=useState(false);
  const items = useSelector((state)=>state.cart.items)
  return (
    <div className="App">
      <button onClick={()=>setShowCart(!showCart)} class="BUTTON">Cart {items.length}</button>
      {showCart?<Cart/>:<Products/>}
    </div>
  );
}

export default App;
