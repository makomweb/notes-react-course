# React

https://www.udemy.com/course/react-the-complete-guide-incl-redux

## Lession 1

HTML
~~~html
<div id="app"></div>
~~~

CSS
~~~css
.person {
  display: inline-block;
  margin: 10px;
  border: 1px solid #eee;
  box-shadow: 0 2px 2px #ccc;
  width: 200px;
  padding: 20px;
}
~~~

React needs 2 packages:

1. https://cdnjs.cloudflare.com/ajax/libs/react/17.0.1/umd/react.production.min.js
2. https://cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.1/umd/react-dom.production.min.js

JavaScript
~~~js
function Person(props) {
  return (
    <div className="person">
      <h1>{props.name}</h1>
      <p>Age: {props.age}</p>
    </div>
  );
}

var app = (
  <div>
    <Person name="Peter" age="21"/>
    <Person name="Paul" age="20"/>
  </div>
);

ReactDOM.render(
  app, document.querySelector('#app')
);
~~~

