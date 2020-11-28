import React, { Component, Fragment } from 'react';
import classes from './Person.css';
import WithClass from '../../../HOC/WithClass.js';
import PropTypes from 'prop-types';

class Person extends Component {
    state = {};
    constructor(props) {
        super(props);
        console.log('[Person.js] constructor()');

        this.inputElementRef = React.createRef();
    }

    static getDerivedStateFromProps(props, state) {
        console.log('[Person.js] getDerivedStateFromProps()');
        return state;
    }

    // componentWillMount() {
    //     console.log('[Person.js] componentWillMount()');
    // }

    componentDidMount() {
        console.log('[Person.js] componentDidMount()');

        this.inputElementRef.current.focus();
    }

    componentWillUnmount() {
        console.log('[Person.js] componentWillUnmount()');
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Person.js] getSnapshotBeforeUpdate()');
        return prevState;
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Person.js] shouldComponentUpdate()');
        return true;
    }

    componentDidUpdate() {
        console.log('[Person.js] componentDidUpdate()');
    }

    render() {
        console.log('[Person.js] render()');
        const { age, name, click, children, changed, isAuthenticated } = this.props;
        return (
            <Fragment >
                { isAuthenticated ? <p>Authenticated</p> : <p>Please log in</p>}
                <p onClick={click}>I'm a {name} an I am {age} years old.</p>
                <p>{children}</p>
                <input
                    type="text"
                    //ref={(inputElement) => { this.inputElement = inputElement }}
                    ref={this.inputElementRef}
                    onChange={changed}
                    value={name} />
            </Fragment>
        );
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default WithClass(Person, classes.Person);