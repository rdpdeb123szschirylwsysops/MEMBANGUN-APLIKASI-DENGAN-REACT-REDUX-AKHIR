import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { formatDateShort } from '../../utils/formatDate';

const ThreadCard = ({ thread }) => {
  const { owner } = thread;

  return (
    <div className="bg-neutral-800/60 rounded-xl p-4 border border-neutral-700/50 hover:border-neutral-500 transition-all duration-200">
      <Link to={`/thread/${thread.id}`} className="block">
        <div className="flex items-start gap-3">
          <img
            src={owner?.avatar}
            alt={owner?.name}
            className="w-10 h-10 rounded-full ring-2 ring-neutral-700 flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              <span className="font-semibold text-white">{owner?.name}</span>
              <span className="text-neutral-400 text-xs">{formatDateShort(thread.createdAt)}</span>
              {thread.category && (
                <>
                  <span className="bg-neutral-700/50 text-neutral-300 px-2 py-0.5 rounded-full text-xs font-medium">
                    {thread.category}
                  </span>
                </>
              )}
            </div>
            <h2 className="text-lg font-semibold text-white mt-1 hover:text-blue-400 transition-colors line-clamp-1">
              {thread.title}
            </h2>
            <p
              className="text-sm text-neutral-400 mt-1 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: thread.body }}
            />
            <div className="flex items-center gap-4 mt-2 text-xs text-neutral-500">
              <span className="flex items-center gap-1">
                <MessageCircle size={14} />
                {thread.totalComments} komentar
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ThreadCard;
