# JSON-XML-Parser

A module for converting between XML format and JSON objects

## Installation

```sh
npm install --save json-xml-parser
```

or

```sh
yarn add json-xml-parser
```

## Usage

In order to convert JSON object to XML:

```js
const parser = require('json-xml-parser');
const json = {
    number: 1,
    string: 'string',
    obj: {
        key: 'value',
    },
    array_name: ['element1', 'element2'],
};

const xml = parser.jsonToXml(json);
```

Now xml is the root element of an xml tree that looks like this:

```xml
<data>
    <number>1</number>
    <string>string</string>
    <obj>
        <key>value</key>
    </obj>
    <array_name>
        <value>element1</value>
        <value>element2</value>
    </array_name>
</data>
```

It's possible to provide a dictionary that defines the names of the XML elements. E.g.:

```js
const parser = require('json-xml-parser');
const json = {
    number: 1,
    string: 'string',
    obj: {
        field: 'value',
    },
    array_name: ['element1', 'element2'],
};

const xml = parser.jsonToXml(json, { head: 'root', array_name: 'arr' });
```

In this case the XML will look like this:

```xml
<root>
    <number>1</number>
    <string>string</string>
    <obj>
        <field>value</field>
    </obj>
    <arr>
        <value>element1</value>
        <avaluerr>element2</value>
    </arr>
</root>
```
