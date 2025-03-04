import React, { Component, Suspense } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

import './Blog.css';
//import NewPost from './NewPost/NewPost.js';
import Posts from './Posts/Posts.js';
// import AsyncComponent from '../../hoc/AsyncComponent.js';
// const AsyncNewPost = AsyncComponent(() => {
//     return import('./NewPost/NewPost.js')
// });

const NewPost = React.lazy(() => import('./NewPost/NewPost.js'));

class Blog extends Component {
    state = {
        auth: true
    }

    render() {
        const path = this.props.match.url + 'new-post';
        console.log('path is: ', path);
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/posts/"
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
                <Switch>
                    {this.state.auth ? <Route path="/new-post" render={() => (
                        <Suspense fallback={<div>Loading...</div>}>
                            <NewPost />
                        </Suspense>)} /> :
                        null}
                    <Route path="/posts" component={Posts} />
                    {/* <Route path="/" component={Posts} /> */}
                    {/* <Redirect from="/" to="/posts" /> */}
                    <Route render={() => <h1>Not found</h1>} /> {/* The catch all route should always be the last route */}
                </Switch>
            </div>
        );
    }
}

export default withRouter(Blog);