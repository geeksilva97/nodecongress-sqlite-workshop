import { DatabaseSync } from 'node:sqlite';

export const conn = new DatabaseSync(':memory:');

conn.function('concat', (a, b) => `${a}${b}`);
conn.function('concat2', {
  varargs: true
}, (separator, ...args) => `${args.join(separator)}`);
