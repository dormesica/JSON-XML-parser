// ----- decription -----

// The module contains a function that takes a JSON object and converts it
// to XML format using a dictionaty provided by the user.
// If no dictionary is provided to the function (i.e. dict === null or dict === undefined)
// the names of the fields in the JSON object will be the names of the fields in
// generated XML.

const xmlBuilder = require('xmlbuilder');
const _ = require('lodash');

// ----- function definition -----

/**
 * Converts a JSON object to XML format using the given dictionary.
 * If no dictionary is provided the names of the XML elements will
 * correspond to the names of the JSON fields.
 *
 * In the dictionary the field 'head' is used to indicate the name of the
 * root element in the XML. If not specified defaults to 'data'.
 *
 * @param json {JSON} The JSON object the needs converting.
 * @param dict {Object} The dictinary for the convertion.
 * @return
 */
function jsonToXml(json, dict) {
    // if no dictionary if provided generate one by using the name of
    // the JSON fields.
    dict = dict === null ? undefined : dict; // handle null as undefined
    dict = generateDictionary(json, dict);

    // create the xml object
    const xml = xmlBuilder.create(dict.head);

    // create the queue and initialize it with the json fields
    // var queue = [];
    const queue = Object.entries(json).map(([key, value]) => ({
        parent: xml,
        name: dict[key],
        value,
    }));
    // for (var field in json) {
    //     queue.push({
    //         parent: xml,
    //         name: dict[field],
    //         value: json[field],
    //     });
    // }

    // add the values to the xml
    while (queue.length != 0) {
        let curr = queue.shift(); // get the next value from the queue

        if (Array.isArray(curr.value)) {
            const arrayRoot = curr.parent.ele(curr.name);

            // add the elements in the array to the queue with arrayRoot as
            // parent element and curr.name as element name
            curr.value.forEach(elem => {
                queue.push({
                    parent: arrayRoot,
                    name: 'value',
                    value: elem,
                });
            });
        } else if (isObject(curr.value)) {
            const objectRoot = curr.parent.ele(curr.name);

            // add each field of the object to the array with objectRoot as
            // it's parent and dict[field_name] as the element name
            Object.entries(curr.value).forEach(([key, value]) => {
                queue.push({
                    parent: objectRoot,
                    name: dict[key],
                    value,
                });
            });
            // for (var field in curr.value) {
            //     queue.push({
            //         parent: objectRoot,
            //         name: dict[field],
            //         value: curr.value[field],
            //     });
            // }
        } else {
            // else, for regular elements
            curr.parent.ele(curr.name, {}, curr.value);
        }
    }

    xml.end({ pretty: true });

    return xml;
}

/**
 * Created a dictionary that maps the names of the JSON fields to a string that
 * represents them.
 *
 * Example:
 * for the JSON:
 *		{
 *			field_1: ...,
 *			field_2: ...,
 *			field_3: ...
 *		}
 * the returned dictionary will be:
 *		{
 *			field_1: 'field_1',
 *			field_2: 'field_2',
 *			field_3: 'field_3'
 *		}
 *
 * @param {JSON} json The JSON object from which the dictionary is generated.
 * @return {Object} An object that represents the dictionary.
 */
function generateDictionary(json, dict) {
    dict = dict || {}; // create empty dictionary if undefined is given
    dict.head = dict.head || 'data';

    const queue = [json];

    while (queue.length != 0) {
        const obj = queue.shift();

        for (let field in obj) {
            dict[field] = dict[field] || field;

            // if encountered an object that is not an array, recursively add the fields
            // in this object to the array
            if (typeof obj[field] === 'object' && !Array.isArray(obj[field])) {
                queue.push(obj[field]);
            }
        }
    }

    return dict;
}

/**
 * Checks if the given value is a non-null object.
 * @param {*} obj The value to check
 * @returns {boolean} True if the value is an object, false otherwise.
 */
function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
}

// exported items
module.exports = jsonToXml;
