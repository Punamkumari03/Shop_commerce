import classes from './AvailableShirts.module.css';
import Card from '../UI/Card';
import ShirtItem from './ShirtItem';

const data = [
    { id : 1 , name : 'OverSized t-shirts' , description: 'cool stuff' , price: 30},
    { id : 2 , name : 'Drop shoulder shirts' , description: 'look smarter' , price: 90},
    { id : 3, name : 'Cotton Shirts' , description : '100% cotton' , price: 30},
    { id : 4, name : 'Formal Shirts' , description: '90% cotton 10% polyster' , price: 40}
]
const AvailableShirts = ()=> {
    const shirtList = data.map(shirt=><ShirtItem key = {shirt.id} id = {shirt.id} name = {shirt.name} description = {shirt.description} price = {shirt.price} ></ShirtItem>)
    return(
        <section className={classes.meals}>
        <Card>
            <ul>
                {shirtList}
            </ul>
        </Card>
        </section>

    )
}


export default AvailableShirts