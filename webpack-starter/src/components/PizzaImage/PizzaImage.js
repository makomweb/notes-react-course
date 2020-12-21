import React from 'react';
import classes from './PizzaImage.css';
import image from '../../assets/pizza.jpg';

const PizzaImage = props => {
    return (
        <div className={classes.Container}>
            <img src={image} className={classes.Img} />
        </div>
    );
}

export default PizzaImage;