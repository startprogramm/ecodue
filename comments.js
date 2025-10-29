import { supabase } from './supabase-client.js';

export async function getCommentsByLessonId(lessonId) {
  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      profiles:user_id (
        full_name,
        avatar_url
      )
    `)
    .eq('lesson_id', lessonId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function addComment(lessonId, userId, content) {
  const { data, error } = await supabase
    .from('comments')
    .insert([
      {
        lesson_id: lessonId,
        user_id: userId,
        content: content
      }
    ])
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function updateComment(commentId, content) {
  const { data, error } = await supabase
    .from('comments')
    .update({ content: content })
    .eq('id', commentId)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function deleteComment(commentId) {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId);

  if (error) throw error;
}
