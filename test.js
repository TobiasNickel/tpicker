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
console.log(JSON.stringify(user1, undefined, '  '));
console.log('done')