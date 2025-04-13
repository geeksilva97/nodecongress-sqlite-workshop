import { describe, test } from 'node:test';
import { createTables, insertRecords, selectRecords, updateRecords, deleteRecords } from './index.js'
import { DatabaseSync } from 'node:sqlite';

const conn = new DatabaseSync(':memory:');

describe('basics', () => {
  test('tables are created', (t) => {
    conn.exec('DROP TABLE IF EXISTS users;');
    createTables(conn);

    const tableInfo = conn.prepare('PRAGMA table_info(users)').all();
    const tableFields = Object.values(tableInfo);

    t.assert.partialDeepStrictEqual(
      tableFields[0],
      {
        name: 'id',
        type: 'INTEGER',
        notnull: 0,
        dflt_value: null,
        pk: 1
      }
    );

    t.assert.partialDeepStrictEqual(
      tableFields[1],
      {
        name: 'name',
        type: 'TEXT',
        notnull: 1,
        dflt_value: null,
        pk: 0
      }
    );

    t.assert.partialDeepStrictEqual(
      tableFields[2],
      {
        name: 'email',
        type: 'TEXT',
        notnull: 0,
        dflt_value: null,
        pk: 0
      }
    );
  });

  test('records are inserted', (t) => {
    insertRecords(conn);
    const result = conn.prepare('SELECT * FROM users').all();

    t.assert.deepStrictEqual(result, [
      {
        __proto__: null,
        id: 1,
        name: 'Ada Lovelace',
        email: 'ada@gambiarra.com'
      },
      {
        __proto__: null,
        id: 2,
        name: 'Linus Torvalds',
        email: 'linus@gambiarra.com'
      },
      {
        __proto__: null,
        id: 3,
        name: 'Colin Ihrig',
        email: 'cjihrig@gmail.com'
      }
    ]);
  });

  test('records are selected', (t) => {
    t.assert.deepStrictEqual(selectRecords(conn), [
      {
        __proto__: null,
        id: 1,
        name: 'Ada Lovelace',
        email: 'ada@gambiarra.com'
      },
      {
        __proto__: null,
        id: 2,
        name: 'Linus Torvalds',
        email: 'linus@gambiarra.com'
      }
    ]);
  });

  test('records are updated', (t) => {
    let result = conn.prepare('SELECT * FROM users WHERE id = 2').get();
    t.assert.deepStrictEqual(result, {
      __proto__: null,
      id: 2,
      name: 'Linus Torvalds',
      email: 'linus@gambiarra.com'
    });

    updateRecords(conn);

    result = conn.prepare('SELECT * FROM users WHERE id = 2').get();
    t.assert.deepStrictEqual(result, {
      __proto__: null,
      id: 2,
      name: 'Linus Torvalds',
      email: 'linus@gitnation.com'
    });
  });

  test('records are deleted', (t) => {
    let result = conn.prepare('SELECT COUNT(*) AS count FROM users').get();
    t.assert.equal(result.count, 3)
    deleteRecords(conn)
    result = conn.prepare('SELECT COUNT(*) AS count FROM users').get();
    t.assert.equal(result.count, 2)
  });
});
