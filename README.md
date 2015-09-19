# JSON-XML-Parser
A module for converting between XML format and JSON objects

### installation
``` sh
npm install json-xml-parser
```

### usage

In order to convert JSON object to XML:
``` js
var parser = require('json-xml-parser');
var json = {
	number: 1,
	string: 'string',
	obj: {
		field: 'value'
	},
	array_name: ['element1', 'element2']
};

var xml = parser.jsonToXml(json);
```

Now xml is the root element of an xml tree that looks like this:
``` xml
<data>
	<number>1</number>
	<string>string</string>
	<obj>
		<field>value</field>
	</obj>
	<array_nameArray>
		<array_name>element1</array_name>
		<array_name>element2</array_name>
	</array_nameArray>
</data>
```

It's possible to provide a dictionary that defined that names of the XML elements. E.g.:
``` js
var parser = require('json-xml-parser');
var json = {
	number: 1,
	string: 'string',
	obj: {
		field: 'value'
	},
	array_name: ['element1', 'element2']
};

var xml = parser.jsonToXml(json, { head: 'root', array_name: 'arr'});
```

In this case the XML will look like this:
``` xml
<root>
	<number>1</number>
	<string>string</string>
	<obj>
		<field>value</field>
	</obj>
	<arrArray>
		<arr>element1</arr>
		<arr>element2</arr>
	</arrArray>
</root>
```