-- Criação da tabela de Usuários
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20)
);

-- Criação da tabela de Quadros
CREATE TABLE IF NOT EXISTS boards (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Criação da tabela de Colunas
CREATE TABLE IF NOT EXISTS columns (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    display_order INTEGER NOT NULL,
    board_id INTEGER REFERENCES boards(id) ON DELETE CASCADE
);

-- Criação da tabela de Cards
CREATE TABLE IF NOT EXISTS cards (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    column_id INTEGER REFERENCES columns(id) ON DELETE CASCADE
);