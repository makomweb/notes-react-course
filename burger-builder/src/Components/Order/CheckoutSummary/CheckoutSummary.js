import React from 'react';
import Burger from '../../Burger/Burger.js';
import Button from '../../UI/Button/Button.js';
import classes from './CheckoutSummary.css';

const Summary = props => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope you like it!</h1>
            <div style={{ width: '100%', margin: 'auto' }} >
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                buttonType="Danger"
                clicked={props.cancel}>
                CANCEL
            </Button>
            <Button
                buttonType="Success"
                clicked={props.continue}>
                CONTINUE
            </Button>
        </div>
    );
}

export default Summary;