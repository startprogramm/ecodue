import { getCurrentUser, getUserProfile } from './auth.js';
import { getUserQuizAttempts } from './quiz.js';
import { supabase } from './supabase-client.js';

async function loadDashboard() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      window.location.href = 'login.html';
      return;
    }

    const profile = await getUserProfile(user.id);

    if (profile) {
      document.getElementById('user-greeting').textContent = `Welcome back, ${profile.full_name}!`;

      const memberDate = new Date(profile.created_at).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      });
      document.getElementById('member-since').textContent = memberDate;
    }

    const quizAttempts = await getUserQuizAttempts(user.id);
    document.getElementById('quiz-count').textContent = quizAttempts.length;

    if (quizAttempts.length > 0) {
      const avgScore = quizAttempts.reduce((sum, attempt) => {
        return sum + (attempt.score / attempt.total_points) * 100;
      }, 0) / quizAttempts.length;

      document.getElementById('avg-score').textContent = `${Math.round(avgScore)}%`;

      const recentQuizzesHtml = quizAttempts.slice(0, 5).map(attempt => {
        const date = new Date(attempt.completed_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
        const percentage = Math.round((attempt.score / attempt.total_points) * 100);

        return `
          <div class="activity-item">
            <div style="display: flex; justify-content: space-between;">
              <div>
                <strong>Quiz Attempt</strong>
                <p style="color: #666; font-size: 0.9rem;">${date}</p>
              </div>
              <div style="text-align: right;">
                <strong style="color: ${percentage >= 70 ? '#2a8f3a' : '#dc3545'};">${percentage}%</strong>
                <p style="color: #666; font-size: 0.9rem;">${attempt.score}/${attempt.total_points} points</p>
              </div>
            </div>
          </div>
        `;
      }).join('');

      document.getElementById('recent-quizzes').innerHTML = recentQuizzesHtml;
    }

    const { count: commentCount } = await supabase
      .from('comments')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    document.getElementById('comment-count').textContent = commentCount || 0;

  } catch (err) {
    console.error('Failed to load dashboard:', err);
  }
}

loadDashboard();
