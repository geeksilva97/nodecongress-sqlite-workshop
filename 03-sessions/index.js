function executeQueries(conn) {
  conn.exec(`INSERT INTO users (name, email) VALUES ('Mark Grayson', 'mark@viltrum.com'),
                                                    ('Nolan Grayson', 'nolan@viltrum.com')`);
}

export function getChangeset(conn) {
  const session = conn.createSession();
  executeQueries(conn);
  return session.changeset();
}
