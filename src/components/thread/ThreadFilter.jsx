import { Search } from 'lucide-react';

const ThreadFilter = ({ setFilter }) => {
  return (
    <div className="relative w-full my-7">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
      <input
        type="text"
        placeholder="Filter berdasarkan kategori..."
        className="w-full border border-neutral-700 bg-neutral-800 rounded-xl p-2 pl-10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};

export default ThreadFilter;
