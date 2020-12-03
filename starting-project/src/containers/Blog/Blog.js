import React, { Component } from 'react';
import { Route } from 'react-router';

import './Blog.css';

import Posts from './Posts/Posts';

class Blog extends Component {
    render() {
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
                <Route path="/" render={() => <h1>home</h1>}>

                </Route>
                <Route path="/new-post" render={() => <h1>new post</h1>}>

                </Route>
                <Posts />
            </div>
        );
    }
}

export default Blog;