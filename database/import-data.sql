-- Import real site data (from data/*.json) into D1
-- Run in: Cloudflare Dashboard > D1 > rainha-de-copas-db > Console
-- or: wrangler d1 execute rainha-de-copas-db --file=database/import-data.sql
--
-- This clears the sample rows and inserts the real content.
-- Announcements are NOT touched (no JSON source for them).

DELETE FROM tasks;
DELETE FROM schedule;
DELETE FROM team_members;
DELETE FROM lore_story;

-- TASKS (8 rows from data/tasks.json)
INSERT INTO tasks (name, name_en, description, description_en, status, points, deadline) VALUES
('Construção do Mascote', 'Mascot Construction', 'Construir o mascote da Rainha de Copas com todos os materiais especificados', 'Build the Queen of Hearts mascot with all specified materials', 'completed', 150, '2026-01-15'),
('Design da Camisa Oficial', 'Official T-Shirt Design', 'Criar o design final da camisa oficial da equipe', 'Create the final design of the official team shirt', 'completed', 100, '2026-01-20'),
('Coreografia de Abertura', 'Opening Choreography', 'Desenvolver e ensaiar a coreografia de apresentação da equipe', 'Develop and rehearse the team presentation choreography', 'in_progress', 200, '2026-02-01'),
('Grito de Guerra', 'War Cry', 'Criar e praticar o grito de guerra da equipe', 'Create and practice the team war cry', 'in_progress', 75, '2026-02-05'),
('Decoração do Estande', 'Stand Decoration', 'Planejar e executar a decoração do estande da equipe', 'Plan and execute the team stand decoration', 'pending', 125, '2026-02-10'),
('Produção de Materiais', 'Material Production', 'Produzir faixas, cartazes e materiais promocionais', 'Produce banners, posters and promotional materials', 'pending', 100, '2026-02-15'),
('Vídeo de Apresentação', 'Presentation Video', 'Produzir vídeo de apresentação da equipe', 'Produce the team presentation video', 'pending', 150, '2026-02-20'),
('Desafio de Conhecimentos', 'Knowledge Challenge', 'Preparação para o desafio de conhecimentos gerais', 'Preparation for the general knowledge challenge', 'pending', 200, '2026-02-25');

-- SCHEDULE (8 rows from data/schedule.json)
INSERT INTO schedule (name, name_en, date, time, location, type) VALUES
('Abertura Oficial da Gincana', 'Official Gincana Opening', '2026-02-01', '19:00', 'Ginásio da Escola', 'ceremony'),
('Apresentação das Equipes', 'Team Presentations', '2026-02-02', '14:00', 'Palco Principal', 'presentation'),
('Desafio de Coreografias', 'Choreography Challenge', '2026-02-05', '15:30', 'Ginásio da Escola', 'competition'),
('Grito de Guerra', 'War Cry Competition', '2026-02-08', '10:00', 'Pátio da Escola', 'competition'),
('Desafio de Conhecimentos', 'Knowledge Challenge', '2026-02-12', '13:00', 'Auditório', 'competition'),
('Gincana Cultural', 'Cultural Gincana', '2026-02-15', '09:00', 'Campus da Escola', 'cultural'),
('Competição Esportiva', 'Sports Competition', '2026-02-19', '08:00', 'Campo de Esportes', 'sports'),
('Grande Final e Premiação', 'Grand Finale and Awards', '2026-02-22', '18:00', 'Ginásio da Escola', 'ceremony');

-- TEAM MEMBERS (8 rows from data/team-members.json)
INSERT INTO team_members (name, role, role_en, grade, icon, quote) VALUES
('Alice Silva', 'Capitã da Equipe', 'Team Captain', '3º Ano EM', '👑', 'Liderança com elegância real!'),
('Coelho Branco', 'Vice-Capitão', 'Vice Captain', '3º Ano EM', '🐰', 'Estou atrasado! Estou atrasado!'),
('Cheshire Cat', 'Coordenador Criativo', 'Creative Coordinator', '3º Ano EM', '😺', 'Somos todos loucos aqui!'),
('Chapeleiro Maluco', 'Animator', 'Animator', '3º Ano EM', '🎩', 'Um chá muito, muito louco!'),
('Lagarta', 'Estrategista', 'Strategist', '3º Ano EM', '🐛', 'Quem és tu?'),
('Lebre de Março', 'Designer', 'Designer', '3º Ano EM', '🐇', 'Mais chá, por favor!'),
('Rainha de Copas', 'Mascote Oficial', 'Official Mascot', '3º Ano EM', '👸', 'OFF WITH THEIR HEADS!'),
('Valete de Copas', 'Support', 'Support', '3º Ano EM', '🃏', 'A serviço da Rainha!');

-- LORE STORY (5 rows from data/lore-story.json)
INSERT INTO lore_story (chapter, title, title_en, description, description_en, icon) VALUES
('Capítulo 1', 'O Coelho Branco & O Buraco do Coelho', 'The White Rabbit & Down the Rabbit Hole', 'Tudo começou quando Alice seguiu um coelho branco de colete até o buraco misterioso que a levou ao Wonderland.', 'It all began when Alice followed a white rabbit in a waistcoat down the mysterious hole that led her to Wonderland.', '🐰'),
('Capítulo 2', 'Os Enigmas da Lagarta', 'The Caterpillar''s Riddles', 'No cogumelo mágico, a Lagarta desafiou Alice com enigmas filosóficos sobre identidade e transformação.', 'On the magic mushroom, the Caterpillar challenged Alice with philosophical riddles about identity and transformation.', '🐛'),
('Capítulo 3', 'A Orientação do Gato de Cheshire', 'The Cheshire Cat''s Guidance', 'O gato que aparece e desaparece ensinou Alice que no Wonderland, todos são loucos - inclusive ela.', 'The cat that appears and disappears taught Alice that in Wonderland, everyone is mad - including her.', '😺'),
('Capítulo 4', 'O Caos do Chá do Chapeleiro Maluco', 'The Mad Hatter''s Tea Party Chaos', 'Um chá interminável onde o tempo parou e a loucura reina suprema com o Chapeleiro e a Lebre de Março.', 'An endless tea party where time stopped and madness reigns supreme with the Hatter and the March Hare.', '🎩'),
('Capítulo Final', 'O Jogo de Croquet da Rainha & O Julgamento Absurdo', 'The Queen''s Croquet Game & The Absurd Courtroom Trial', 'A temível Rainha de Copas convida Alice para um jogo de croquet com flamingos e ouriços, culminando em um julgamento onde a sentença é sempre a mesma: ''OFF WITH THEIR HEADS!''', 'The fearsome Queen of Hearts invites Alice to a croquet game with flamingos and hedgehogs, culminating in a trial where the sentence is always the same: ''OFF WITH THEIR HEADS!''', '👑');
