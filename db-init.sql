CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL
);

-- Insert a sample user with hashed password ("password123")
INSERT INTO users (username, password)
VALUES ('bob', '$2a$10$7ERkPjoJ/1yrT8N3g0u4aOQvXnKk5/Fe5hTnRVkxX.ZmUk2mbn7XG')
ON CONFLICT (username) DO NOTHING;
