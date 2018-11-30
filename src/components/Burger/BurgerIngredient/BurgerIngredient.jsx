import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './BurgerIngredient.css'

class BurgerIngredient extends Component {
    render() {
        let ingredient = null;
        switch (this.props.type) {
            case ('bun-bottom'):
                ingredient = <div className={styles.BreadBottom}></div>;
                break;
            case ('bun-top'):
                ingredient = (
                    <div className={styles.BreadTop}>
                        <div className={styles.Seeds1}></div>
                        <div className={styles.Seeds2}></div>
                    </div>
                );
                break;
            case ('patty'):
                ingredient = <div className={styles.Patty}></div>;
                break;
            case ('cheese'):
                ingredient = <div className={styles.Cheese}></div>;
                break;
            case ('Bacon'):
                ingredient = <div className={styles.Bacon}></div>;
                break;
            case ('Lettuce'):
                ingredient = <div className={styles.Lettuce}></div>;
                break;
            default:
                // todo consider throwing here!
                break;
        }
        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient;