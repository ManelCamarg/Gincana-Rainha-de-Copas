# 🎴 EQUIPE RAINHA DE COPAS 2026 - Landing Page

Uma landing page moderna e impressionante para a equipe "Rainha de Copas" da Gincana Escolar 2026, com tema inspirado em Alice no País das Maravilhas.

## 🌟 Características

### Design & Tema
- **Tema**: Dark Fantasy / Royal Alice in Wonderland
- **Paleta de Cores**: 
  - Royal Crimson (#8B0000 / #DC143C)
  - Obsidian Black (#0D0D0D / #1A1A1A)
  - Royal Gold (#D4AF37)
  - Crisp White (#FFFFFF)
- **Elementos Visuais**: Naipes de baralho (♠ ♥ ♦ ♣), grids de xadrez, acentos neon vermelho, headers serif elegantês e animações suaves

### Seções Principais

1. **Hero Section**
   - Título impactante: "EQUIPE RAINHA DE COPAS 2026"
   - Subtítulo temático com citação de Alice no País das Maravilhas
   - Contador regressivo em tempo real para a Gincana 2026
   - Botões CTA para navegação
   - Fundo com cartas de baralho animadas flutuando

2. **Painel Semântico - Mascote**
   - Cards interativos com flip animation mostrando materiais do mascote
   - Materiais incluídos: Cabeça de manequim, Peruca vermelha, Baralho, Fita de cetim, Cabo de vassoura/PVC, Tintas, e materiais base

3. **Destaque 3º Ano EM - Equipe & Camisa**
   - Seção especial para a turma do 3º Ano do Ensino Médio
   - Preview do design da camisa oficial
   - Grid de membros da equipe com cargos e citações

4. **A Jornada em Wonderland**
   - Timeline interativa com a história da equipe
   - Capítulos: O Coelho Branco, Enigmas da Lagarta, Gato de Cheshire, Chá do Chapeleiro Maluco, e o Julgamento da Rainha

5. **Dashboard da Gincana**
   - Contador de pontos animado
   - Tracker de tarefas com status (Concluído, Em Andamento, Pendente)
   - Cronograma de eventos com datas e locais

### Funcionalidades Interativas

- **Easter Eggs**: 
  - Clique 3 vezes no Gato de Cheshire para uma surpresa!
  - Atalho de teclado: Ctrl+Q
- **Animações**: 
  - Floating cards com parallax no mousemove
  - Flip cards para informações detalhadas
  - Scroll animations e fade-in effects
  - Glow effects em elementos importantes
- **Responsividade**: Design mobile-first totalmente responsivo

## 🚀 Como Usar

### Opção 1: Abrir Diretamente
1. Abra o arquivo `index.html` diretamente no seu navegador
2. Todas as funcionalidades funcionarão perfeitamente

### Opção 2: Servidor Local (Recomendado)
Se você tiver Python instalado:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Se você tiver Node.js instalado:
```bash
npx serve
```

Depois acesse: `http://localhost:8000`

### Opção 3: VS Code Live Server
1. Instale a extensão "Live Server" no VS Code
2. Clique com botão direito no `index.html`
3. Selecione "Open with Live Server"

## 📁 Estrutura do Projeto

```
Gincana-Rainha-de-Copas/
├── index.html              # Página principal
├── css/
│   └── styles.css         # Estilos customizados e animações
├── js/
│   └── main.js           # Funcionalidades JavaScript
├── data/
│   ├── mascot-materials.json  # Materiais do mascote
│   ├── team-members.json      # Membros da equipe
│   ├── lore-story.json        # História/Lore
│   ├── tasks.json             # Tarefas e desafios
│   └── schedule.json          # Cronograma de eventos
└── README.md              # Este arquivo
```

## 🎨 Customização

### Cores
As cores principais podem ser ajustadas no `css/styles.css`:
- `#DC143C` - Vermelho Royal (Principal)
- `#8B0000` - Vermelho Escuro (Secundário)
- `#D4AF37` - Dourado (Destaques)
- `#0D0D0D` - Preto (Fundo)
- `#1A1A1A` - Cinza Escuro (Cards)

### Dados
Todos os dados estão nos arquivos JSON na pasta `data/`:
- `mascot-materials.json`: Adicione/remova materiais do mascote
- `team-members.json`: Atualize informações da equipe
- `lore-story.json`: Modifique a história/capítulos
- `tasks.json`: Gerencie tarefas e pontos
- `schedule.json`: Atualize cronograma de eventos

### Contador Regressivo
A data alvo está configurada em `js/main.js`:
```javascript
const targetDate = new Date('2026-02-22T18:00:00').getTime();
```

## 🎯 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **Tailwind CSS** (via CDN) - Framework CSS utilitário
- **JavaScript Vanilla** - Funcionalidades interativas
- **Google Fonts** - Cinzel (títulos) e Inter (corpo)
- **JSON** - Armazenamento de dados

## 📱 Responsividade

O site é totalmente responsivo e funciona perfeitamente em:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🎮 Easter Eggs

1. **Gato de Cheshire**: Clique 3 vezes no ícone do gato no canto inferior direito
2. **Atalho de Teclado**: Pressione Ctrl+Q para ativar o easter egg
3. **Floating Cards**: Mova o mouse para ver o efeito parallax nas cartas flutuantes

## 🚀 Performance

- Otimizado para carregamento rápido
- Animações CSS suaves
- Lazy loading de dados JSON
- Minimal dependencies (apenas CDN)

## 📝 Notas

- O site usa Tailwind CSS via CDN, então requer conexão com internet
- Todos os dados são carregados dinamicamente dos arquivos JSON
- As animações são otimizadas para performance
- O design segue princípios de acessibilidade

## 🎨 Inspiração

Design inspirado em:
- Alice no País das Maravilhas (Lewis Carroll)
- Dark Fantasy aesthetics
- Royal court elegance
- Playing card symbolism

---

**Desenvolvido com ❤️ para a Equipe Rainha de Copas 2026**

*"We're all mad here!"* - Cheshire Cat