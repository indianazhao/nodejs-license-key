'strict use'
//
const License = require('./License')
const errors = require('./errors')
//
module.exports = (licenseData, serial) => {
  //
  if (!licenseData) throw errors('WINFO_MISSING')
  if (!serial) throw errors('WNOT_STRING')
  //
  try {
    //
    const license = new License(licenseData)
    //
    if (license.serial === serial) {
      return errors()
    } else {
      throw errors('NOT_VALID')
    }
    //
  } catch (err) {
    throw (err)
  }
  //
}
