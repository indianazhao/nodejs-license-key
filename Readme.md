# Nodejs-License-Key v1.0.0

This project is forked from the NPM module [LicenseKey](https://www.npmjs.com/package/licensekey).

## Docs

Generate a License Key and validate the license. This is typically used for software licensing (serial number).

## Installation
```
npm install nodejs-license-key
```

## Data Structure
To create a license key - Enter the users information that your are able to recieve.

This object can be any data you wish to tie the license to - format Object
```
var userInfo = {
  company: 'www.funwoo.com',
  street: 'Taipei 101',
  city: 'Taipei',
  state: 'Taiwan',
  zip: '100'
};
```
Must include:
1) prodCode (string) - product abbr name, can be any size
2) appVersion (string) - optional if you want to tie the license to a version number
3) osType (string) - lock the license to a specific operating system, supported: 
    * Windows: WIN, WIN7, WIN8,WIN10
    * Macintosh: OSX, OSX1, OSX2, OSX3, OSX4, OSX5, OSX6, OSX7, OSX8, OSX9, OSX10, OSX11, OSX12
    * Apple Mobile: IOS, IOS5, IOS6, IOS7, IOS8, IOS9,IOS10
    * Google Mobile: ANDROID, ANDROID2, ANDROID3, ANDROID4, ANDROID43, ANDROID44, ANDROID5, ANDROID6, ANDROID7
    OTHER

```
var userLicense = {
  info: userInfo,
  prodCode: 'MyProject',
  appVersion: '1.5',
  osType: 'WIN'
};
```

## Init
```
var licenseKey = require('licensekey');
```

## Create a License Key
Then run the following code to recieve the License for the client
This function to be run ONLY for you to generate the license code for the client
```
var licenseKey = require('licensekey');

var userLicense = {
  info: userInfo,
  prodCode: 'LEN100120',
  appVersion: '1.5',
  osType: 'IOS8'
};

try{
  var license = licenseKey.createLicense(userLicense)
  console.log(license);
}catch(err){
  console.log(err);
}
```

if success returns
```
{ errorCode: 0,  message: 'ok',  license: 'WTYSA-XZ31V-7ZYV6-21A22-3E53F-D675B' }
```

if error, returns
```
{ errorCode: 1002, message: 'product code missing' }
```

## Validate a License Key
On client side your application will pass the user information (Data Structure) and License Key:
```
var licenseKey = require('licensekey');

var userLicense = {
  info: userInfo,
  prodCode: 'LEN100120',
  appVersion: '1.5',
  osType: 'IOS8'
};

try{
  var license = licensekey.validateLicense(userLicense, 'WTYSA-XZ31V-7ZYV6-21A22-3E53F-D675B');
  console.log(license);
}catch(err){
  console.log(err);
}
```
if success returns
```
{ errorCode: 0, message: 'ok' }
```

if error, returns
```
{ errorCode: 1006, message: 'license not valid' }
```

## Support
Tested in Chrome 53-54, Firefox 48-49, IE 11, Edge 14, Safari 9-10, Node.js 6-7, & PhantomJS 2.1.1.<br>
Automated test runs are available.


