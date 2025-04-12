import { describe, test } from 'node:test';
import { conn } from './index.js'

test('concat', (t) => {
  const { value } = conn.prepare('SELECT concat(?, ?) as value').get('Hello', 'World');
  t.assert.equal(value, 'HelloWorld', 'should be able to concat with varargs');
});

// concat with separator and var args
test('concat2', (t) => {
  const { value } = conn.prepare('SELECT concat2(\' \', ?, ?, ?, ?) AS value').get('Maranguape', 'da', 'tribo', 'potiguara');
  t.assert.equal(value, 'Maranguape da tribo potiguara', 'should be able to concat with varargs');
});

