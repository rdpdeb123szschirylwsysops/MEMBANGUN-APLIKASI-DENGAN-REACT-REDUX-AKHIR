import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchThreadDetail } from '../features/threadDetail/threadDetailSlice';
import ThreadDetail from '../components/thread/ThreadDetail';
import CommentList from '../components/thread/CommentList';
import CommentForm from '../components/thread/CommentForm';

const ThreadPage = () => {
  const dispatch = useDispatch();
  const { threadId } = useParams();
  const { thread } = useSelector((state) => state.threadDetail);

  useEffect(() => {
    dispatch(fetchThreadDetail(threadId));
  }, [dispatch, threadId]);

  return thread ? (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
        <ThreadDetail thread={thread} />
        <h3 className="text-lg font-semibold text-white mt-6 mb-4">
          Komentar ({thread.comments?.length || 0})
        </h3>
        <CommentList comments={thread.comments} />
        <CommentForm threadId={threadId} />
      </div>
    </div>
  ) : (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
        <h3 className="text-lg font-semibold text-white">Thread tidak ditemukan</h3>
      </div>
    </div>
  );
};

export default ThreadPage;
