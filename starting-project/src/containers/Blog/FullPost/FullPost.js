import React, { Component } from 'react';
import axios from '../../../axios.js';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidMount = () => {
        console.log(this.props);

        const id = this.props.match.params.id;

        if (id)
            if (!this.state.loadedPost || this.state.loadedPost.id !== this.props.id) {
                axios.get('/posts/' + id)
                    .then(response => {
                        //console.log(response);
                        this.setState({ loadedPost: response.data })
                    })
            }
    }

    onDeleteClicked = () => {
        axios.delete('/posts/' + this.props.id)
            .then(response => {
                console.log(response);
            });
    }

    render() {
        const { state } = this;

        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if (state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{state.loadedPost.title}</h1>
                    <p>{state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.onDeleteClicked}>Delete</button>
                    </div>
                </div>
            );
        }

        return post;
    }
}

export default FullPost;