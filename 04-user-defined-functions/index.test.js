import { test } from 'node:test';
import { conn } from './index.js'

test('myconcat', (t) => {
  const { value } = conn.prepare('SELECT myconcat(?, ?) as value').get('Hello', 'World');
  t.assert.equal(value, 'HelloWorld', 'should be able to concat with varargs');
  t.assert.throws(() => {
    conn.prepare('SELECT myconcat(?, ?, ?) as value').get('Hello', 'World');
  }, {
    message: 'wrong number of arguments to function myconcat()'
  });
});

// concat with separator and var args
test('myconcat2', (t) => {
  const { value } = conn.prepare('SELECT myconcat2(\' \', ?, ?, ?, ?) AS value').get('Maranguape', 'da', 'tribo', 'potiguara');
  t.assert.equal(value, 'Maranguape da tribo potiguara', 'should be able to concat with varargs');
});

