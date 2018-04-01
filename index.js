const { join, extname } = require('path')
const { promisify } = require('util')
const { readdir, readFile } = require('fs')
const { safeLoad } = require('js-yaml')
const { schema, regex } = require('@greenlight/schema-config')
const Ajv = require('ajv')

const dir = promisify(readdir)
const file = promisify(readFile)

// force AJV to be async
schema.$async = true

const ajv = new Ajv()
const validate = ajv.compile(schema)

const required = () => {
  throw new Error('no config file found')
}

function parse (filename) {
  return file(filename)
    .then(content => {
      switch (extname(filename)) {
        case '.yml':
        case '.yaml':
          return safeLoad(content)

        default:
          return JSON.parse(content)
      }
    })

    .then(data => validate(data))
}

function discover (path) {
  return dir(path)
    .then(files => files.find(name => regex.test(name)))
    .then((name = required()) => name)
    .then(name => parse(join(path, name)))
}

module.exports = {
  parse,
  discover
}
