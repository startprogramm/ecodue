import { getCurrentUser, getUserProfile, updateUserProfile, signOut } from './auth.js';

const profileForm = document.getElementById('profile-form');
const profileMsg = document.getElementById('profile-msg');
const logoutBtn = document.getElementById('logout-btn');

async function loadProfile() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      window.location.href = 'login.html';
      return;
    }

    const profile = await getUserProfile(user.id);

    if (profile) {
      document.getElementById('fullName').value = profile.full_name || '';
      document.getElementById('bio').value = profile.bio || '';
    }

    document.getElementById('email').value = user.email;
  } catch (err) {
    profileMsg.textContent = 'Failed to load profile.';
    console.error(err);
  }
}

profileForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  profileMsg.textContent = '';

  const fullName = profileForm.fullName.value.trim();
  const bio = profileForm.bio.value.trim();

  if (!fullName) {
    profileMsg.textContent = 'Full name is required.';
    return;
  }

  try {
    const user = await getCurrentUser();

    await updateUserProfile(user.id, {
      full_name: fullName,
      bio: bio
    });

    profileMsg.style.color = '#2a8f3a';
    profileMsg.textContent = 'Profile updated successfully!';
  } catch (err) {
    profileMsg.textContent = err.message || 'Failed to update profile.';
  }
});

logoutBtn.addEventListener('click', async () => {
  try {
    await signOut();
    window.location.href = 'index.html';
  } catch (err) {
    profileMsg.textContent = 'Failed to log out.';
  }
});

loadProfile();
