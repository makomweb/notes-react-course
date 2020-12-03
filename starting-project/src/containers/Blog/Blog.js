import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

import axios from '../../axios.js';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null
    }

    componentDidMount = () => {
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
        this.setState({ selectedPostId: id });
    }

    render() {
        const errorMessage = <p style={{ textAlign: 'center' }}>Something went wrong!</p>
        const posts = this.state.posts.map(p => {
            return (
                <Post key={p.id} title={p.title} author={p.author} clicked={() => this.onPostClick(p.id)} />
            );
        });
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/new-post">New Post</a></li>
                        </ul>
                    </nav>
                </header>
                <section className="Posts">
                    {this.state.error ? errorMessage : posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;