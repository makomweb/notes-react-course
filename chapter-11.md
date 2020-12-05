# Routing 

Making a SPA show different pages.

The packages `react-router` and `react-router-dom` have to be installed

~~~bash
> npm install --save react-router react-router-dom
~~~

## Handling 404

There exist many options:

1. redirect to the homepage
2. use a general purpose route

## Code splitting / lazy loading

- only download the components you really need
- not download components which might not be necessary