import React from 'react';
import classes from './Ingredient.css';

const Ingredient = props => {

    let ingredient = null;

    switch (props.type) {
        case ('bread-bottom'):
            ingredient = <div className={classes.BreadBottom}></div>;
            break;
        case ('bread-top'):
            ingredient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>);
            break;
        case ('beef'):
            ingredient = <div className={classes.Beef}></div>;
            break;
        case ('cheese'):
            ingredient = <div className={classes.Cheese}></div>;
            break;
        case ('bacon'):
            ingredient = <div className={classes.Bacon}></div>;
            break;
        case ('lettuce'):
            ingredient = <div className={classes.Lettuce}></div>;
            break;
        default:
            break;
    }

    return ingredient;
}

export default Ingredient;