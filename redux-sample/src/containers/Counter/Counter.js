import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

import * as actions from '../../store/actions';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = (action, value) => {
        switch (action) {
            case 'inc':
                this.setState((prevState) => { return { counter: prevState.counter + 1 } })
                break;
            case 'dec':
                this.setState((prevState) => { return { counter: prevState.counter - 1 } })
                break;
            case 'add':
                this.setState((prevState) => { return { counter: prevState.counter + value } })
                break;
            case 'sub':
                this.setState((prevState) => { return { counter: prevState.counter - value } })
                break;
        }
    }

    render() {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter} />
                <CounterControl label="Subtract 5" clicked={this.props.onSubCounter} />
                <hr>
                </hr>
                <button onClick={this.props.onStoreResult}>Store result</button>
                <ul>
                    {this.props.results.map(r =>
                        <li key={r.id} onClick={() => this.props.onDeleteResult(r.id)}>{r.value}</li>)}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.counter.counter,
        results: state.results.results
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({ type: actions.INC }),
        onDecrementCounter: () => dispatch({ type: actions.DEC }),
        onAddCounter: () => dispatch({ type: actions.ADD, value: 5 }),
        onSubCounter: () => dispatch({ type: actions.SUB, value: 5 }),
        onStoreResult: () => dispatch({ type: actions.STORE }),
        onDeleteResult: (resultId) => dispatch({ type: actions.DELETE, id: resultId }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);