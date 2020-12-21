# Webpack

- bundler
- entry _app.js_
- output _dist/bundle.js_
- loaders in between entry and output (on a per file basis)
- plugins (minify, uglify) in between too

## custom workflow

## requirements

- compile next gen JS features
- handle JSX
- CSS autoprefixing
- support image imports
- optimize code (minify)

## install dependencies

`npm install --save react react-dom react-router-dom`

When facing an error:

~~~bash
Please install 'webpack-cli' in addition to webpack itself to use the CLI
-> When using npm: npm i -D webpack-cli
-> When using yarn: yarn add -D webpack-cli
internal/modules/cjs/loader.js:960
~~~

run `npm install --save-dev webpack-cli`

Still getting an error:

Create a file `webpack.config.js` next to the `package.json`.

# Install all dependencies (ignore the previous steps!)

react
react-dom
react-router-dom

`npm install --save react react-dom`

### dev

@babel/core
@babel/plugin-proposal-class-properties
@babel/preset-env
@babel/preset-react
@babel/preset-stage-2

`npm install --save-dev @babel/core @babel/plugin-proposal-class-properties @babel/preset-env @babel/preset-react @babel/preset-stage-2`

autoprefixer
babel-loader
css-loader
file-loader
html-webpack-plugin
postcss-loader

`npm install --save-dev autoprefixer babel-loader css-loader file-loader html-webpack-plugin postcss-loader`

style-loader
url-loader
webpack
webpack-cli
webpack-dev-server

`npm install --save-dev style-loader url-loader webpack webpack-cli webpack-dev-server`

