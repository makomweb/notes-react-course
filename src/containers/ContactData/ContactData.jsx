import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import styles from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
        }
            postalCode: '',
            town: ''
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props);
    }

    render() {
        return (
            <div className={styles.ContactData}>
                <h4>Enter your contact data:</h4>
                <form>
                    <input className={styles.Input} type="text" name="name" placeholder="Enter your name" />
                    <input className={styles.Input} type="text" name="email" placeholder="Enter your email" />
                    <input className={styles.Input} type="text" name="street" placeholder="Enter your street" />
                    <input className={styles.Input} type="text" name="postal" placeholder="Enter your postal code" />
                    <input className={styles.Input} type="text" name="town" placeholder="Enter your town" />
                    <Button buttonType="Success" clicked={this.orderHandler} >OK</Button>
                </form>
            </div>);
    }
}

export default ContactData;