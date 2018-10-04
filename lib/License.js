'use strict'
//
const md5 = require('md5')
//
const crypt = require('./encrypt-decrypt')
const errors = require('./errors')
const os = require('./supported')
//
module.exports = class License {
    //
  constructor ({ info, prodCode, appVersion = '1.0', osType } = {}) {
    //
    if (!info || typeof info !== 'object') throw errors('WINFO_MISSING')
    if (!prodCode) throw errors('WPRODCODE_MISSING')
    // setters
    this._info = info
    this._prodCode = prodCode
    this._appVersion = appVersion
    this._osType = os[osType]
    this.id
    this.serial
    this.updateSerial()
  }
    // setters
    set info (info) {
        if (info) {
            this._info = info
            updateSerial()
        }
    }
    //
    set prodCode (prodCode) {
        if (prodCode) {
            this._prodCode = prodCode
            updateSerial()
        }
    }
    set appVersion (appVersion) {
        if (appVersion) {
            this._appVersion = appVersion
            updateSerial()
        }
    }
    set osType (osType) {
        if (osType) {
            this._osType = osType
            updateSerial()
        }
    }
    //
    updateSerial () {
        this.id = generateHash(this._info, this._prodCode, this._appVersion, this._osType)
        this.serial = createSerial(this.id, this._info)
    }
    //
    getSerial () {
        return this.serial
    }
}

let createSerial = (id) => {
    return generateSerial(id)
}

let generateHash = (info, prodCode, appVersion, osType) => {
    //
    let userInfo = []
    //
    Object.keys(info).forEach((key) => {
        const val = info[key]
        userInfo.push(val)
    })
    //
    let str = userInfo.join()
    const reg = new RegExp('[^0-9a-zA-Z]+', 'g')
    info = str.replace(reg, '')
    //
    const infoClean = info.toUpperCase()
    //
    const regVr = new RegExp('\\.+', 'g')
    const appVr = appVersion.replace(regVr, '')
    //
    const uniqueOSID = generateOSHash(osType)
    //
    const userInfoStr = infoClean + prodCode + appVr + uniqueOSID
    return (md5(userInfoStr)).toUpperCase()
}

let generateSerial = (id) => {
    var regKey = crypt.encryptString(id).toString()
    return chunkString(regKey, 5)
}

let chunkString = (str, length) => {
    const regEx = new RegExp('.{1,' + length + '}', 'g')
    let newStr = str.match(regEx)
    // trim extra
    if (newStr.length > 6) newStr.pop()
    return newStr.join('-').toUpperCase()
}

let generateOSHash = (osType) => {
    var osHash = ''
    if (osType) {
        var strObj = osType.os + osType.type + osType.version
        osHash = strObj.replace('.', '').replace('-', '').toUpperCase()
    }
    return osHash
}
