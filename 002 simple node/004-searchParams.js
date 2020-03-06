//node 004-searchParams.js
const { URL, URLSearchParams } = require('url');
const myURL = new URL('https://example.org/?abc=123');
console.log(myURL.searchParams.get('abc'));