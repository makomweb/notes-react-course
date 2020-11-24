# React

https://www.udemy.com/course/react-the-complete-guide-incl-redux

## Lession 1

HTML
~~~html
<div id="p1"></div>

<div class="person">
  <h1>
    Mary
  </h1>
  <p>Age: 19</p>
</div>
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
function Person() {
  return (
    <div className="person">
      <h1>
        Paul
      </h1>
      <p>Age: 21</p>
    </div>
  );
}

ReactDOM.render(
  <Person/>, 
  document.querySelector('#p1')
);
~~~

