export function makeSourceDb(conn) {
  conn.exec(`
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS order_items;

    -- Users table
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    );

    INSERT INTO users (name, email) VALUES
      ('Alice', 'alice@example.com'),
      ('Bob', 'bob@example.com'),
      ('Charlie', 'charlie@example.com');

    -- Products table
    CREATE TABLE products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL
    );

    INSERT INTO products (name, price) VALUES
      ('Laptop', 999.99),
      ('Smartphone', 499.50),
      ('Headphones', 79.90);

    -- Orders table
    CREATE TABLE orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );

    INSERT INTO orders (user_id) VALUES
      (1), (2), (1);

    -- Order items table
    CREATE TABLE order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      FOREIGN KEY(order_id) REFERENCES orders(id),
      FOREIGN KEY(product_id) REFERENCES products(id)
    );

    INSERT INTO order_items (order_id, product_id, quantity) VALUES
      (1, 1, 1),  -- Alice bought a Laptop
      (1, 3, 2),  -- Alice also bought 2 Headphones
      (2, 2, 1),  -- Bob bought a Smartphone
      (3, 2, 2);  -- Alice again, bought 2 Smartphones
  `);
}
