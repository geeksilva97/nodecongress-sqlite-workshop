export const runStmt = (conn, { name, email }) => conn.prepare('INSERT INTO users (name, email) VALUES (?, ?)').run(name, email);
export const runStmtWithNamedParams = (conn, { name, email }) => conn.prepare('INSERT INTO users (name, email) VALUES ($name, $email)').run({ name, email });
export const getAllUsers = (conn) => conn.prepare('SELECT * FROM users').all();
export const getUserByEmail = (conn, email) => conn.prepare('SELECT * FROM users WHERE email = ?').get(email);
export const getAllUsersIterator = (conn) => conn.prepare('SELECT * FROM users').iterate();
