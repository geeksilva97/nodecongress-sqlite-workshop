import { describe, test } from 'node:test';
import { conn, createTables } from './index.js'

describe('basics', () => {
  test('connection to sqlite', (t) => {
    t.assert.doesNotThrow(() => {
      const randomInteger = Math.floor(Math.random() * 10000);
      const r = conn.prepare(`SELECT ${randomInteger} as value`).get();
      t.assert.equal(r.value, randomInteger, 'should be able to run a query');
    }, 'ensure the exported conn is a sqlite connection (aka DatabaseSync instance)');
  });

  test('tables are created', (t) => {
    conn.exec('DROP TABLE IF EXISTS users;');
    createTables();

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

  test.todo('records are inserted');
  test.todo('records are selected');
  test.todo('records are updated');
  test.todo('records are deleted');
});
