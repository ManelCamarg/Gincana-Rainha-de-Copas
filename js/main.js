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
        const data = await response.json();
        const container = document.getElementById('mascot-cards');
        
        data.materials.forEach((material, index) => {
            const card = document.createElement('div');
            card.className = 'card-flip-container glass border border-[#DC143C]/30 rounded-xl p-6 cursor-pointer h-48 card-modern';
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
    } catch (error) {
        console.error('Error loading mascot materials:', error);
    }
}

// Team Members
async function initTeamMembers() {
    try {
        const response = await fetch('data/team-members.json');
        const data = await response.json();
        const container = document.getElementById('team-members');
        
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
    } catch (error) {
        console.error('Error loading team members:', error);
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
        const data = await response.json();
        const container = document.getElementById('lore-timeline');
        
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
    } catch (error) {
        console.error('Error loading lore story:', error);
    }
}

// Dashboard
async function initDashboard() {
    try {
        // Load tasks
        const tasksResponse = await fetch('data/tasks.json');
        const tasksData = await tasksResponse.json();
        
        // Load schedule
        const scheduleResponse = await fetch('data/schedule.json');
        const scheduleData = await scheduleResponse.json();
        
        // Calculate stats
        const completedTasks = tasksData.tasks.filter(task => task.status === 'completed');
        const inProgressTasks = tasksData.tasks.filter(task => task.status === 'in_progress');
        const pendingTasks = tasksData.tasks.filter(task => task.status === 'pending');
        const totalScore = completedTasks.reduce((sum, task) => sum + task.points, 0);
        const maxScore = tasksData.tasks.reduce((sum, task) => sum + task.points, 0);
        const progressPercentage = Math.round((completedTasks.length / tasksData.tasks.length) * 100);
        
        // Update stats
        document.getElementById('total-score').textContent = totalScore;
        document.getElementById('completed-tasks').textContent = completedTasks.length;
        document.getElementById('pending-tasks').textContent = pendingTasks.length + inProgressTasks.length;
        document.getElementById('upcoming-events').textContent = scheduleData.events.length;
        
        // Animate score
        animateScore(totalScore);
        
        // Update progress circle
        const progressCircle = document.getElementById('progress-circle');
        const circleRadius = window.innerWidth <= 640 ? 40 : 50; // Responsive radius
        const circumference = 2 * Math.PI * circleRadius;
        const offset = circumference - (progressPercentage / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
        progressCircle.style.strokeDasharray = circumference;
        
        document.getElementById('progress-percentage').textContent = progressPercentage + '%';
        
        // Update progress bar
        document.getElementById('overall-progress').style.width = progressPercentage + '%';
        
        // Render tasks
        const tasksContainer = document.getElementById('tasks-list');
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
        
        // Render schedule
        const scheduleContainer = document.getElementById('schedule-list');
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
        
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

// Score Animation
function animateScore(targetScore) {
    const scoreElement = document.getElementById('score-counter');
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