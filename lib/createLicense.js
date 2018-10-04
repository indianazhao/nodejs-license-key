'use strict'
//
const License = require('./License')
const errors = require('./errors')
//
module.exports = (licenseData) => {
    //
    try {
        const license = new License(licenseData)
        let result = errors()
        result.license = license.getSerial()
        return result
    } catch (err) {
        throw err
    }
    //
}
