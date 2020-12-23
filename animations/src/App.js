import React, { Component } from "react";
import Transition from 'react-transition-group/Transition';
import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {
  state = {
    modalIsOpen: false,
    showBlock: false
  }

  showModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  handleToggle = () => {
    this.setState((prevState) => ({ showBlock: !prevState.showBlock }));
  }

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <button className="Button" onClick={this.handleToggle}>Toggle</button>
        <br></br>
        <Transition in={this.state.showBlock} duration={1000} >
          {state => (<div style={{
            backgroundColor: 'red',
            width: 100,
            height: 100,
            margin: 'auto',
            opacity: state === 'exited' ? 0 : 1
          }} />)}
        </Transition>
        {this.state.modalIsOpen ? <Modal closed={this.closeModal} show /> : null}
        {this.state.modalIsOpen ? <Backdrop show /> : null}
        <button className="Button" onClick={this.showModal}>Open Modal</button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
