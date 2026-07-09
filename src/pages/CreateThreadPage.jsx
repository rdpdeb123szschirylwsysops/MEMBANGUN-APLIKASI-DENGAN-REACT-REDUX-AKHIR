import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addThread } from '../features/threads/threadsSlice';

const CreateThreadPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addThread({ title, body, category }))
      .unwrap()
      .then(() => navigate('/thread'));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-white mb-6">Buat Thread Baru</h1>
      <form onSubmit={handleSubmit} className="bg-neutral-800/60 rounded-xl p-6 border border-neutral-700/50 space-y-5">
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1.5">Judul</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-neutral-700/60 bg-neutral-900/50 rounded-lg p-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
            placeholder="Masukkan judul thread"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1.5">Konten</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows="6"
            className="w-full border border-neutral-700/60 bg-neutral-900/50 rounded-lg p-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 resize-none"
            placeholder="Tulis isi thread..."
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1.5">Kategori (opsional)</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-neutral-700/60 bg-neutral-900/50 rounded-lg p-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
            placeholder="Contoh: Programming, Food, dll."
          />
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer"
          >
            Kirim
          </button>
          <button
            type="button"
            onClick={() => navigate('/thread')}
            className="bg-neutral-700 hover:bg-neutral-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateThreadPage;
