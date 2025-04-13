import { DatabaseSync } from 'node:sqlite';
import { describe, test } from 'node:test';
import { getChangeset } from './index.js'

const sourceDb = new DatabaseSync(':memory:');
const targetDb = new DatabaseSync(':memory:');

sourceDb.exec(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE
  );
`);

targetDb.exec(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE
  );
`);

test('session changeset', (t) => {
  const changeset = getChangeset(sourceDb);
  let result = targetDb.prepare('SELECT * FROM users').all();
  t.assert.deepEqual(result, []);

  result = sourceDb.prepare('SELECT * FROM users').all();
  t.assert.deepStrictEqual(result, [
    {
      __proto__: null,
      id: 1,
      name: 'Mark Grayson',
      email: 'mark@viltrum.com'
    },
    {
      __proto__: null,
      id: 2,
      name: 'Nolan Grayson',
      email: 'nolan@viltrum.com'
    }
  ]);

  targetDb.applyChangeset(changeset);
  result = targetDb.prepare('SELECT * FROM users').all();
  t.assert.deepStrictEqual(result, [
    {
      __proto__: null,
      id: 1,
      name: 'Mark Grayson',
      email: 'mark@viltrum.com'
    },
    {
      __proto__: null,
      id: 2,
      name: 'Nolan Grayson',
      email: 'nolan@viltrum.com'
    }
  ]);
});
