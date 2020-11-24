# Next Generation JavaScript

## let & const

- *let* for variables [Mozilla Developer Network: let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
- *const* for constants [Mozilla Developer Network: const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)


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

## Spread & Rest operator

The spread operator is used to split up array elements _OR_ object properties.

~~~js
// SPREAD operator
const newArray = [...oldArray, 1, 2];
const newObject = { ...oldObject, newProp: 5} // overwrites existing newProp in case it exists in the oldObject

// arrays
const numbers = [1, 2, 3];
const newNumber = [...numbers, 4];
console.log(newNumbers); // prints 1, 2, 3,4

// objects
const person = {
    name: 'Peter'
}

const newPerson = {
    ...person,
    age: 20
}
console.log(newPerson); // prints name 'Peter', age: 20
~~~

The rest operator is used to merge a list of function arguments into an array.

~~~js
// REST operator
function sortArgs(...args) {
    return args.sort();
}

// function
const filter = (...args) => {
    return args.filter(elem => elem === 1);
} 
console.log(filter(1,2,3)); // prints 1
~~~

## Destructuring

~~~js
// array destructuring
[a, , c] = ['Hello', 'world', '!'];
console.log(a); // prints 'Hello'
console.log(c); // prints '!'

// object destructuring
{ name } = { name: 'Peter', age: 20 };
console.log(name); // prints 'Peter'
console.log(age); // ! undefined !
~~~

## Reference & Primitive Types

~~~
Primitive Types are copied by value.
~~~

~~~
Reference Types (classes) are copied by reference.
~~~

~~~js
const person = {
    naem: 'Peter'
};

const secondPerson = person;
person.name = 'Mary';
console.log(secondPerson); // prints Mary, because secondPerson is just a reference to the original person

const thirdPerson = {
    ...person
};

person.name = 'Paul';
console.log(thridPerson); // prints Mary, because Spread operator copies the properties
~~~

## Array Functions

Many functions like *map()*, *filter()*, *reduce()* use array functions as arguments.

~~~js
const numbers = [1, 2, 3];
const doubleNumArray = numbers.map(elem => {
    return elem * 2;
});

console.log(numbers); // prints 1,2,3
console.log(doubleNumArray); // prints 2,4,6
~~~