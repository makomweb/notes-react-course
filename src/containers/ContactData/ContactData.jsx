import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render() {
        return (
            <div>
                <h4>Enter your contact data:</h4>
                <form>
                    <input type="text" name="name" placeholder="Enter your name here" />
                    <input type="text" name="email" placeholder="Enter your email here" />
                    <input type="text" name="street" placeholder="Enter your street here" />
                    <input type="text" name="postal" placeholder="Enter your postalcode here" />
                    <Button buttonType="Success">OK</Button>
                </form>
            </div>);
    }
}

export default ContactData;