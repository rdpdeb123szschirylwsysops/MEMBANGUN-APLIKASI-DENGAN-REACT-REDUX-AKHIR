import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { voteComment } from '../../features/vote/voteSlice';
import { formatDate } from '../../utils/formatDate';

const CommentItem = ({ comment }) => {
  const dispatch = useDispatch();
  const { threadId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;

  const { owner, content, createdAt, upVotesBy, downVotesBy, id: commentId } = comment;

  const isUpvoted = userId && upVotesBy?.includes(userId);
  const isDownvoted = userId && downVotesBy?.includes(userId);

  const handleVote = (type) => {
    dispatch(voteComment({ threadId, commentId, type }));
  };

  return (
    <div className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-700/50 hover:border-neutral-600 transition-all duration-200">
      <div className="flex items-start gap-3">
        <img src={owner?.avatar} alt={owner?.name} className="w-9 h-9 rounded-full ring-2 ring-neutral-700 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-white">{owner?.name}</span>
            <span className="text-neutral-400 text-xs">{formatDate(createdAt)}</span>
          </div>
          <div className="text-neutral-300 text-sm mt-1.5 leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
          <div className="flex items-center gap-1.5 mt-3">
            <button
              onClick={() => handleVote(isUpvoted ? 'neutral' : 'up')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                isUpvoted ? 'bg-green-900/20 border-green-500/50 text-green-400' : 'bg-neutral-800 hover:bg-neutral-700 border-neutral-700 text-neutral-300 hover:text-white'
              }`}
            >
              <ThumbsUp size={13} />
              <span>{upVotesBy?.length || 0}</span>
            </button>
            <button
              onClick={() => handleVote(isDownvoted ? 'neutral' : 'down')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                isDownvoted ? 'bg-red-900/20 border-red-500/50 text-red-400' : 'bg-neutral-800 hover:bg-neutral-700 border-neutral-700 text-neutral-300 hover:text-white'
              }`}
            >
              <ThumbsDown size={13} />
              <span>{downVotesBy?.length || 0}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
