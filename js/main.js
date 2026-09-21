// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loader
    initLoader();
    
    // Initialize all components
    initCountdown();
    initFloatingCards();
    initParticles();
    initMascotCards();
    initTeamMembers();
    initLoreTimeline();
    initDashboard();
    initEasterEggs();
    initMobileMenu();
    initSmoothScroll();
    initAnimations();
    initScrollProgress();
    initMagneticButtons();
});

// Loader
function initLoader() {
    const loader = document.getElementById('loader');
    
    // Hide loader after animation
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2500);
}

// Countdown Timer
function initCountdown() {
    // Set target date to February 22, 2026 (Grand Finale)
    const targetDate = new Date('2026-02-22T18:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            document.getElementById('countdown').innerHTML = '<p class="text-[#DC143C] text-2xl font-bold">A Gincana Começou!</p>';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Floating Cards Background
function initFloatingCards() {
    const container = document.getElementById('floating-cards');
    const suits = ['♠', '♥', '♦', '♣'];
    const colors = ['#DC143C', '#D4AF37', '#FFFFFF'];
    
    for (let i = 0; i < 20; i++) {
        const card = document.createElement('div');
        card.className = 'floating-card';
        card.textContent = suits[Math.floor(Math.random() * suits.length)];
        card.style.left = Math.random() * 100 + '%';
        card.style.top = Math.random() * 100 + '%';
        card.style.color = colors[Math.floor(Math.random() * colors.length)];
        card.style.animationDelay = Math.random() * 5 + 's';
        card.style.fontSize = (Math.random() * 2 + 1) + 'rem';
        container.appendChild(card);
    }
}

// Particles System
function initParticles() {
    const container = document.getElementById('particles-container');
    const colors = ['#DC143C', '#D4AF37', '#FFFFFF'];
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = color;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        
        container.appendChild(particle);
    }
}

// Scroll Progress
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Magnetic Buttons
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// Mascot Cards
async function initMascotCards() {
    try {
        const response = await fetch('data/mascot-materials.json');
        if (!response.ok) throw new Error('Failed to load mascot materials');
        const data = await response.json();
        const container = document.getElementById('mascot-cards');
        
        if (!container) {
            console.error('Mascot cards container not found');
            return;
        }
        
        // Clear container first
        container.innerHTML = '';
        
        data.materials.forEach((material, index) => {
            const card = document.createElement('div');
            card.className = 'card-flip-container glass border border-[#DC143C]/30 rounded-xl p-6 h-48 card-modern';
            card.style.animationDelay = `${index * 0.1}s`;
            
            card.innerHTML = `
                <div class="card-flip-inner h-full">
                    <div class="card-flip-front flex flex-col items-center justify-center h-full">
                        <span class="text-4xl mb-3 animate-float">${material.icon}</span>
                        <h3 class="font-['Cinzel'] text-lg font-bold text-[#960018] text-center">${material.name}</h3>
                        <p class="text-gray-600 text-sm text-center mt-2">${material.category}</p>
                    </div>
                    <div class="card-flip-back flex flex-col items-center justify-center h-full glass p-4">
                        <p class="text-gray-700 text-sm text-center">${material.description}</p>
                        <p class="text-[#B8860B] text-xs text-center mt-2 italic">${material.name_en}</p>
                    </div>
                </div>
            `;
            
            container.appendChild(card);
        });
        
        console.log('Mascot cards loaded successfully');
    } catch (error) {
        console.error('Error loading mascot materials:', error);
        // Fallback: Use embedded data if fetch fails
        const container = document.getElementById('mascot-cards');
        if (container) {
            container.innerHTML = '';
            const fallbackMaterials = [
                { id: 1, name: "Cabeça de Manequim", name_en: "Mannequin Head", icon: "🗣️", description: "Base principal para a estrutura do mascote", description_en: "Main base for the mascot structure", category: "Estrutura" },
                { id: 2, name: "Peruca Vermelha", name_en: "Red Wig", icon: "💇", description: "Cabelo característico da Rainha de Copas", description_en: "Characteristic hair of the Queen of Hearts", category: "Visual" },
                { id: 3, name: "Baralho", name_en: "Playing Cards", icon: "🃏", description: "Elementos decorativos temáticos", description_en: "Thematic decorative elements", category: "Decoração" },
                { id: 4, name: "Fita de Cetim Vermelha", name_en: "Red Satin Ribbon", icon: "🎀", description: "Detalhes elegantes e acabamento", description_en: "Elegant details and finishing", category: "Acabamento" },
                { id: 5, name: "Cabo de Vassoura ou PVC", name_en: "Broomstick or PVC Pipe", icon: "🪄", description: "Estrutura de suporte para o corpo", description_en: "Support structure for the body", category: "Estrutura" },
                { id: 6, name: "Tinta Guache", name_en: "Paints", icon: "🎨", description: "Vermelho, preto e branco para detalhes", description_en: "Red, black, and white for details", category: "Pintura" },
                { id: 7, name: "Jornal", name_en: "Newspaper", icon: "📰", description: "Material base para modelagem", description_en: "Base material for modeling", category: "Base" },
                { id: 8, name: "Papel Vermelho", name_en: "Red Paper", icon: "📄", description: "Decoração e detalhes temáticos", description_en: "Decoration and thematic details", category: "Decoração" },
                { id: 9, name: "Papel Filme", name_en: "Plastic Wrap", icon: "🎁", description: "Proteção e acabamento", description_en: "Protection and finishing", category: "Acabamento" },
                { id: 10, name: "Papelão", name_en: "Cardboard", icon: "📦", description: "Estrutura reforçada", description_en: "Reinforced structure", category: "Estrutura" },
                { id: 11, name: "Cola Líquida", name_en: "Liquid Glue", icon: "🧴", description: "Fixação e montagem", description_en: "Fixation and assembly", category: "Montagem" }
            ];
            
            fallbackMaterials.forEach((material, index) => {
                const card = document.createElement('div');
                card.className = 'card-flip-container glass border border-[#DC143C]/30 rounded-xl p-6 h-48 card-modern';
                card.style.animationDelay = `${index * 0.1}s`;
                
                card.innerHTML = `
                    <div class="card-flip-inner h-full">
                        <div class="card-flip-front flex flex-col items-center justify-center h-full">
                            <span class="text-4xl mb-3 animate-float">${material.icon}</span>
                            <h3 class="font-['Cinzel'] text-lg font-bold text-[#960018] text-center">${material.name}</h3>
                            <p class="text-gray-600 text-sm text-center mt-2">${material.category}</p>
                        </div>
                        <div class="card-flip-back flex flex-col items-center justify-center h-full glass p-4">
                            <p class="text-gray-700 text-sm text-center">${material.description}</p>
                            <p class="text-[#B8860B] text-xs text-center mt-2 italic">${material.name_en}</p>
                        </div>
                    </div>
                `;
                
                container.appendChild(card);
            });
        }
    }
}

// Team Members
async function initTeamMembers() {
    try {
        const response = await fetch('data/team-members.json');
        if (!response.ok) throw new Error('Failed to load team members');
        const data = await response.json();
        const container = document.getElementById('team-members');
        
        if (!container) {
            console.error('Team members container not found');
            return;
        }
        
        // Clear container first
        container.innerHTML = '';
        
        data.members.forEach((member, index) => {
            const memberCard = document.createElement('div');
            memberCard.className = 'glass border border-[#D4AF37]/30 rounded-xl p-6 text-center card-modern cursor-pointer';
            memberCard.style.animationDelay = `${index * 0.1}s`;
            
            memberCard.innerHTML = `
                <div class="text-5xl mb-4 animate-float">${member.icon}</div>
                <h3 class="font-['Cinzel'] text-xl font-bold text-[#960018] mb-2">${member.name}</h3>
                <p class="text-[#B8860B] font-semibold mb-1">${member.role}</p>
                <p class="text-gray-600 text-sm mb-3">${member.grade}</p>
                <p class="text-gray-700 text-sm italic">"${member.quote}"</p>
            `;
            
            // Add click event for modal
            memberCard.addEventListener('click', () => {
                openTeamModal(member);
            });
            
            container.appendChild(memberCard);
        });
        
        // Initialize team modal
        initTeamModal();
        
        console.log('Team members loaded successfully');
    } catch (error) {
        console.error('Error loading team members:', error);
        // Fallback: Use embedded data
        const container = document.getElementById('team-members');
        if (container) {
            container.innerHTML = '';
            const fallbackMembers = [
                { id: 1, name: "Alice Silva", role: "Capitã da Equipe", role_en: "Team Captain", grade: "3º Ano EM", icon: "👑", quote: "Liderança com elegância real!" },
                { id: 2, name: "Coelho Branco", role: "Vice-Capitão", role_en: "Vice Captain", grade: "3º Ano EM", icon: "🐰", quote: "Estou atrasado! Estou atrasado!" },
                { id: 3, name: "Cheshire Cat", role: "Coordenador Criativo", role_en: "Creative Coordinator", grade: "3º Ano EM", icon: "😺", quote: "Somos todos loucos aqui!" },
                { id: 4, name: "Chapeleiro Maluco", role: "Animator", role_en: "Animator", grade: "3º Ano EM", icon: "🎩", quote: "Um chá muito, muito louco!" },
                { id: 5, name: "Lagarta", role: "Estrategista", role_en: "Strategist", grade: "3º Ano EM", icon: "🐛", quote: "Quem és tu?" },
                { id: 6, name: "Lebre de Março", role: "Designer", role_en: "Designer", grade: "3º Ano EM", icon: "🐇", quote: "Mais chá, por favor!" },
                { id: 7, name: "Rainha de Copas", role: "Mascote Oficial", role_en: "Official Mascot", grade: "3º Ano EM", icon: "👸", quote: "OFF WITH THEIR HEADS!" },
                { id: 8, name: "Valete de Copas", role: "Support", role_en: "Support", grade: "3º Ano EM", icon: "🃏", quote: "A serviço da Rainha!" }
            ];
            
            fallbackMembers.forEach((member, index) => {
                const memberCard = document.createElement('div');
                memberCard.className = 'glass border border-[#D4AF37]/30 rounded-xl p-6 text-center card-modern cursor-pointer';
                memberCard.style.animationDelay = `${index * 0.1}s`;
                
                memberCard.innerHTML = `
                    <div class="text-5xl mb-4 animate-float">${member.icon}</div>
                    <h3 class="font-['Cinzel'] text-xl font-bold text-[#960018] mb-2">${member.name}</h3>
                    <p class="text-[#B8860B] font-semibold mb-1">${member.role}</p>
                    <p class="text-gray-600 text-sm mb-3">${member.grade}</p>
                    <p class="text-gray-700 text-sm italic">"${member.quote}"</p>
                `;
                
                memberCard.addEventListener('click', () => {
                    openTeamModal(member);
                });
                
                container.appendChild(memberCard);
            });
            
            initTeamModal();
        }
    }
}

// Team Modal
function initTeamModal() {
    const modal = document.getElementById('team-modal');
    const modalContent = document.getElementById('team-modal-content');
    const closeBtn = document.getElementById('close-team-modal');
    
    closeBtn.addEventListener('click', () => {
        modalContent.classList.remove('modal-enter');
        modalContent.classList.add('modal-exit');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBtn.click();
        }
    });
}

