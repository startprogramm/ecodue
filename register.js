import { signUp } from './auth.js';

const form = document.getElementById('register-form');
const msg = document.getElementById('register-msg');
const pwToggle = document.querySelector('.pw-toggle');
pwToggle.addEventListener('click', () => {
  const pw = document.getElementById('password');
  const icon = pwToggle.querySelector('i');
  if (pw.type === 'password') { pw.type = 'text'; icon.classList.remove('fa-eye'); icon.classList.add('fa-eye-slash'); }
  else { pw.type = 'password'; icon.classList.remove('fa-eye-slash'); icon.classList.add('fa-eye'); }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  msg.textContent = '';
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;

  if (!name || !email || !password) { msg.textContent = 'Please fill required fields.'; return; }
  if (password !== confirmPassword) { msg.textContent = 'Passwords do not match.'; return; }
  if (password.length < 6) { msg.textContent = 'Password must be at least 6 characters.'; return; }

  try {
    await signUp(email, password, name);
    msg.style.color = '#2a8f3a';
    msg.textContent = 'Registered successfully! Redirecting to login...';
    setTimeout(() => location.href = 'login.html', 1000);
  } catch (err) {
    msg.textContent = err.message || 'Registration failed.';
  }
});