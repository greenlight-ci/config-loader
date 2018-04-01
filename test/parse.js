const { join } = require('path')
const { test } = require('tap')

const { parse } = require('..')

const fixture = join(__dirname, 'fixtures')

const wanted = { version: '2.0.0', plugins: { foo: true } }

test('parse', async assert => {
  assert.plan(2)

  const content = await parse(join(fixture, 'json', '.greenlight.json'))

  assert.type(content, Object)
  assert.same(content, wanted)
})

test('failure', assert => {
  assert.plan(1)

  assert.rejects(parse(fixture))
})