function openTeamModal(member) {
    const modal = document.getElementById('team-modal');
    const modalContent = document.getElementById('team-modal-content');
    
    document.getElementById('modal-member-icon').textContent = member.icon;
    document.getElementById('modal-member-name').textContent = member.name;
    document.getElementById('modal-member-role').textContent = member.role;
    document.getElementById('modal-member-grade').textContent = member.grade;
    document.getElementById('modal-member-quote').textContent = member.quote;
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modalContent.classList.add('modal-enter');
    modalContent.classList.remove('modal-exit');
}

// Lore Timeline
async function initLoreTimeline() {
    try {
        const response = await fetch('data/lore-story.json');
        if (!response.ok) throw new Error('Failed to load lore story');
        const data = await response.json();
        const container = document.getElementById('lore-timeline');
        
        if (!container) {
            console.error('Lore timeline container not found');
            return;
        }
        
        // Clear container first
        container.innerHTML = '';
        
        data.story.forEach((chapter, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item mb-8 animate-fade-in-up';
            timelineItem.style.animationDelay = `${index * 0.2}s`;
            
            timelineItem.innerHTML = `
                <div class="glass border border-[#DC143C]/30 rounded-xl p-6 ml-4 card-modern">
                    <div class="flex items-start justify-between mb-4">
                        <div>
                            <span class="text-[#B8860B] text-sm font-semibold">${chapter.chapter}</span>
                            <h3 class="font-['Cinzel'] text-xl font-bold text-[#960018] mt-1">${chapter.title}</h3>
                        </div>
                        <span class="text-3xl animate-float">${chapter.icon}</span>
                    </div>
                    <p class="text-gray-700 leading-relaxed">${chapter.description}</p>
                    <p class="text-gray-500 text-sm italic mt-2">${chapter.title_en}</p>
                </div>
            `;
            
            container.appendChild(timelineItem);
        });
        
        console.log('Lore timeline loaded successfully');
    } catch (error) {
        console.error('Error loading lore story:', error);
        // Fallback: Use embedded data
        const container = document.getElementById('lore-timeline');
        if (container) {
            container.innerHTML = '';
            const fallbackStory = [
                { id: 1, title: "O Coelho Branco & O Buraco do Coelho", title_en: "The White Rabbit & Down the Rabbit Hole", icon: "🐰", description: "Tudo começou quando Alice seguiu um coelho branco de colete até o buraco misterioso que a levou ao Wonderland.", description_en: "It all began when Alice followed a white rabbit in a waistcoat down the mysterious hole that led her to Wonderland.", chapter: "Capítulo 1" },
                { id: 2, title: "Os Enigmas da Lagarta", title_en: "The Caterpillar's Riddles", icon: "🐛", description: "No cogumelo mágico, a Lagarta desafiou Alice com enigmas filosóficos sobre identidade e transformação.", description_en: "On the magic mushroom, the Caterpillar challenged Alice with philosophical riddles about identity and transformation.", chapter: "Capítulo 2" },
                { id: 3, title: "A Orientação do Gato de Cheshire", title_en: "The Cheshire Cat's Guidance", icon: "😺", description: "O gato que aparece e desaparece ensinou Alice que no Wonderland, todos são loucos - inclusive ela.", description_en: "The cat that appears and disappears taught Alice that in Wonderland, everyone is mad - including her.", chapter: "Capítulo 3" },
                { id: 4, title: "O Caos do Chá do Chapeleiro Maluco", title_en: "The Mad Hatter's Tea Party Chaos", icon: "🎩", description: "Um chá interminável onde o tempo parou e a loucura reina suprema com o Chapeleiro e a Lebre de Março.", description_en: "An endless tea party where time stopped and madness reigns supreme with the Hatter and the March Hare.", chapter: "Capítulo 4" },
                { id: 5, title: "O Jogo de Croquet da Rainha & O Julgamento Absurdo", title_en: "The Queen's Croquet Game & The Absurd Courtroom Trial", icon: "👑", description: "A temível Rainha de Copas convida Alice para um jogo de croquet com flamingos e ouriços, culminando em um julgamento onde a sentença é sempre a mesma: 'OFF WITH THEIR HEADS!'", description_en: "The fearsome Queen of Hearts invites Alice to a croquet game with flamingos and hedgehogs, culminating in a trial where the sentence is always the same: 'OFF WITH THEIR HEADS!'", chapter: "Capítulo Final" }
            ];
            
            fallbackStory.forEach((chapter, index) => {
                const timelineItem = document.createElement('div');
                timelineItem.className = 'timeline-item mb-8 animate-fade-in-up';
                timelineItem.style.animationDelay = `${index * 0.2}s`;
                
                timelineItem.innerHTML = `
                    <div class="glass border border-[#DC143C]/30 rounded-xl p-6 ml-4 card-modern">
                        <div class="flex items-start justify-between mb-4">
                            <div>
                                <span class="text-[#B8860B] text-sm font-semibold">${chapter.chapter}</span>
                                <h3 class="font-['Cinzel'] text-xl font-bold text-[#960018] mt-1">${chapter.title}</h3>
                            </div>
                            <span class="text-3xl animate-float">${chapter.icon}</span>
                        </div>
                        <p class="text-gray-700 leading-relaxed">${chapter.description}</p>
                        <p class="text-gray-500 text-sm italic mt-2">${chapter.title_en}</p>
                    </div>
                `;
                
                container.appendChild(timelineItem);
            });
        }
    }
}

