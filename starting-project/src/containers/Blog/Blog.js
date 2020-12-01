import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

import axios from 'axios';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null
    }

    componentDidMount = () => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const posts = response.data.slice(0, 4); // only the first 4 elements are of interest
                const updatedPosts = posts.map(obj => {
                    return { ...obj, author: 'Mary' }
                });
                //console.log(response);
                this.setState({ posts: updatedPosts });
            });
    }

    onPostClick = (id) => {
        this.setState({ selectedPostId: id });
    }

    render() {
        const posts = this.state.posts.map(p => {
            return (
                <Post key={p.id} title={p.title} author={p.author} clicked={() => this.onPostClick(p.id)} />
            );
        });
        return (
            <div>
                <section className="Posts">
                    {posts}
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