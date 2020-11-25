# React Basics

## Buildflow

- Dependency Management: _npm_ or _yarn_
- Bundler: _webpack_
- Compiler: _Babel_ 
- Development Server: _localhost_

## Using create-react-app

_create-react-app_ is used to set up boilerplate

Use `npm install -g create-react-app` to install this tool.

Use `create-react-app react-complete-guide --scripts-version 1.1.5` to spin up the app creation process.

Change into the new created subfolder `react-complete-guide` and ...

Use `npm start` to run the app.

Open the browser [http://localhost:3000] to see the running app.

## Understanding the folder structure

`src` contains the app source files
`public` contains the index.html main entry into the app and public assets.

## Understanding JSX

~~~js
// the following JSX syntax compiles
return (
      <div className="App">
        <h1>
          Hi, I'm a React App
        </h1>
      </div>
    );

// to this JS code
return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Hi, I\'m a React App'));
   
~~~

## JSX restriction

HTML attribute `class` must be named `className` in order to compile correctly.

Always return a single element.

## Events

The is a list of events supported by React [here](https://reactjs.org/docs/events.html#supported-events).The is a list of events supported by React [here](https://reactjs.org/docs/events.html#supported-events).

## Manipulating state inside React components

Before React v16.8 it was only possible to manipulate class based components.

With React v16.8 state inside functional components can be manipulated through _React hooks_.

Attention with _React hooks_ the state can be manipulated individually. There needs to be taken care of which parts of the state should be merged and which not. You can use _useState()_ properly.

With _React hooks_ we use state slices. There is no such a thing like a state blob.