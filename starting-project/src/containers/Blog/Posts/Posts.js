import React, { Component } from 'react';
import axios from '../../../axios.js';
import Post from '../../../components/Post/Post.js';

import './Posts.css';

class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount = () => {
        console.log(this.props);
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4); // only the first 4 elements are of interest
                const updatedPosts = posts.map(obj => {
                    return { ...obj, author: 'Mary' }
                });
                //console.log(response);
                this.setState({ posts: updatedPosts });
            })
            .catch(error => {
                this.setState({ error: true });
            });
    }

    onPostClick = (id) => {
        this.props.history.push({ pathname: '/' + id });
    }

    render() {
        const errorMessage = <p style={{ textAlign: 'center' }}>Something went wrong!</p>
        const posts = this.state.posts.map(p => {
            return (
                <Post key={p.id} title={p.title} author={p.author} clicked={() => this.onPostClick(p.id)} />
            );
        });

        return (
            <section className="Posts" >
                { this.state.error ? errorMessage : posts}
            </section>
        );
    }
}

export default Posts;