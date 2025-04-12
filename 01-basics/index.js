import { DatabaseSync } from 'node:sqlite';

export const conn = new DatabaseSync(':memory:');

export function createTables() {
  conn.exec(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE
    );
  `);
};

export function insertRecords() {};
export function selectRecords() {};
export function updateRecords() {};
export function deleteRecords() {};

// {
//   conn: 'there should be a conn here',
//   createTables: function() {
//     // test: validate schema created
//     console.log(this.conn)
//   },
//   insert: function() {
//     // test: validate insert
//     console.log(this.conn)
//   },
//   select: function() {
//     // test: validate insert
//     console.log(this.conn)
//   },
//   update: function() {
//     // test: validate update
//     console.log(this.conn)
//   },
//   delete: function() {
//     // test: validate delete
//     console.log(this.conn)
//   },
// };
