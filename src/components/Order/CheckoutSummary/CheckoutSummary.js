import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.css'

const checkoutSummary = (props) => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>We hope you like it!</h1>
            <div style={{ width: '100%', margin: 'auto' }} >
                <Burger ingredients={props.ingredients} />
            </div>

            <Button
                buttonType="Danger"
                clickec={() => { }}>
                Cancel
                </Button>
            <Button
                buttonType="Success"
                clicked={() => { }}>
                Continue
            </Button>
        </div>
    );
}

export default checkoutSummary;