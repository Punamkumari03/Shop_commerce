import { useEffect, useState } from "react";
import CartContext from "./cart-context";

const ItemProvider = (props) => {
  const [cartItems, setcartItems] = useState([]);

  

  const url = 'https://crudcrud.com/api/1e94cb39af0e4347bafc154d9bec90c1/products';

  useEffect(() => {
    const getDetails = async () => {
      const response = await fetch(`${url}`);
      const data = await response.json();
      console.log(data, "data after refreshed");
      setcartItems(data);
    };
    getDetails();
  }, [url]);

  const addItemFromCartHandler = async (product) => {
    const existingCartItemIndex = cartItems.findIndex(
      (item) => item.title === product.title
    );
    const existingCartItem = cartItems[existingCartItemIndex];

    let updatedCart;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + 1,
      };

      updatedCart = [...cartItems];
      updatedCart[existingCartItemIndex] = updatedItem;
      setcartItems(updatedCart);
      console.log(existingCartItem, "existingCartItem");

      fetch(`${url}/${updatedItem._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: existingCartItem.id,
          name: existingCartItem.name,
          price: existingCartItem.price,
          description: existingCartItem.description,
          amount: existingCartItem.amount + 1,
        }),
      });
    } else {
      const newItem = { ...product, amount: 1 };
      const response = await fetch(`${url}`, {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data, "afterPosting");

      updatedCart = [...cartItems, data];
      setcartItems(updatedCart);
    }
  };

  const removeItemFromCartHandler = async (product) => {
    const itemIndex = cartItems.findIndex(
      (item) => item.title === product.title
    );
    const deleteItem = cartItems[itemIndex];
    console.log(deleteItem, "item in delete");

    let updatedCart;
    if (deleteItem.amount === 1) {
      updatedCart = cartItems.filter((item) => item.title !== product.title);
      setcartItems(updatedCart);
      await fetch(`${url}/${deleteItem._id}`, {
        method: "Delete",
      });
    } else {
      const updatedItem = {
        ...deleteItem,
        amount: deleteItem.amount - 1,
      };

      updatedCart = [...cartItems];
      updatedCart[itemIndex] = updatedItem;
      setcartItems(updatedCart);

      await fetch(`${url}/${deleteItem._id}`, {
        method: "PUT",
        body: JSON.stringify({
          id: deleteItem.id,

          name: deleteItem.name,
          price: deleteItem.price,
          description: deleteItem.description,

          amount: deleteItem.amount - 1,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };

  const obj = {
    items: cartItems,
    addItem: addItemFromCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={obj}>{props.children}</CartContext.Provider>
  );
};

export default ItemProvider;