// Dashboard
async function initDashboard() {
    try {
        // Load tasks
        const tasksResponse = await fetch('data/tasks.json');
        if (!tasksResponse.ok) throw new Error('Failed to load tasks');
        const tasksData = await tasksResponse.json();
        
        // Load schedule
        const scheduleResponse = await fetch('data/schedule.json');
        if (!scheduleResponse.ok) throw new Error('Failed to load schedule');
        const scheduleData = await scheduleResponse.json();
        
        // Calculate stats
        const completedTasks = tasksData.tasks.filter(task => task.status === 'completed');
        const inProgressTasks = tasksData.tasks.filter(task => task.status === 'in_progress');
        const pendingTasks = tasksData.tasks.filter(task => task.status === 'pending');
        const totalScore = completedTasks.reduce((sum, task) => sum + task.points, 0);
        const maxScore = tasksData.tasks.reduce((sum, task) => sum + task.points, 0);
        const progressPercentage = Math.round((completedTasks.length / tasksData.tasks.length) * 100);
        
        // Update stats
        const totalScoreElement = document.getElementById('total-score');
        const completedTasksElement = document.getElementById('completed-tasks');
        const pendingTasksElement = document.getElementById('pending-tasks');
        const upcomingEventsElement = document.getElementById('upcoming-events');
        
        if (totalScoreElement) totalScoreElement.textContent = totalScore;
        if (completedTasksElement) completedTasksElement.textContent = completedTasks.length;
        if (pendingTasksElement) pendingTasksElement.textContent = pendingTasks.length + inProgressTasks.length;
        if (upcomingEventsElement) upcomingEventsElement.textContent = scheduleData.events.length;
        
        // Animate score
        animateScore(totalScore);
        
        // Update progress circle
        const progressCircle = document.getElementById('progress-circle');
        const progressPercentageElement = document.getElementById('progress-percentage');
        const overallProgressElement = document.getElementById('overall-progress');
        
        if (progressCircle) {
            const circleRadius = window.innerWidth <= 640 ? 40 : 50; // Responsive radius
            const circumference = 2 * Math.PI * circleRadius;
            const offset = circumference - (progressPercentage / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
            progressCircle.style.strokeDasharray = circumference;
        }
        
        if (progressPercentageElement) {
            progressPercentageElement.textContent = progressPercentage + '%';
        }
        
        // Update progress bar
        if (overallProgressElement) {
            overallProgressElement.style.width = progressPercentage + '%';
        }
        
        // Render tasks
        const tasksContainer = document.getElementById('tasks-list');
        if (tasksContainer) {
            tasksContainer.innerHTML = '';
            
            tasksData.tasks.forEach((task, index) => {
                const taskElement = document.createElement('div');
                taskElement.className = 'glass border border-[#DC143C]/20 rounded-lg p-4 flex items-center justify-between card-modern';
                
                const statusClass = `status-${task.status}`;
                const statusText = {
                    'completed': 'Concluído',
                    'in_progress': 'Em Andamento',
                    'pending': 'Pendente'
                }[task.status];
                
                taskElement.innerHTML = `
                    <div class="flex items-center space-x-4">
                        <div class="${statusClass} text-white text-xs font-semibold px-3 py-1 rounded-full">
                            ${statusText}
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-800">${task.name}</h4>
                            <p class="text-gray-600 text-sm">${task.description}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="text-[#960018] font-bold">+${task.points} pts</span>
                        <p class="text-gray-500 text-xs">${task.deadline}</p>
                    </div>
                `;
                
                tasksContainer.appendChild(taskElement);
            });
        }
        
        // Render schedule
        const scheduleContainer = document.getElementById('schedule-list');
        if (scheduleContainer) {
            scheduleContainer.innerHTML = '';
            
            scheduleData.events.forEach((event, index) => {
                const eventElement = document.createElement('div');
                eventElement.className = 'glass border border-[#D4AF37]/20 rounded-lg p-4 card-modern';
                
                const typeIcon = {
                    'ceremony': '🎭',
                    'presentation': '🎤',
                    'competition': '🏆',
                    'cultural': '🎨',
                    'sports': '⚽'
                }[event.type] || '📅';
                
                eventElement.innerHTML = `
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <span class="text-2xl animate-float">${typeIcon}</span>
                            <div>
                                <h4 class="font-semibold text-gray-800">${event.name}</h4>
                                <p class="text-gray-600 text-sm">${event.location}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-[#960018] font-semibold">${event.date}</p>
                            <p class="text-gray-600 text-sm">${event.time}</p>
                        </div>
                    </div>
                `;
                
                scheduleContainer.appendChild(eventElement);
            });
        }
        
        console.log('Dashboard loaded successfully');
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        // Fallback: Use embedded data
        const fallbackTasks = [
            { id: 1, name: "Construção do Mascote", name_en: "Mascot Construction", status: "completed", points: 150, deadline: "2026-01-15", description: "Construir o mascote da Rainha de Copas com todos os materiais especificados" },
            { id: 2, name: "Design da Camisa Oficial", name_en: "Official T-Shirt Design", status: "completed", points: 100, deadline: "2026-01-20", description: "Criar o design final da camisa oficial da equipe" },
            { id: 3, name: "Coreografia de Abertura", name_en: "Opening Choreography", status: "in_progress", points: 200, deadline: "2026-02-01", description: "Desenvolver e ensaiar a coreografia de apresentação da equipe" },
            { id: 4, name: "Grito de Guerra", name_en: "War Cry", status: "in_progress", points: 75, deadline: "2026-02-05", description: "Criar e praticar o grito de guerra da equipe" },
            { id: 5, name: "Decoração do Estande", name_en: "Stand Decoration", status: "pending", points: 125, deadline: "2026-02-10", description: "Planejar e executar a decoração do estande da equipe" },
            { id: 6, name: "Produção de Materiais", name_en: "Material Production", status: "pending", points: 100, deadline: "2026-02-15", description: "Produzir faixas, cartazes e materiais promocionais" },
            { id: 7, name: "Vídeo de Apresentação", name_en: "Presentation Video", status: "pending", points: 150, deadline: "2026-02-20", description: "Produzir vídeo de apresentação da equipe" },
            { id: 8, name: "Desafio de Conhecimentos", name_en: "Knowledge Challenge", status: "pending", points: 200, deadline: "2026-02-25", description: "Preparação para o desafio de conhecimentos gerais" }
        ];
        
        const fallbackSchedule = [
            { id: 1, name: "Abertura Oficial da Gincana", name_en: "Official Gincana Opening", date: "2026-02-01", time: "19:00", location: "Ginásio da Escola", type: "ceremony" },
            { id: 2, name: "Apresentação das Equipes", name_en: "Team Presentations", date: "2026-02-02", time: "14:00", location: "Palco Principal", type: "presentation" },
            { id: 3, name: "Desafio de Coreografias", name_en: "Choreography Challenge", date: "2026-02-05", time: "15:30", location: "Ginásio da Escola", type: "competition" },
            { id: 4, name: "Grito de Guerra", name_en: "War Cry Competition", date: "2026-02-08", time: "10:00", location: "Pátio da Escola", type: "competition" },
            { id: 5, name: "Desafio de Conhecimentos", name_en: "Knowledge Challenge", date: "2026-02-12", time: "13:00", location: "Auditório", type: "competition" },
            { id: 6, name: "Gincana Cultural", name_en: "Cultural Gincana", date: "2026-02-15", time: "09:00", location: "Campus da Escola", type: "cultural" },
            { id: 7, name: "Competição Esportiva", name_en: "Sports Competition", date: "2026-02-19", time: "08:00", location: "Campo de Esportes", type: "sports" },
            { id: 8, name: "Grande Final e Premiação", name_en: "Grand Finale and Awards", date: "2026-02-22", time: "18:00", location: "Ginásio da Escola", type: "ceremony" }
        ];
        
        const completedTasks = fallbackTasks.filter(task => task.status === 'completed');
        const inProgressTasks = fallbackTasks.filter(task => task.status === 'in_progress');
        const pendingTasks = fallbackTasks.filter(task => task.status === 'pending');
        const totalScore = completedTasks.reduce((sum, task) => sum + task.points, 0);
        const progressPercentage = Math.round((completedTasks.length / fallbackTasks.length) * 100);
        
        // Update stats
        const totalScoreElement = document.getElementById('total-score');
        const completedTasksElement = document.getElementById('completed-tasks');
        const pendingTasksElement = document.getElementById('pending-tasks');
        const upcomingEventsElement = document.getElementById('upcoming-events');
        
        if (totalScoreElement) totalScoreElement.textContent = totalScore;
        if (completedTasksElement) completedTasksElement.textContent = completedTasks.length;
        if (pendingTasksElement) pendingTasksElement.textContent = pendingTasks.length + inProgressTasks.length;
        if (upcomingEventsElement) upcomingEventsElement.textContent = fallbackSchedule.length;
        
        animateScore(totalScore);
        
        // Render tasks
        const tasksContainer = document.getElementById('tasks-list');
        if (tasksContainer) {
            tasksContainer.innerHTML = '';
            
            fallbackTasks.forEach((task, index) => {
                const taskElement = document.createElement('div');
                taskElement.className = 'glass border border-[#DC143C]/20 rounded-lg p-4 flex items-center justify-between card-modern';
                
                const statusClass = `status-${task.status}`;
                const statusText = {
                    'completed': 'Concluído',
                    'in_progress': 'Em Andamento',
                    'pending': 'Pendente'
                }[task.status];
                
                taskElement.innerHTML = `
                    <div class="flex items-center space-x-4">
                        <div class="${statusClass} text-white text-xs font-semibold px-3 py-1 rounded-full">
                            ${statusText}
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-800">${task.name}</h4>
                            <p class="text-gray-600 text-sm">${task.description}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="text-[#960018] font-bold">+${task.points} pts</span>
                        <p class="text-gray-500 text-xs">${task.deadline}</p>
                    </div>
                `;
                
                tasksContainer.appendChild(taskElement);
            });
        }
        
        // Render schedule
        const scheduleContainer = document.getElementById('schedule-list');
        if (scheduleContainer) {
            scheduleContainer.innerHTML = '';
            
            fallbackSchedule.forEach((event, index) => {
                const eventElement = document.createElement('div');
                eventElement.className = 'glass border border-[#D4AF37]/20 rounded-lg p-4 card-modern';
                
                const typeIcon = {
                    'ceremony': '🎭',
                    'presentation': '🎤',
                    'competition': '🏆',
                    'cultural': '🎨',
                    'sports': '⚽'
                }[event.type] || '📅';
                
                eventElement.innerHTML = `
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <span class="text-2xl animate-float">${typeIcon}</span>
                            <div>
                                <h4 class="font-semibold text-gray-800">${event.name}</h4>
                                <p class="text-gray-600 text-sm">${event.location}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-[#960018] font-semibold">${event.date}</p>
                            <p class="text-gray-600 text-sm">${event.time}</p>
                        </div>
                    </div>
                `;
                
                scheduleContainer.appendChild(eventElement);
            });
        }
    }
}

// Score Animation
function animateScore(targetScore) {
    const scoreElement = document.getElementById('score-counter');
    if (!scoreElement) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = targetScore / steps;
    let currentScore = 0;
    
    const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(timer);
        }
        scoreElement.textContent = Math.floor(currentScore);
    }, duration / steps);
}

