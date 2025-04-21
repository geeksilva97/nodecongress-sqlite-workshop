import { DatabaseSync } from 'node:sqlite';

export const conn = new DatabaseSync(':memory:');

conn.function('myconcat', () => ``);
conn.function('myconcat2', () => {});
