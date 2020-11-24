# Next Generation JavaScript

## let & const

"let" for variables
"const" for constants

~~~js
var myName = 'Paul';
console.log(myName);

myName = 'Mary';
console.log(myName);
~~~

~~~js
let myName = 'Paul';
console.log(myName);

myName = 'Mary';
console.log(myName);
~~~

~~~js
const myName = 'Paul';
console.log(myName);

myName = 'Mary'; // ERROR cannot reassign constant!
console.log(myName);
~~~

## arrow functions

Regular function 

~~~js
function printMyName(name, age) {
    console.log(name, age);
}

printMyName('Peter', 20);
~~~

Arrow function

~~~js
function myFunc = (name, age) => {
    console.log(name, age);
}

printMyName('Peter', 20);
~~~


~~~js
const multiplyByTwo = number => number * 2;

console.log(multiplyByTwo(2));
~~~

## Exports & Imports (modules)

~~~js
// person.js
const person = {
    name: 'Peter',
    age: 20
}

export default person;
~~~

~~~js
//utility.js
export const clean = () => { ... }
export const baseData = 10;
~~~

~~~js
// app.js

// DEFAULT EXPORTS
import person from './person.js'
import prs from './person.js'

// NAMED EXPORTS
import { clean } from './utility.js'
import { baseData } from './utility.js'

import { baseData as BD } from './utility.js'
import * as utils from './utility.js'
~~~

## Understanding classes

Defining a class

~~~js
// person.js

class Person {
    name = 'Peter' // <-- Property
    call = () => { /* ... */ } // <-- Method
    constructor() { /* ... *} // <-- Constructor
}
~~~

Instantiate a class

~~~js
// app.js
var p = new Person();
p.call();
console.log(p.name);
~~~

### Inherit a class

~~~js
// human.js
class Human {
    constructor(gender)  {
        this.gender = gender;
    }

    printGender() {
        console.log(this.gender);
    }
}

class Person extends Human {
    constructor(name, gender) {
        super(gender);
        this.name = name;
    }

    printName() {
        console.log(this.name);
    }
}
~~~

~~~js
// app.js
var p = new Person('Peter', 'male');
p.printName();
p.printGender();
~~~

## Classes, properties & methods

~~~js
// ES 6
class MyClass {
    constructor() {
        this.myProperty = 'value'; 
    }

    myMethod() {
        /* ... */
    }
}

// ES 7
class MyClass {
    myProperty = 'value';

    myMethod = () => {
        /* ... */
    }
}
~~~
