import React from 'react';
import PropTypes from 'prop-types';
import classes from './Ingredient.css';

const Ingredient = props => {
    const { type } = props;
    switch (type) {
        case ('bread-bottom'): return <div className={classes.BreadBottom}></div>;
        case ('bread-top'): return (
            <div className={classes.BreadTop}>
                <div className={classes.Seeds1}></div>
                <div className={classes.Seeds2}></div>
            </div>);
        case ('beef'): return <div className={classes.Beef}></div>;
        case ('cheese'): return <div className={classes.Cheese}></div>;
        case ('bacon'): return <div className={classes.Bacon}></div>;
        case ('lettuce'): return <div className={classes.Lettuce}></div>;
        default: return null;
    }
}

Ingredient.propTypes = {
    type: PropTypes.string.isRequired
};


export default Ingredient;