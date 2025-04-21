import { backup, DatabaseSync } from 'node:sqlite';
import { after, test } from 'node:test';
import { rmSync } from 'node:fs';
import { performBackup } from './index.js';
import { makeSourceDb } from './support.js';

let counter = 0;

const source = new DatabaseSync(`./tmp/${counter++}.db`);
makeSourceDb(source);

after(() => {
  source.close();
  for (let i = 0; i < counter; i++) {
    rmSync(`./tmp/${i}.db`, {
      force: true
    });
  }
});

test('backup', async (t) => {
  let calls = 0;
  await performBackup(source, `./tmp/${counter++}.db`, {
    onProgress: () => calls++
  });

  t.assert.ok(calls > 0);
});

