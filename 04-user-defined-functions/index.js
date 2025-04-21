import { DatabaseSync } from 'node:sqlite';

export const conn = new DatabaseSync(':memory:');

conn.function('myconcat', (a, b) => `${a}${b}`);
conn.function('myconcat2', {
  varargs: true
}, (separator, ...args) => `${args.join(separator)}`);
