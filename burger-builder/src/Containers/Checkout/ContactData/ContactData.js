import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button.js';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    onOrderTapped = event => {
        event.preventDefault();
        console.log('[ContactData.js]', this.props.ingredients);
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data:</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Your street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Your postal code" />
                    <Button buttonType="Success"
                        clicked={this.onOrderTapped}>ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;