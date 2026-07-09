import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { voteThread } from '../../features/vote/voteSlice';
import { formatDate } from '../../utils/formatDate';

const ThreadDetail = ({ thread }) => {
  const dispatch = useDispatch();
  const { threadId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;

  const { owner, title, category, createdAt, body, upVotesBy, downVotesBy } = thread;

  const isUpvoted = userId && upVotesBy?.includes(userId);
  const isDownvoted = userId && downVotesBy?.includes(userId);

  const handleVote = (type) => {
    dispatch(voteThread({ threadId, type }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <img
          src={owner?.avatar}
          alt={owner?.name}
          className="w-12 h-12 rounded-full ring-2 ring-neutral-700 flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight">{title}</h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-400 mt-1">
            <span className="font-medium text-neutral-300">{owner?.name}</span>
            <span>{formatDate(createdAt)}</span>
            {category && (
              <span className="bg-neutral-700/70 text-neutral-300 px-2.5 py-0.5 rounded-full text-xs font-medium">
                {category}
              </span>
            )}
          </div>
        </div>
      </div>

      <div
        className="text-neutral-300 text-base leading-relaxed prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: body }}
      />

      <div className="flex items-center gap-2 pt-4 border-t border-neutral-700/50">
        <button
          onClick={() => handleVote(isUpvoted ? 'neutral' : 'up')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
            isUpvoted
              ? 'bg-green-900/20 border-green-500/50 text-green-400'
              : 'bg-neutral-800 hover:bg-neutral-700 border-neutral-700 text-neutral-300 hover:text-white'
          }`}
        >
          <ThumbsUp size={16} />
          <span>{upVotesBy?.length || 0}</span>
        </button>
        <button
          onClick={() => handleVote(isDownvoted ? 'neutral' : 'down')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
            isDownvoted
              ? 'bg-red-900/20 border-red-500/50 text-red-400'
              : 'bg-neutral-800 hover:bg-neutral-700 border-neutral-700 text-neutral-300 hover:text-white'
          }`}
        >
          <ThumbsDown size={16} />
          <span>{downVotesBy?.length || 0}</span>
        </button>
      </div>
    </div>
  );
};

export default ThreadDetail;
