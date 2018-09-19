# 🇿🇦 South Africa National ID Validation

[![npm](https://img.shields.io/npm/v/south-africa-national-id-validation.svg)](https://www.npmjs.com/package/south-africa-national-id-validation) [![Build Status](https://travis-ci.org/ClearScore/south-africa-national-id-validation.svg?branch=master)](https://travis-ci.org/ClearScore/south-africa-national-id-validation) [![Coverage Status](https://coveralls.io/repos/github/ClearScore/south-africa-national-id-validation/badge.svg?branch=master)](https://coveralls.io/github/ClearScore/south-africa-national-id-validation?branch=master) [![GitHub](https://img.shields.io/github/license/clearscore/south-africa-national-id-validation.svg)](https://github.com/ClearScore/south-africa-national-id-validation/blob/master/LICENSE)

Checks the National ID input:
* is valid (regex)
    * correct format
    * correct citizenship
    * correct number of digits
    * not blank
* passes checksum
* has a correct date
* is above a minimum age (optional)

## Usage

```js
import nationalIdNumber from '.'

nationalIdNumber({
    number //(string) the number to check
    minAge //(number) minimum allowed age
    errorMessages: {
        format //(string) error to display when format check fails
        date //(string) error to display when date check fails
        age //(string) error to display when age check fails
        checksum //(string) error to display when checksum check fails
    }
})
```

Check out [the tests](index.test.js) for specific use case examples

---

Based off the [westercape docs](https://www.westerncape.gov.za/general-publication/decoding-your-south-african-id-number-0)

Inspired by [valid-south-african-id](https://github.com/tiaanduplessis/valid-south-african-id)