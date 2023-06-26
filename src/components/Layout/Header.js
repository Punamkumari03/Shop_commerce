import img1 from '../../assets/img1.jfif';
import classes from './Header.module.css';
import HeaderCart from "./HeaderCart";
import { Fragment } from 'react';

const Header = (props)=> {
    return (
          <Fragment>
               <header className={classes.header}>
                    <h1>Shoppers</h1>
                    <HeaderCart onClick = {props.onShowCart}></HeaderCart>
               </header>
               <div className={classes['main-image']}>
                    <img src={img1} alt = 'food table'/>
               </div>
          </Fragment>
    )
}
export default Header;