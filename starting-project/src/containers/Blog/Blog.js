import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

import './Blog.css';
import NewPost from './NewPost/NewPost';

import Posts from './Posts/Posts';
import FullPost from './FullPost/FullPost';

class Blog extends Component {
    render() {
        const path = this.props.match.url + 'new-post';
        console.log('path is: ', path);
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: 'organge',
                                    textDecoration: 'underline'
                                }}>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: path,
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Route path="/" exact component={Posts} />
                <Switch>
                    <Route path="/new-post" component={NewPost} />
                    <Route path="/:id" exact component={FullPost} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(Blog);