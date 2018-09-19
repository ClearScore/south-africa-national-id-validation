import nationalIdNumber, { mod10CheckDigit } from '.';

describe('nationalIdNumber', () => {
    // Test each number scenario
    // -----------------------------------------
    it.each`
        number                 | valid    | type
        ${'9401215029086'}     | ${true}  | ${'valid'}
        ${'9401215029087'}     | ${false} | ${'invalid checksum'}
        ${'8813215029086'}     | ${false} | ${'invalid date'}
        ${'1212125029837'}     | ${false} | ${'too young'}
        ${'9001015003382'}     | ${false} | ${'invalid citizenship'}
        ${'80022015324343434'} | ${false} | ${'too many digits'}
        ${'8002201532'}        | ${false} | ${'too few digits'}
        ${''}                  | ${false} | ${'blank'}
    `('checks $type returns $valid', ({ number, valid }) => {
        expect(nationalIdNumber({ number })).toEqual(valid);
    });
    // Test error messages work
    // -----------------------------------------
    it.each`
        number             | message
        ${'80432205422'}   | ${'format'}
        ${'9402325029086'} | ${'date'}
        ${'1702015029086'} | ${'age'}
        ${'9401215029087'} | ${'checksum'}
    `('returns specific error message for $message', ({ number, message }) => {
        const errorMessages = {};
        errorMessages[message] = message;
        expect(nationalIdNumber({ number, errorMessages })).toEqual(message);
    });
    // Type check
    // -----------------------------------------
    it('returns error if not entering a string', () => {
        try {
            nationalIdNumber({ number: 1 });
        } catch (e) {
            expect(e.message).toBe('Input should be string');
        }
    });
});

describe('mod10CheckDigit', () => {
    // Check checksum works
    // -----------------------------------------
    it.each`
        number             | output
        ${'9202204720082'} | ${2}
        ${'7992739871'}    | ${3}
        ${'7240157335352'} | ${4}
    `('returns correct checksum for $number', ({ number, output }) => {
        expect(mod10CheckDigit({ number })).toBe(output);
    });
    // Type check
    // -----------------------------------------
    it('returns error if not entering a string', () => {
        try {
            mod10CheckDigit({ number: 1 });
        } catch (e) {
            expect(e.message).toBe('Input should be string');
        }
    });
});