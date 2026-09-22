// Admin Panel JavaScript - Cloudflare Worker Version
class AdminPanel {
    constructor() {
        this.currentUser = null;
        this.currentTab = 'tasks';
        this.editingItem = null;
        this.editingType = null;
        // TODO: Update this with your deployed Cloudflare Worker URL
        // Example: 'https://rainha-de-copas-admin.YOUR_SUBDOMAIN.workers.dev/api'
        this.apiBaseUrl = '/api'; // Change to your Worker URL + '/api'
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkAuth();
    }

    bindEvents() {
        // Login button
        document.getElementById('login-btn').addEventListener('click', () => this.handleLogin());
        
        // Logout button
        document.getElementById('logout-btn').addEventListener('click', () => this.handleLogout());
        
        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });
        
        // Add buttons
        document.getElementById('add-task-btn').addEventListener('click', () => this.openEditModal('task'));
        document.getElementById('add-event-btn').addEventListener('click', () => this.openEditModal('event'));
        document.getElementById('add-member-btn').addEventListener('click', () => this.openEditModal('member'));
        document.getElementById('add-chapter-btn').addEventListener('click', () => this.openEditModal('chapter'));
        document.getElementById('add-announcement-btn').addEventListener('click', () => this.openEditModal('announcement'));
        
        // Modal controls
        document.getElementById('close-modal').addEventListener('click', () => this.closeModal());
        document.getElementById('cancel-btn').addEventListener('click', () => this.closeModal());
        document.getElementById('save-btn').addEventListener('click', () => this.saveChanges());
        document.getElementById('edit-modal').addEventListener('click', (e) => {
            if (e.target.id === 'edit-modal') this.closeModal();
        });
    }

    checkAuth() {
        const session = localStorage.getItem('admin_session');
        if (session) {
            this.currentUser = JSON.parse(session);
            this.showDashboard();
        } else {
            this.showLogin();
        }
    }

    showLogin() {
        document.getElementById('login-section').classList.remove('hidden');
        document.getElementById('admin-dashboard').classList.add('hidden');
        
        // Load saved email
        const savedEmail = localStorage.getItem('admin_email');
        if (savedEmail) document.getElementById('email').value = savedEmail;
    }

    showDashboard() {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('admin-dashboard').classList.remove('hidden');
        
        // Show user info
        document.getElementById('user-info').textContent = this.currentUser?.email || 'Admin';
        
        // Load initial data
        this.loadTasks();
    }

    async handleLogin() {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        if (!email || !password) {
            this.showToast('error', 'Erro', 'Por favor, preencha todos os campos');
            return;
        }
        
        try {
            const response = await fetch(`${this.apiBaseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                this.currentUser = data.user;
                localStorage.setItem('admin_session', JSON.stringify(this.currentUser));
                localStorage.setItem('admin_email', email);
                this.showDashboard();
                this.showToast('success', 'Sucesso', 'Login realizado com sucesso!');
            } else {
                this.showToast('error', 'Erro', data.error || 'Falha no login');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showToast('error', 'Erro', 'Falha ao conectar com o servidor. Certifique-se de que o Cloudflare Worker está rodando.');
        }
    }

    async handleLogout() {
        try {
            await fetch(`${this.apiBaseUrl}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
        } catch (error) {
            console.error('Logout error:', error);
        }
        
        localStorage.removeItem('admin_session');
        this.currentUser = null;
        this.showLogin();
        this.showToast('success', 'Logout', 'Desconectado com sucesso');
    }

    switchTab(tab) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tab) {
                btn.classList.add('active');
            }
        });
        
        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });
        document.getElementById(`${tab}-tab`).classList.remove('hidden');
        
        this.currentTab = tab;
        
        // Load data for the tab
        switch(tab) {
            case 'tasks':
                this.loadTasks();
                break;
            case 'schedule':
                this.loadSchedule();
                break;
            case 'team':
                this.loadTeam();
                break;
            case 'lore':
                this.loadLore();
                break;
            case 'announcements':
                this.loadAnnouncements();
                break;
        }
    }

    async loadTasks() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/tasks`, {
                credentials: 'include'
            });
            
            if (response.ok) {
                const data = await response.json();
                this.renderTasks(data);
            } else {
                this.showToast('error', 'Erro', 'Falha ao carregar tarefas');
            }
        } catch (error) {
            console.error('Error loading tasks:', error);
            this.showToast('error', 'Erro', 'Falha ao conectar com o servidor');
        }
    }

    renderTasks(tasks) {
        const container = document.getElementById('tasks-list');
        container.innerHTML = '';
        
        if (!tasks || tasks.length === 0) {
            container.innerHTML = '<p class="text-gray-400 text-center py-8">Nenhuma tarefa encontrada</p>';
            return;
        }
        
        tasks.forEach(task => {
            const card = document.createElement('div');
            card.className = 'card animate-slide-in';
            card.innerHTML = `
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <div class="flex items-center space-x-3 mb-2">
                            <span class="status-${task.status} text-white text-xs font-semibold px-3 py-1 rounded-full">
                                ${task.status === 'completed' ? 'Concluído' : task.status === 'in_progress' ? 'Em Andamento' : 'Pendente'}
                            </span>
                            <h4 class="font-semibold text-gray-800">${task.name}</h4>
                        </div>
                        <p class="text-gray-600 text-sm">${task.description}</p>
                        <div class="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>+${task.points} pts</span>
                            <span>•</span>
                            <span>${task.deadline}</span>
                        </div>
                    </div>
                    <div class="flex space-x-2 ml-4">
                        <button class="edit-btn px-3 py-1 bg-[#DC143C] hover:bg-[#8B0000] text-white rounded text-sm" data-id="${task.id}">Editar</button>
                        <button class="delete-btn px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm" data-id="${task.id}">Excluir</button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
        
        container.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => this.openEditModal('task', parseInt(btn.dataset.id)));
        });
        container.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => this.deleteItem('task', parseInt(btn.dataset.id)));
        });
    }

    async loadSchedule() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/schedule`, {
                credentials: 'include'
            });
            
            if (response.ok) {
                const data = await response.json();
                this.renderSchedule(data);
            } else {
                this.showToast('error', 'Erro', 'Falha ao carregar cronograma');
            }
        } catch (error) {
            console.error('Error loading schedule:', error);
            this.showToast('error', 'Erro', 'Falha ao conectar com o servidor');
        }
    }

    renderSchedule(events) {
        const container = document.getElementById('schedule-list');
        container.innerHTML = '';
        
        if (!events || events.length === 0) {
            container.innerHTML = '<p class="text-gray-400 text-center py-8">Nenhum evento encontrado</p>';
            return;
        }
        
        events.forEach(event => {
            const card = document.createElement('div');
            card.className = 'card animate-slide-in';
            const typeIcon = {
                'ceremony': '🎭',
                'presentation': '🎤',
                'competition': '🏆',
                'cultural': '🎨',
                'sports': '⚽'
            }[event.type] || '📅';
            
            card.innerHTML = `
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <span class="text-2xl">${typeIcon}</span>
                        <div>
                            <h4 class="font-semibold text-gray-800">${event.name}</h4>
                            <p class="text-gray-600 text-sm">${event.location}</p>
                        </div>
                    </div>
                    <div class="text-right ml-4">
                        <p class="text-[#960018] font-semibold">${event.date}</p>
                        <p class="text-gray-600 text-sm">${event.time}</p>
                    </div>
                    <div class="flex space-x-2 ml-4">
                        <button class="edit-btn px-3 py-1 bg-[#DC143C] hover:bg-[#8B0000] text-white rounded text-sm" data-id="${event.id}">Editar</button>
                        <button class="delete-btn px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm" data-id="${event.id}">Excluir</button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
        
        container.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => this.openEditModal('event', parseInt(btn.dataset.id)));
        });
        container.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => this.deleteItem('event', parseInt(btn.dataset.id)));
        });
    }

    async loadTeam() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/team`, {
                credentials: 'include'
            });
            
            if (response.ok) {
                const data = await response.json();
                this.renderTeam(data);
            } else {
                this.showToast('error', 'Erro', 'Falha ao carregar equipe');
            }
        } catch (error) {
            console.error('Error loading team:', error);
            this.showToast('error', 'Erro', 'Falha ao conectar com o servidor');
        }
    }

    renderTeam(members) {
        const container = document.getElementById('team-list');
        container.innerHTML = '';
        
        if (!members || members.length === 0) {
            container.innerHTML = '<p class="text-gray-400 text-center py-8 col-span-4">Nenhum membro encontrado</p>';
            return;
        }
        
        members.forEach(member => {
            const card = document.createElement('div');
            card.className = 'card animate-slide-in text-center';
            card.innerHTML = `
                <div class="text-5xl mb-3">${member.icon}</div>
                <h4 class="font-semibold text-gray-800">${member.name}</h4>
                <p class="text-[#B8860B] font-medium text-sm">${member.role}</p>
                <p class="text-gray-600 text-sm mb-3">${member.grade}</p>
                <div class="flex justify-center space-x-2">
                    <button class="edit-btn px-3 py-1 bg-[#DC143C] hover:bg-[#8B0000] text-white rounded text-sm" data-id="${member.id}">Editar</button>
                    <button class="delete-btn px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm" data-id="${member.id}">Excluir</button>
                </div>
            `;
            container.appendChild(card);
        });
        
        container.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => this.openEditModal('member', parseInt(btn.dataset.id)));
        });
        container.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => this.deleteItem('member', parseInt(btn.dataset.id)));
        });
    }

    async loadLore() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/lore`, {
                credentials: 'include'
            });
            
            if (response.ok) {
                const data = await response.json();
                this.renderLore(data);
            } else {
                this.showToast('error', 'Erro', 'Falha ao carregar história');
            }
        } catch (error) {
            console.error('Error loading lore:', error);
            this.showToast('error', 'Erro', 'Falha ao conectar com o servidor');
        }
    }

    renderLore(story) {
        const container = document.getElementById('lore-list');
        container.innerHTML = '';
        
        if (!story || story.length === 0) {
            container.innerHTML = '<p class="text-gray-400 text-center py-8">Nenhum capítulo encontrado</p>';
            return;
        }
        
        story.forEach(chapter => {
            const card = document.createElement('div');
            card.className = 'card animate-slide-in';
            card.innerHTML = `
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <span class="text-[#B8860B] text-sm font-semibold">${chapter.chapter}</span>
                        <h4 class="font-semibold text-gray-800 mt-1">${chapter.title}</h4>
                        <p class="text-gray-600 text-sm mt-2">${chapter.description}</p>
                    </div>
                    <span class="text-3xl ml-4">${chapter.icon}</span>
                    <div class="flex space-x-2 ml-4">
                        <button class="edit-btn px-3 py-1 bg-[#DC143C] hover:bg-[#8B0000] text-white rounded text-sm" data-id="${chapter.id}">Editar</button>
                        <button class="delete-btn px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm" data-id="${chapter.id}">Excluir</button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
        
        container.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => this.openEditModal('chapter', parseInt(btn.dataset.id)));
        });
        container.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => this.deleteItem('chapter', parseInt(btn.dataset.id)));
        });
    }

    async loadAnnouncements() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/announcements`, {
                credentials: 'include'
            });
            
            if (response.ok) {
                const data = await response.json();
                this.renderAnnouncements(data);
            } else {
                this.showToast('error', 'Erro', 'Falha ao carregar anúncios');
            }
        } catch (error) {
            console.error('Error loading announcements:', error);
            this.showToast('error', 'Erro', 'Falha ao conectar com o servidor');
        }
    }

    renderAnnouncements(announcements) {
        const container = document.getElementById('announcements-list');
        container.innerHTML = '';
        
        if (!announcements || announcements.length === 0) {
            container.innerHTML = '<p class="text-gray-400 text-center py-8">Nenhum anúncio encontrado</p>';
            return;
        }
        
        announcements.forEach(announcement => {
            const card = document.createElement('div');
            card.className = 'card animate-slide-in';
            card.innerHTML = `
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <h4 class="font-semibold text-gray-800">${announcement.title}</h4>
                        <p class="text-gray-600 text-sm mt-2">${announcement.content}</p>
                        <div class="flex items-center space-x-2 mt-3">
                            <span class="px-2 py-1 rounded-full text-xs ${announcement.is_active ? 'bg-green-500' : 'bg-gray-500'} text-white">
                                ${announcement.is_active ? 'Ativo' : 'Inativo'}
                            </span>
                        </div>
                    </div>
                    <div class="flex space-x-2 ml-4">
                        <button class="edit-btn px-3 py-1 bg-[#DC143C] hover:bg-[#8B0000] text-white rounded text-sm" data-id="${announcement.id}">Editar</button>
                        <button class="delete-btn px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm" data-id="${announcement.id}">Excluir</button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
        
        container.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => this.openEditModal('announcement', parseInt(btn.dataset.id)));
        });
        container.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => this.deleteItem('announcement', parseInt(btn.dataset.id)));
        });
    }

    async openEditModal(type, id = null) {
        this.editingType = type;
        this.editingItem = id;
        
        const modal = document.getElementById('edit-modal');
        const form = document.getElementById('edit-form');
        const title = document.getElementById('modal-title');
        
        let data = null;
        if (id) {
            // Load existing data from API
            try {
                const response = await fetch(`${this.apiBaseUrl}/${type}/${id}`, {
                    credentials: 'include'
                });
                
                if (response.ok) {
                    data = await response.json();
                }
            } catch (error) {
                console.error('Error loading item:', error);
            }
        }
        
        // Generate form fields
        form.innerHTML = this.generateFormFields(type, data);
        title.textContent = id ? `Editar ${type}` : `Nova ${type}`;
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }

    generateFormFields(type, data = null) {
        const fields = {
            task: [
                { name: 'name', label: 'Nome', type: 'text', required: true },
                { name: 'name_en', label: 'Nome (Inglês)', type: 'text' },
                { name: 'description', label: 'Descrição', type: 'textarea', required: true },
                { name: 'description_en', label: 'Descrição (Inglês)', type: 'textarea' },
                { name: 'status', label: 'Status', type: 'select', options: ['pending', 'in_progress', 'completed'], required: true },
                { name: 'points', label: 'Pontos', type: 'number', required: true },
                { name: 'deadline', label: 'Deadline', type: 'date', required: true }
            ],
            event: [
                { name: 'name', label: 'Nome', type: 'text', required: true },
                { name: 'name_en', label: 'Nome (Inglês)', type: 'text' },
                { name: 'date', label: 'Data', type: 'date', required: true },
                { name: 'time', label: 'Horário', type: 'time', required: true },
                { name: 'location', label: 'Local', type: 'text', required: true },
                { name: 'type', label: 'Tipo', type: 'select', options: ['ceremony', 'presentation', 'competition', 'cultural', 'sports'], required: true }
            ],
            member: [
                { name: 'name', label: 'Nome', type: 'text', required: true },
                { name: 'role', label: 'Cargo', type: 'text', required: true },
                { name: 'role_en', label: 'Cargo (Inglês)', type: 'text' },
                { name: 'grade', label: 'Série', type: 'text', required: true },
                { name: 'icon', label: 'Ícone (Emoji)', type: 'text', required: true },
                { name: 'quote', label: 'Citação', type: 'text', required: true }
            ],
            chapter: [
                { name: 'chapter', label: 'Capítulo', type: 'text', required: true },
                { name: 'title', label: 'Título', type: 'text', required: true },
                { name: 'title_en', label: 'Título (Inglês)', type: 'text' },
                { name: 'description', label: 'Descrição', type: 'textarea', required: true },
                { name: 'description_en', label: 'Descrição (Inglês)', type: 'textarea' },
                { name: 'icon', label: 'Ícone (Emoji)', type: 'text', required: true }
            ],
            announcement: [
                { name: 'title', label: 'Título', type: 'text', required: true },
                { name: 'content', label: 'Conteúdo', type: 'textarea', required: true },
                { name: 'is_active', label: 'Status', type: 'checkbox', required: false }
            ]
        };
        
        const typeFields = fields[type] || [];
        let html = '';
        
        typeFields.forEach(field => {
            html += `<div class="mb-4">`;
            html += `<label class="block text-sm font-medium text-gray-300 mb-2">${field.label}${field.required ? ' *' : ''}</label>`;
            
            if (field.type === 'select') {
                html += `<select name="${field.name}" class="w-full px-4 py-3 rounded-lg" ${field.required ? 'required' : ''}>`;
                field.options.forEach(option => {
                    const selected = data && data[field.name] === option ? 'selected' : '';
                    html += `<option value="${option}" ${selected}>${option}</option>`;
                });
                html += `</select>`;
            } else if (field.type === 'textarea') {
                html += `<textarea name="${field.name}" rows="3" class="w-full px-4 py-3 rounded-lg" ${field.required ? 'required' : ''}>${data ? data[field.name] : ''}</textarea>`;
            } else if (field.type === 'checkbox') {
                const checked = data && data[field.name] ? 'checked' : '';
                html += `<input type="checkbox" name="${field.name}" ${checked} class="w-5 h-5">`;
            } else {
                html += `<input type="${field.type}" name="${field.name}" value="${data ? data[field.name] : ''}" class="w-full px-4 py-3 rounded-lg" ${field.required ? 'required' : ''}>`;
            }
            
            html += `</div>`;
        });
        
        return html;
    }

    closeModal() {
        const modal = document.getElementById('edit-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        this.editingItem = null;
        this.editingType = null;
    }

    async saveChanges() {
        const form = document.getElementById('edit-form');
        const formData = new FormData(form);
        const data = {};
        
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Handle checkbox
        if (data.is_active === 'on') {
            data.is_active = true;
        } else if (data.is_active === undefined) {
            data.is_active = false;
        }
        
        try {
            const method = this.editingItem ? 'PUT' : 'POST';
            const url = this.editingItem 
                ? `${this.apiBaseUrl}/${this.editingType}/${this.editingItem}`
                : `${this.apiBaseUrl}/${this.editingType}`;
            
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                this.closeModal();
                this.showToast('success', 'Sucesso', 'Alterações salvas no Cloudflare D1!');
                this.switchTab(this.currentTab);
            } else {
                const errorData = await response.json();
                this.showToast('error', 'Erro', errorData.error || 'Falha ao salvar');
            }
        } catch (error) {
            console.error('Error saving changes:', error);
            this.showToast('error', 'Erro', 'Falha ao conectar com o servidor');
        }
    }

    async deleteItem(type, id) {
        if (!confirm('Tem certeza que deseja excluir este item?')) return;
        
        try {
            const response = await fetch(`${this.apiBaseUrl}/${type}/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            
            if (response.ok) {
                this.showToast('success', 'Sucesso', 'Item excluído do Cloudflare D1!');
                this.switchTab(this.currentTab);
            } else {
                const errorData = await response.json();
                this.showToast('error', 'Erro', errorData.error || 'Falha ao excluir');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            this.showToast('error', 'Erro', 'Falha ao conectar com o servidor');
        }
    }

    showToast(type, title, message) {
        const toast = document.getElementById('toast');
        const icon = document.getElementById('toast-icon');
        const titleEl = document.getElementById('toast-title');
        const messageEl = document.getElementById('toast-message');
        
        icon.textContent = type === 'success' ? '✅' : '❌';
        titleEl.textContent = title;
        messageEl.textContent = message;
        
        toast.classList.remove('hidden');
        toast.classList.add('flex', 'toast-enter');
        
        setTimeout(() => {
            toast.classList.add('hidden');
            toast.classList.remove('flex', 'toast-enter');
        }, 3000);
    }
}

// Initialize admin panel
document.addEventListener('DOMContentLoaded', () => {
    window.adminPanel = new AdminPanel();
});