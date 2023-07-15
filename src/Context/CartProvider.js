import { useReducer, useState } from 'react';

import CartContext from './cart-context';


const defaultCartState = {
  items : [],
  totalAmount : 0,
}

const cartReducer = (state , action) => {

  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
      fetch(`https://crudcrud.com/api/44b19afc8c0f42f9b095ef1a6c3cbd26/products/${updatedItem._id}`,{
        method:'PUT',
        body:JSON.stringify({
          id: existingCartItem.id,
					name: existingCartItem.name,
          description:existingCartItem.description,
					price: existingCartItem.price,
        }),
        headers:{
          "Content-Type": "application/json",
        },
      }).then((res)=>{
        return res.json().then((data)=>{
          console.log(data);
        })
      })
      
    } else {
      const newItem = {...action.item}
      updatedItems = state.items.concat(newItem);
    
    fetch('https://crudcrud.com/api/44b19afc8c0f42f9b095ef1a6c3cbd26/products',{
      method:'POST',
      body:JSON.stringify({
        newItem
      }),
      headers:{
        "Content-Type": "application/json",
      },
    }).then((res)=>{
      return res.json().then((data)=>{
        console.log(data);
      })
    })
  }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }


  return defaultCartState
}



const CartProvider = (props) => {

  const [cartState, dispatchCartAction] = useReducer(cartReducer , defaultCartState);
  
  const addItemToCartHandler = (item)=> {
    dispatchCartAction({type:'ADD' , item: item})
  }

  const removeItemFromCartHandler = (id)=> {
    dispatchCartAction({type : 'REMOVE' , id : id})
  }

  
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

   

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;