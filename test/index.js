const { join } = require('path')
const { test } = require('tap')

const config = require('..')

const fixture = join(__dirname, 'fixtures')

const wanted = { version: '2.0.0', plugins: { foo: true } }

test('rc', async assert => {
  assert.plan(2)

  const content = await config(join(fixture, 'rc'))

  assert.type(content, Object)
  assert.same(content, wanted)
})

test('json', async assert => {
  assert.plan(2)

  const content = await config(join(fixture, 'json'))

  assert.type(content, Object)
  assert.same(content, wanted)
})

test('yaml', async assert => {
  assert.plan(2)

  const content = await config(join(fixture, 'yaml'))

  assert.type(content, Object)
  assert.same(content, wanted)
})

test('failure', assert => {
  assert.plan(1)

  assert.rejects(config(fixture))
})
