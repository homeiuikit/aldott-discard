const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
/** @type {import('next').NextConfig} */
module.exports = { poweredByHeader: false };
