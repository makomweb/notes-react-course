import React from 'react';
import classes from './PizzaImage.css';
import PizzaImage from '../../assets/pizza.jpg';

const PizzaImage = props => {
    return (
        <div classes={classes.PizzaImage}>
            <img src={PizzaImage} classes={classes.PizzaImg} />
        </div>
    );
}

export default PizzaImage;