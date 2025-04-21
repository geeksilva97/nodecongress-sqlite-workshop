export function createTables(conn) {
  conn.exec(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE
    );
  `);
};

export function insertRecords(conn) {
  conn.exec(`
    INSERT INTO users (name, email) VALUES ('Ada Lovelace', 'ada@gambiarra.com'),
                                       ('Linus Torvalds', 'linus@gambiarra.com'),
                                       ('Colin Ihrig', 'cjihrig@gmail.com');
  `);
};
export function selectRecords(conn) {
  return conn.prepare("SELECT * FROM users WHERE email LIKE '%@gambiarra.com';").all();
};
export function updateRecords(conn) {
  conn.exec("UPDATE users SET email = 'linus@gitnation.com' WHERE name = 'Linus Torvalds';");
};
export function deleteRecords(conn) {
  conn.exec("DELETE FROM users WHERE name='Colin Ihrig';");
};
