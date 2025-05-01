// Mock user database
const users = [
    { email: 'test@mechanichub.com', password: 'pass123' }
];

// DOM Elements
const loginContainer = document.getElementById('loginContainer');
const emailForm = document.getElementById('emailForm');
const passwordForm = document.getElementById('passwordForm');
const dashboard = document.getElementById('dashboard');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailDisplay = document.getElementById('emailDisplay');
const proceedBtn = document.getElementById('proceedBtn');
const loginBtn = document.getElementById('loginBtn');
const backBtn = document.getElementById('backBtn');
const logoutBtn = document.getElementById('logoutBtn');
const welcomeMessage = document.getElementById('welcomeMessage');

// Event Listeners
proceedBtn.addEventListener('click', handleEmailSubmit);
loginBtn.addEventListener('click', handleLogin);
backBtn.addEventListener('click', showEmailForm);
logoutBtn.addEventListener('click', handleLogout);

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle email submission
function handleEmailSubmit() {
    const email = emailInput.value.trim();
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Check if email exists in database
    const user = users.find(u => u.email === email);
    if (!user) {
        alert('Email not found. Please try again.');
        return;
    }

    emailDisplay.textContent = email;
    showPasswordForm();
}

// Handle login
function handleLogin() {
    const email = emailDisplay.textContent;
    const password = passwordInput.value;

    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        alert('Invalid password. Please try again.');
        return;
    }

    // Successful login
    showDashboard(email);
}

// Show password form
function showPasswordForm() {
    emailForm.classList.add('hidden');
    passwordForm.classList.remove('hidden');
    passwordInput.focus();
}

// Show email form
function showEmailForm() {
    passwordForm.classList.add('hidden');
    emailForm.classList.remove('hidden');
    emailInput.focus();
}

// Show dashboard
function showDashboard(email) {
    loginContainer.classList.add('hidden');
    dashboard.classList.remove('hidden');
    welcomeMessage.textContent = `Welcome to Mechanic HUB, ${email}!`;
}

// Handle logout
function handleLogout() {
    dashboard.classList.add('hidden');
    loginContainer.classList.remove('hidden');
    showEmailForm();
    emailInput.value = '';
    passwordInput.value = '';
}

// Add enter key support
emailInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleEmailSubmit();
    }
});

passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleLogin();
    }
});
