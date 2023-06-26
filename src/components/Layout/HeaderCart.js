import CartContext from '../../Context/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCart.module.css';

import { useContext } from 'react';
const HeaderCart = (props)=> {

    const cartctx = useContext(CartContext);
    const numberOfCartItems = cartctx.items.length;
    return(
        <button className={classes.button} onClick={props.onClick}>
               <span className={classes.icon}>
                    <CartIcon></CartIcon>
               </span>
               <span>Your Cart</span>
               <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}
export default HeaderCart

// .reduce((currNumber , item)=>{ return currNumber + item.amount}, 0)