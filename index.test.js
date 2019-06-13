import nationalIdNumber, { mod10CheckDigit, isValidDate } from '.';

describe('nationalIdNumber', () => {
    // Test each number scenario
    // -----------------------------------------
    it.each`
        number              | valid    | type
        ${'9202295029188'}  | ${true}  | ${'valid'}
        ${'7311190013080'}  | ${true}  | ${'valid'}
        ${'6512230302083'}  | ${true}  | ${'valid'}
        ${'7311190T13080'}  | ${false} | ${'invalid format'}
        ${'9202295029187'}  | ${false} | ${'invalid checksum'}
        ${'8813210302087'}  | ${false} | ${'invalid date'}
        ${'9302295029087'}  | ${false} | ${'invalid date'}
        ${'1806110013082'}  | ${false} | ${'too young'}
        ${'6512230302281'}  | ${false} | ${'invalid citizenship'}
        ${'73111900130805'} | ${false} | ${'too many digits'}
        ${'651223030206'}   | ${false} | ${'too few digits'}
        ${''}               | ${false} | ${'blank'}
    `('checks $type returns $valid', ({ number, valid }) => {
        expect(nationalIdNumber({ number })).toEqual(valid);
    });
    // Test error messages work
    // -----------------------------------------
    it.each`
        number              | message
        ${'7311190T13080'}  | ${'format'}
        ${'6512230302281'}  | ${'format'}
        ${'9202295029187'}  | ${'checksum'}
        ${'9302295029087'}  | ${'date'}
        ${'1806110013082'}  | ${'age'}
        ${'73111900130805'} | ${'long'}
        ${'651223030206'}   | ${'short'}
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

describe('isValidDate', () => {
    it.each`
        date            | output
        ${'2020/02/29'} | ${true}
        ${'2020/02/30'} | ${false}
        ${'1993/02/29'} | ${false}
        ${'1988/13/21'} | ${false}
        ${'2000/01/20'} | ${true}
        ${'2000/01/32'} | ${false}
    `('returns correct value $output for $date', ({ date, output }) => {
        expect(isValidDate(date)).toBe(output);
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
