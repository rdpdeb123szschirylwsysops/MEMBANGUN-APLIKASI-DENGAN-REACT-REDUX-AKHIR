import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../features/threadDetail/threadDetailSlice';

const CommentForm = ({ threadId }) => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      dispatch(addComment({ threadId, content }));
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tulis komentar..."
          rows="3"
          className="w-full border border-neutral-700/60 bg-neutral-800/50 rounded-xl p-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 resize-none"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer"
      >
        Kirim Komentar
      </button>
    </form>
  );
};

export default CommentForm;
