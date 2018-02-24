# tpicker
underscore has a method pick, it takes an object and a 
list of propert names, it return a new object, that has
only the props that are named in the list.

That id good, for flat objects. This lib provide a function, to
compile a simple schema and return a method. that method
then takes an item and create a clone, that has only the props
named in that schema.

the schema is compatible to superstruct.

currently are arrays only supported with a single type.
it is not checked if the prop is number/string.
invalid props are just removed, it will not throw errors.

I plan to use it with mongodb. Together with [monk](https://npmjs.com/packages/monk) and [superstruct](https://npmjs.com/packages/superstruct),
it will be a good alternative for mongoose and fit to the dao definitions. 
This module is needed not to push big uncontrolled objects into each document.

```js
const tpick = require('tpicker');
var userPicker = tpick.createPicker({
    name: "string",
    address: {
        street: 'string',
        number: "a",
    },
    images: [{
        title: 'string',
        url: 'string',
        tags: []
    }]
});

var user1 = userPicker({
    name: 'Tobias',
    otherProp: "invalid",
    address: {
        street: '',
        number: "11",
        level: 'invalid',
    },
    images: [{
        title: 'test',
        url: 'fasdffsdf',
        alt: "useless html prop"
    }, {
        title: 'profieBildTobias',
        url: '/someOtherStuf.jpg',
        alt: "useless html prop jaja",
        tags: ["aaa", 'bbb', { in: "valid" }]
    }]
});

```

## implementation
The schema object get traversed recursive, to create a method as a string.
child objects also get written into a method string. using *eval* the dynamic created
method get created and returned to be used. so: this method should only be used for 
static definitions and not for user-input. The result is an extreamly fast pick method.

