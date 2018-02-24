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

I plan to use it with mongodb. Together with monk and superstruct,
it will be a good alternative for mongoose and fit to the dao definitions.


```js
const tpick = require('./tpick');
var namePicker = tpick.createPicker({
    name: "valid",
    address: {
        street: 'someStreet',
        number: "a",
    },
    images: [{
        title: 'title',
        url: 'theURL',
        tags: []
    }]
});

var user1 = namePicker({
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
