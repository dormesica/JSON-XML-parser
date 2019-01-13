const { jsonToXml } = require('../index');

const whiteSpacesRegex = /\s/g;

function trimWhiteSpaces(str) {
    return str.replace(whiteSpacesRegex, '');
}

describe('JSON to XML conversion', () => {
    describe('Simple types', () => {
        it('converts numbers', () => {
            const result = jsonToXml({
                number: 1,
            });

            expect(trimWhiteSpaces(result.toString())).toEqual('<data><number>1</number></data>');
        });

        it('converts strings', () => {
            const result = jsonToXml({
                string: 'string',
            });

            expect(trimWhiteSpaces(result.toString())).toEqual('<data><string>string</string></data>');
        });

        it('convers objects', () => {
            const result = jsonToXml({
                obj: {
                    key1: 'string',
                    key2: 2,
                },
            });

            expect(trimWhiteSpaces(result.toString())).toEqual(
                '<data><obj><key1>string</key1><key2>2</key2></obj></data>'
            );
        });

        it('converts arrays', () => {
            const result = jsonToXml({
                array: [1, 2, 3, 4],
            });

            expect(trimWhiteSpaces(result.toString())).toEqual(
                '<data><array><value>1</value><value>2</value><value>3</value><value>4</value></array></data>'
            );
        });
    });
});
