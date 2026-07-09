import ThreadCard from './ThreadCard';

const ThreadList = ({ threads, filter }) => {
  const filteredThreads = threads?.filter((thread) => {
    if (filter.length <= 0) return true;
    return (thread.category ?? '').toLowerCase().includes(filter.toLowerCase());
  });
  return filteredThreads && filteredThreads.length > 0 ? (
    <div className="space-y-4">
      {filteredThreads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  ) : (
    <p className="text-neutral-400 text-center">Belum ada thread.</p>
  );
};

export default ThreadList;
