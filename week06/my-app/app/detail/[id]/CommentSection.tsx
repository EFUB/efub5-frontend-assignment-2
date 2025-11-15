'use client';

import { useState } from 'react';
import type { Comment } from '@/models/post';

interface CommentSectionProps {
  postId: string;
  initialComments: Comment[];
  isLoggedIn: boolean;
  userEmail?: string | null;
}

export default function CommentSection({ postId, initialComments, isLoggedIn, userEmail }: CommentSectionProps) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (!newComment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/post/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          postId, 
          content: newComment.trim() 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setComments(prev => [...prev, data.comment]);
        setNewComment('');
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.error('댓글 작성 에러:', error);
      alert('오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('댓글을 삭제하시겠습니까?')) return;

    try {
      const response = await fetch('/api/post/comment', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, commentId }),
      });

      if (response.ok) {
        setComments(prev => prev.filter(comment => comment._id !== commentId));
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.error('댓글 삭제 에러:', error);
      alert('오류가 발생했습니다.');
    }
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <h3>댓글 ({comments.length})</h3>
      
      {isLoggedIn && (
        <form onSubmit={handleSubmitComment} style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요..."
              rows={3}
              style={{
                flex: 1,
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                resize: 'vertical'
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                background: '#007bff',
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                height: 'fit-content'
              }}
            >
              {loading ? '등록중...' : '댓글 등록'}
            </button>
          </div>
        </form>
      )}

      <div>
        {comments.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>아직 댓글이 없습니다.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} style={{ 
              padding: '15px', 
              border: '1px solid #eee', 
              borderRadius: '5px', 
              marginBottom: '10px',
              background: '#f9f9f9'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                    {comment.author} • {new Date(comment.createdAt).toLocaleDateString('ko-KR')}
                  </div>
                  <div>{comment.content}</div>
                </div>
                {comment.author === userEmail && (
                  <button
                    onClick={() => handleDeleteComment(comment._id!)}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: '#dc3545',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    삭제
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}