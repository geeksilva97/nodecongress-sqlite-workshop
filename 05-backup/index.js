import { backup } from 'node:sqlite';

export const performBackup = async (conn, destPath, { onProgress }) => {
  return backup(conn, destPath, {
    rate: 1,
    progress: onProgress
  });
};
