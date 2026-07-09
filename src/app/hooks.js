import { useSelector } from 'react-redux';

const useGlobalLoading = () => {
  const authLoading = useSelector((state) => state.auth.loading);
  const threadLoading = useSelector((state) => state.thread.loading);
  const threadDetailLoading = useSelector((state) => state.threadDetail.loading);
  const voteLoading = useSelector((state) => state.vote.loading);
  const leaderboardLoading = useSelector((state) => state.leaderboards.loading);
  return authLoading || threadLoading || threadDetailLoading || voteLoading || leaderboardLoading;
};

export default useGlobalLoading;
