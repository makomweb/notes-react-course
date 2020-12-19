# Testing

Install _enzyme_

`npm install --save enzyme react-test-renderer enzyme-adapter-react-16`

Because I setup the project with _React 17_ I had to use an updated enzyme adapter.

https://github.com/wojtekmaj/enzyme-adapter-react-17

`npm install --save enzyme react-test-renderer @wojtekmaj/enzyme-adapter-react-17`

When starting the run the test I had a couple of errors

~~~bash
PS C:\Workspace\udemy\react\burger-builder> npm test

> burger-builder@0.1.0 test C:\Workspace\udemy\react\burger-builder
> node scripts/test.js --env=jsdom

internal/modules/cjs/loader.js:960
  throw err;
  ^

Error: Cannot find module 'C:\Workspace\udemy\react\burger-builder\node_modules\jest-cli'
Require stack:
- C:\Workspace\udemy\react\burger-builder\node_modules\jest\node_modules\jest-cli\build\cli\getJest.js
- C:\Workspace\udemy\react\burger-builder\node_modules\jest\node_modules\jest-cli\build\jest.js
- C:\Workspace\udemy\react\burger-builder\node_modules\jest\build\jest.js
- C:\Workspace\udemy\react\burger-builder\scripts\test.js
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:957:15)
    at Function.Module._load (internal/modules/cjs/loader.js:840:27)
    at Module.require (internal/modules/cjs/loader.js:1019:19)
    at require (internal/modules/cjs/helpers.js:77:18)
    at getJest (C:\Workspace\udemy\react\burger-builder\node_modules\jest\node_modules\jest-cli\build\cli\getJest.js:22:12)  
    at Object.run (C:\Workspace\udemy\react\burger-builder\node_modules\jest\node_modules\jest-cli\build\cli\index.js:39:48) 
    at Object.<anonymous> (C:\Workspace\udemy\react\burger-builder\scripts\test.js:27:6)
    at Module._compile (internal/modules/cjs/loader.js:1133:30)
    at Module.load (internal/modules/cjs/loader.js:977:32) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    'C:\\Workspace\\udemy\\react\\burger-builder\\node_modules\\jest\\node_modules\\jest-cli\\build\\cli\\getJest.js',       
    'C:\\Workspace\\udemy\\react\\burger-builder\\node_modules\\jest\\node_modules\\jest-cli\\build\\cli\\index.js',
    'C:\\Workspace\\udemy\\react\\burger-builder\\node_modules\\jest\\node_modules\\jest-cli\\build\\jest.js',
    'C:\\Workspace\\udemy\\react\\burger-builder\\node_modules\\jest\\build\\jest.js',
    'C:\\Workspace\\udemy\\react\\burger-builder\\scripts\\test.js'
  ]
}
npm ERR! Test failed.  See above for more details.
~~~

I was able to fix it by removing the _node_modules_ folder with `rm -rf ./node_modules` an running `npm install`.

## Links

- [Jest](https://jestjs.io/)
- [Enzyme API Reference](https://enzymejs.github.io/enzyme/docs/api/)

## Testing components connected to the store

_Enzyme_ provides functions to manipulate state for testing components.