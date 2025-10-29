import { getCurrentUser, getUserProfile } from './auth.js';
import { getCommentsByLessonId, addComment } from './comments.js';

const LESSON_ID = 'plastik-ifloslanish';

let currentUser = null;

async function initPage() {
  try {
    currentUser = await getCurrentUser();

    if (currentUser) {
      const profile = await getUserProfile(currentUser.id);

      document.getElementById('logged-out-view').style.display = 'none';
      document.getElementById('logged-in-view').style.display = 'block';

      if (profile) {
        document.getElementById('user-name').textContent = profile.full_name || currentUser.email;
      }

      document.getElementById('comment-form-container').style.display = 'block';
      document.getElementById('login-prompt').style.display = 'none';

      await loadComments();
    } else {
      document.getElementById('logged-out-view').style.display = 'block';
      document.getElementById('logged-in-view').style.display = 'none';
      document.getElementById('comment-form-container').style.display = 'none';
      document.getElementById('login-prompt').style.display = 'block';
    }
  } catch (err) {
    console.error('Failed to load page:', err);
  }
}

async function loadComments() {
  try {
    const comments = await getCommentsByLessonId(LESSON_ID);
    const commentsList = document.getElementById('comments-list');

    if (!comments || comments.length === 0) {
      commentsList.innerHTML = '<p style="padding: 1rem; color: #666;">No comments yet. Be the first to comment!</p>';
      return;
    }

    commentsList.innerHTML = comments.map(comment => {
      const authorName = comment.profiles?.full_name || 'Anonymous';
      const date = new Date(comment.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      return `
        <div style="padding: 1.5rem; border-bottom: 1px solid #eee;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <strong style="color: #2a8f3a;">${authorName}</strong>
            <span style="color: #999; font-size: 0.9rem;">${date}</span>
          </div>
          <p style="color: #333;">${escapeHtml(comment.content)}</p>
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error('Failed to load comments:', err);
    document.getElementById('comments-list').innerHTML = '<p style="padding: 1rem; color: #dc3545;">Failed to load comments.</p>';
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

const commentForm = document.getElementById('comment-form');
const commentMsg = document.getElementById('comment-msg');

if (commentForm) {
  commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    commentMsg.textContent = '';

    const content = document.getElementById('comment-content').value.trim();

    if (!content) {
      commentMsg.textContent = 'Please enter a comment.';
      return;
    }

    if (!currentUser) {
      commentMsg.textContent = 'Please log in to post comments.';
      return;
    }

    try {
      await addComment(LESSON_ID, currentUser.id, content);
      document.getElementById('comment-content').value = '';
      commentMsg.style.color = '#2a8f3a';
      commentMsg.textContent = 'Comment posted successfully!';
      await loadComments();
      setTimeout(() => {
        commentMsg.textContent = '';
      }, 3000);
    } catch (err) {
      commentMsg.textContent = err.message || 'Failed to post comment.';
    }
  });
}

initPage();
