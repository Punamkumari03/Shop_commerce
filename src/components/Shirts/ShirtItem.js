import { useContext } from 'react';
import classes from './ShirtItem.module.css';
import ShirtItemForm from './ShirtItemForm';
import CartContext from '../../Context/cart-context';

const ShirtItem = (props)=> {

    const cartCtx = useContext(CartContext)
    const price = `$${props.price.toFixed(2)}`

    const addToCartHandler = (amount)=> {
        cartCtx.addItem({
            id : props.id,
            name : props.name,
            amount : amount,
            price : props.price,
        })
    }
    return(
        <li className={classes.meal}>
            <div>
                 <h3>{props.name}</h3>
                 <div className={classes.description}>{props.description}</div>
                 <div className={classes.price}>{price}</div>
            </div>
            <div>
                 <ShirtItemForm id={props.id} onAddToCart = {addToCartHandler}></ShirtItemForm>
            </div>
        </li>
    )
}
export default ShirtItem