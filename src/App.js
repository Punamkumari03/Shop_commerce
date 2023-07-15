import { Fragment } from "react";
import Header from "./components/Layout/Header";

import { useState } from "react";

import Shirts from './components/Shirts/Shirts';
import CartProvider from "./Context/CartProvider";
import Cart from './components/Cart/Cart';
import ItemProvider from "./Context/ItemProvider";


const App = ()=> {


  const [cartIsShown , setCartIsShown] = useState(false)

  const showCartHandler = ()=> {
    setCartIsShown(true)
  }

  const hideCartHandler = ()=> {
    setCartIsShown(false)
  }

  return (
    // <CartProvider>
    <ItemProvider>
        {cartIsShown && <Cart onHideCart={hideCartHandler}></Cart>}
        <Header onShowCart={showCartHandler}></Header>
        <main>
            <Shirts></Shirts>
        </main>
        </ItemProvider>
    // </CartProvider>
  )
}
export default App;