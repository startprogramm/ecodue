import { supabase } from './supabase-client.js';

export async function getQuizByLessonId(lessonId) {
  const { data, error } = await supabase
    .from('quizzes')
    .select('*')
    .eq('lesson_id', lessonId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getQuizQuestions(quizId) {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('quiz_id', quizId)
    .order('order_index', { ascending: true });

  if (error) throw error;
  return data;
}

export async function submitQuizAttempt(quizId, userId, answers, score, totalPoints) {
  const { data, error } = await supabase
    .from('quiz_attempts')
    .insert([
      {
        user_id: userId,
        quiz_id: quizId,
        answers: answers,
        score: score,
        total_points: totalPoints
      }
    ])
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getUserQuizAttempts(userId, quizId = null) {
  let query = supabase
    .from('quiz_attempts')
    .select('*')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false });

  if (quizId) {
    query = query.eq('quiz_id', quizId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}
