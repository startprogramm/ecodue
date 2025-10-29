import { getCurrentUser, getUserProfile } from './auth.js';

async function updateAuthUI() {
  try {
    const user = await getCurrentUser();
    const authLink = document.getElementById('auth-link');

    if (user) {
      const profile = await getUserProfile(user.id);
      const userName = profile?.full_name || user.email.split('@')[0];

      authLink.innerHTML = `<a href="profile.html" class="nav-link">Hi, ${userName}</a>`;
    } else {
      authLink.innerHTML = `<a href="register.html" class="nav-link">SignUp</a>`;
    }
  } catch (err) {
    console.error('Failed to update auth UI:', err);
  }
}

updateAuthUI();
