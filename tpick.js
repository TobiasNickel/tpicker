module.exports.createPicker = createPicker;

function createPicker(schema) {
    var subTypes = {};
    var methodString = schemaToMethodString(schema, subTypes);
    var classDefinitions = Object.keys(subTypes).map(className => {
        return "const " + className + '=' + subTypes[className];
    }).join(';');
    var evalString = "(function(){" + classDefinitions + "\nreturn (" + methodString + ")})()";
    return eval(evalString);
}

function schemaToMethodString(schema, subTypes) {
    var method = 'function(item){';
    method += 'if(typeof item!="object")return;';
    method += "const out={};"
    Object.keys(schema).forEach(propName => {
        method += "if(item." + propName + "!==undefined){"
        if (typeof schema[propName] == 'object') {
            if (Array.isArray(schema[propName])) {
                method += "if(Array.isArray(item." + propName + ")){"
                if (!schema[propName].length) {
                    // array of value
                    method += "out." + propName + '=item.' + propName + '.filter(subItem=>typeof subItem!=="object");';
                } else if (typeof(schema[propName][0]) !== 'object') {
                    method += "out." + propName + '=item.' + propName + '.filter(subItem=>typeof subItem!=="object");';
                } else {

                    var className = '_' + randomString(10);
                    subTypes[className] = schemaToMethodString(schema[propName][0], subTypes);

                    method += "out." + propName + '=item.' + propName + '.map(' + className + ').filter(a=>a);';
                }
                method += "}";
            } else {
                var className = '_' + randomString(10);
                subTypes[className] = schemaToMethodString(schema[propName], subTypes);
                method += "out." + propName + '= ' + className + '(item.' + propName + ');';
            }
        } else {
            // value
            method += "out." + propName + '=item.' + propName + ';';
        }
        method += "}"
    });
    method += "return out;"
    method += '}'
        //console.log(method)
    return method;
}


function randomString(length) {
    var chars = 'abcdefghijklmnopqrstuvwxyz';
    chars += chars.toUpperCase();
    var out = '';
    while (out.length < length) {
        out += chars[parseInt(Math.random() * chars.length)]
    }
    return out;
};