// Easter Eggs
function initEasterEggs() {
    const cheshireCat = document.getElementById('cheshire-cat');
    const modal = document.getElementById('easter-egg-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.getElementById('close-modal');
    
    let clickCount = 0;
    
    cheshireCat.addEventListener('click', () => {
        clickCount++;
        
        if (clickCount >= 3) {
            // Show modal
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            modalContent.classList.add('modal-enter');
            modalContent.classList.remove('modal-exit');
            clickCount = 0;
        } else {
            // Change cat emoji
            const catEmojis = ['😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'];
            cheshireCat.querySelector('span').textContent = catEmojis[Math.floor(Math.random() * catEmojis.length)];
        }
    });
    
    closeModal.addEventListener('click', () => {
        modalContent.classList.remove('modal-enter');
        modalContent.classList.add('modal-exit');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal.click();
        }
    });
    
    // Keyboard shortcut for easter egg
    document.addEventListener('keydown', (e) => {
        if (e.key === 'q' && e.ctrlKey) {
            cheshireCat.click();
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('mobile-menu-enter');
        }
    });
    
    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                
                // Add staggered animation to children
                const children = entry.target.querySelectorAll('.card-modern, .timeline-item, .stat-card');
                children.forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                    child.classList.add('animate-fade-in-up');
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe individual cards
    document.querySelectorAll('.card-modern, .timeline-item, .stat-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });
}

// Parallax effect for floating cards
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.floating-card');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    cards.forEach((card, index) => {
        const speed = (index % 3 + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 20;
        const y = (mouseY - 0.5) * speed * 20;
        
        card.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Dynamic year in footer
document.addEventListener('DOMContentLoaded', () => {
    const year = new Date().getFullYear();
    const footerYear = document.querySelector('footer p:last-child');
    if (footerYear) {
        footerYear.textContent = `© ${year} Equipe Rainha de Copas. Todos os direitos reservados.`;
    }
});