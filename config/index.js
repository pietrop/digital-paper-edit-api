const dotenv = require('dotenv');
const fs = require('fs');
const result = dotenv.config()

if (result.error) {
  throw result.error
}
const envConfig = dotenv.parse(fs.readFileSync('.env.override'))

for (let k in envConfig) {
  process.env[k] = envConfig[k]
}