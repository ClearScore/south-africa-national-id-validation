/*
 * ZA National Id Validation
 * Based of: https://www.westerncape.gov.za/general-publication/decoding-your-south-african-id-number-0
 * ----------------------------------
 * Validation rules:
 *  13 - digit number
 *  {6} (YYMMDD) date of birth definition
 *  {4} (SSSS) used to define your gender
 *      Females are assigned numbers in the range 0000 - 4999 and males from 5000 - 9999
 *  {1} (C) classify citizenship
 *      SA citizen: 0, Permanent resident: 1
 *  {1} no longer used
 *  {1} checksum digit for verification
 */

// Uses the Luhn Algorithm
// Adapted from https://github.com/tiaanduplessis/mod10-check-digit/blob/master/index.js
export const mod10CheckDigit = ({ number }) => {
    if (typeof number !== 'string') {
        throw new Error('Input should be string');
    }
    const doubledSum = number
        .split('')
        .map((val, index) => {
            if ((index + number.length) % 2 !== 0) {
                const double = Number.parseInt(val, 10) * 2;
                return double > 9 ? double - 9 : double;
            }

            return val;
        })
        .reduce(
            (acc, curr) => Number.parseInt(acc, 10) + Number.parseInt(curr, 10)
        );

    return (doubledSum * 9) % 10;
};

// Based on date-fns answer: https://github.com/date-fns/date-fns/issues/800#issuecomment-403581282
export const isValidDate = dateString => {
    const dateObject = new Date(dateString);
    let [year, month, day] = dateString.split('/');

    // need to reduce month value by 1 to accommodate new Date formats the month
    const formattedMonth = month - 1;
    if (
        dateObject.getFullYear() == year &&
        dateObject.getMonth() == formattedMonth &&
        dateObject.getDate() == day
    ) {
        return true;
    }
    return false;
};

export default function nationalIdNumber({
    number,
    minAge = 18,
    errorMessages = { format: false, date: false, age: false, checksum: false }
}) {
    // Check it's a string
    // -----------------------------------------
    if (typeof number !== 'string') {
        throw new Error('Input should be string');
    }
    // Basic format check first
    // -----------------------------------------
    const re = /^\d{2}[0-1][0-9][0-3]\d\d{4}[0-1]\d{2}$/;
    if (!re.test(number)) {
        return errorMessages.format;
    }

    // Now the date checks
    // -----------------------------------------
    const currentYear = new Date().getFullYear().toString();
    // Dob year is only YY, so we need to guess whether the user is born in 2000s or 1900s
    const century =
        number.substring(0, 2) < currentYear.substring(2, 4) ? '20' : '19';
    const year = `${century}${number.substring(0, 2)}`;
    const month = number.substring(2, 4);
    const day = number.substring(4, 6);
    // Check if valid date
    if (!isValidDate(`${year}/${month}/${day}`)) {
        return errorMessages.date;
    }
    // Check if user in age rage
    if (currentYear - year < minAge) {
        return errorMessages.age;
    }

    // Lastly the CheckSum
    // -----------------------------------------
    if (
        mod10CheckDigit({ number }) !==
        Number.parseInt(number.substring(12, 13), 10)
    ) {
        return errorMessages.checksum;
    }

    return true;
}
