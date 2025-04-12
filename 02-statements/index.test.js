import { describe, test } from 'node:test';
import { DatabaseSync } from 'node:sqlite';
import { getAllUsers, getAllUsersIterator, getUserByEmail, runStmt, runStmtWithNamedParams } from './index.js'

export const dbPath = ':memory:';
export const conn = new DatabaseSync(dbPath);

conn.exec(`CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE
);`);

test('statements', (t) => {
  let result = runStmt(conn, {
    name: 'Chico Anysio',
    email: 'chico.anysio@maranguape.com'
  });

  t.assert.deepStrictEqual(result, { lastInsertRowid: 1, changes: 1 });
  result = runStmtWithNamedParams(conn, {
    name: 'Dart Vader',
    email: 'dart.vader@lucasfilm.com'
  });

  t.assert.deepStrictEqual(result, { lastInsertRowid: 2, changes: 1 });
  t.assert.deepStrictEqual(getAllUsers(conn), [
    {
      __proto__: null,
      id: 1,
      name: 'Chico Anysio',
      email: 'chico.anysio@maranguape.com'
    },
    {
      __proto__: null,
      id: 2,
      name: 'Dart Vader',
      email: 'dart.vader@lucasfilm.com'
    }
  ]);
  t.assert.deepStrictEqual(getUserByEmail(conn, 'chico.anysio@maranguape.com'), {
    __proto__: null,
    id: 1,
    name: 'Chico Anysio',
    email: 'chico.anysio@maranguape.com'
  });

  result = getAllUsersIterator(conn);
  t.assert.strictEqual(result instanceof globalThis.Iterator, true);
  t.assert.ok(result[Symbol.iterator]);
  t.assert.deepStrictEqual(result.toArray(), [
    {
      __proto__: null,
      id: 1,
      name: 'Chico Anysio',
      email: 'chico.anysio@maranguape.com'
    },
    {
      __proto__: null,
      id: 2,
      name: 'Dart Vader',
      email: 'dart.vader@lucasfilm.com'
    }
  ]);
});
