-- Cloudflare D1 Database Schema for Rainha de Copas Admin System

-- Users table (for admin authentication)
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sessions table (for secure session management)
CREATE TABLE IF NOT EXISTS sessions (
  session_id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  name_en TEXT,
  description TEXT NOT NULL,
  description_en TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  points INTEGER NOT NULL DEFAULT 0,
  deadline TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Schedule table
CREATE TABLE IF NOT EXISTS schedule (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  name_en TEXT,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'ceremony',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  role_en TEXT,
  grade TEXT NOT NULL,
  icon TEXT NOT NULL,
  quote TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Lore/story table
CREATE TABLE IF NOT EXISTS lore_story (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chapter TEXT NOT NULL,
  title TEXT NOT NULL,
  title_en TEXT,
  description TEXT NOT NULL,
  description_en TEXT,
  icon TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Note: First admin user must be created manually after database setup
-- Use a secure method to generate password hash and insert into users table

-- Insert sample data (can be removed after initial setup)
INSERT INTO tasks (name, name_en, description, description_en, status, points, deadline) VALUES
('Construção do Mascote', 'Mascot Construction', 'Construir o mascote da Rainha de Copas', 'Build the Queen of Hearts mascot', 'completed', 150, '2026-01-15'),
('Design da Camisa Oficial', 'Official T-Shirt Design', 'Criar o design final da camisa oficial', 'Create the final design of the official team shirt', 'completed', 100, '2026-01-20'),
('Coreografia de Abertura', 'Opening Choreography', 'Desenvolver e ensaiar a coreografia', 'Develop and rehearse the choreography', 'in_progress', 200, '2026-02-01');

INSERT INTO schedule (name, name_en, date, time, location, type) VALUES
('Abertura Oficial da Gincana', 'Official Gincana Opening', '2026-02-01', '19:00', 'Ginásio da Escola', 'ceremony'),
('Apresentação das Equipes', 'Team Presentations', '2026-02-02', '14:00', 'Palco Principal', 'presentation'),
('Desafio de Coreografias', 'Choreography Challenge', '2026-02-05', '15:30', 'Ginásio da Escola', 'competition');

INSERT INTO team_members (name, role, role_en, grade, icon, quote) VALUES
('Alice Silva', 'Capitã da Equipe', 'Team Captain', '3º Ano EM', '👑', 'Liderança com elegância real!'),
('Coelho Branco', 'Vice-Capitão', 'Vice Captain', '3º Ano EM', '🐰', 'Estou atrasado! Estou atrasado!'),
('Cheshire Cat', 'Coordenador Criativo', 'Creative Coordinator', '3º Ano EM', '😺', 'Somos todos loucos aqui!');

INSERT INTO lore_story (chapter, title, title_en, description, description_en, icon) VALUES
('Capítulo 1', 'O Coelho Branco & O Buraco do Coelho', 'The White Rabbit & Down the Rabbit Hole', 'Tudo começou quando Alice seguiu um coelho branco...', 'It all began when Alice followed a white rabbit...', '🐰'),
('Capítulo 2', 'Os Enigmas da Lagarta', 'The Caterpillar''s Riddles', 'No cogumelo mágico, a Lagarta desafiou Alice...', 'On the magic mushroom, the Caterpillar challenged Alice...', '🐛');

INSERT INTO announcements (title, content, is_active) VALUES
('Bem-vindo ao Wonderland!', 'A equipe Rainha de Copas convida todos a participarem desta jornada mágica pela Gincana 2026.', 1);