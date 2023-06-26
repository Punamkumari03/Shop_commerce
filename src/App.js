import { Fragment } from "react";
import Header from "./components/Layout/Header";

import { useState } from "react";

import Shirts from './components/Shirts/Shirts';
import CartProvider from "./Context/CartProvider";
import Cart from './components/Cart/Cart';


const App = ()=> {


  const [cartIsShown , setCartIsShown] = useState(false)

  const showCartHandler = ()=> {
    setCartIsShown(true)
  }

  const hideCartHandler = ()=> {
    setCartIsShown(false)
  }

  return (
    <CartProvider>
        {cartIsShown && <Cart onHideCart={hideCartHandler}></Cart>}
        <Header onShowCart={showCartHandler}></Header>
        <main>
            <Shirts></Shirts>
        </main>
    </CartProvider>
  )
}
export default App;