CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE
);

-- to populate
INSERT INTO users (name, email) VALUES ('Ada Lovelace', 'ada@gambiarra.com'),
                                       ('Linus Torvalds', 'linus@gambiarra.com'),
                                       ('Colin Ihrig', 'cjihrig@gmail.com');

-- to retrieve users
SELECT * FROM users WHERE email LIKE '%@gambiarra.com';

-- to update users
UPDATE users SET email = 'linus@gitnatin.com' WHERE name='Linus Torvalds';

-- to delete users
DELETE FROM users WHERE name='Colin Ihrig';
