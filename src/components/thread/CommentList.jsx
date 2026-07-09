import CommentItem from './CommentItem';

const CommentList = ({ comments }) => {
  return comments && comments.length > 0 ? (
    <div className="space-y-4 mb-6">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  ) : (
    <p className="text-neutral-500 text-sm">Belum ada komentar.</p>
  );
};

export default CommentList;
