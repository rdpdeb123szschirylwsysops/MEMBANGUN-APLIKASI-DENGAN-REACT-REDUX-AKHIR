import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { showThreads } from '../features/threads/threadsSlice';
import ThreadList from '../components/thread/ThreadList';
import ThreadFilter from '../components/thread/ThreadFilter';
import { Plus } from 'lucide-react';

const ThreadPageList = () => {
  const dispatch = useDispatch();
  const { threadList } = useSelector((state) => state.thread);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch(showThreads());
  }, [dispatch]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-neutral-800/80 backdrop-blur-sm rounded-2xl p-6 border border-neutral-700/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-white">Daftar Thread</h1>
          <Link
            to="/create-thread"
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
          >
            <Plus size={18} />
            Buat Thread
          </Link>
        </div>
        <ThreadFilter setFilter={setFilter} />
        <ThreadList threads={threadList} filter={filter} />
      </div>
    </div>
  );
};

export default ThreadPageList;
