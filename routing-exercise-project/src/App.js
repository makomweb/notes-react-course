import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import Users from './Components/Users/Users';
import Courses from './Components/Courses/Courses';
import NoMatch from './Components/NoMatch/NoMatch';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ol style={{ textAlign: 'left' }}>
          <li>Add Routes to load "Users" and "Courses" on different pages (by entering a URL, without Links)</li>
          <li>Add a simple navigation with two links => One leading to "Users", one leading to "Courses"</li>
          <li>Make the courses in "Courses" clickable by adding a link and load the "Course" component in the place of "Courses" (without passing any data for now)</li>
          <li>Pass the course ID to the "Course" page and output it there</li>
          <li>Pass the course title to the "Course" page - pass it as a param or score bonus points by passing it as query params (you need to manually parse them though!)</li>
          <li>Load the "Course" component as a nested component of "Courses"</li>
          <li>Add a 404 error page and render it for any unknown routes</li>
          <li>Redirect requests to /all-courses to /courses (=> Your "Courses" page)</li>
        </ol>
        <h1>React router excercise</h1>
        <BrowserRouter>
          <div>
            <nav>
              <Link to="/users">Users</Link>&nbsp;
              <Link to="/courses">Courses</Link>
            </nav>
            <Switch>
              <Route path="/users" component={Users} />
              <Redirect from="/all-courses" to="/courses" />
              <Route path="/courses" component={Courses} />
              <Route render={() => <NoMatch />} />
              <Route path="/" component={null} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
