import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Trophy } from 'lucide-react';
import LeaderboardTable from '../components/leaderboard/LeaderboardTable';
import { fetchLeaderboards } from '../features/leaderboard/leaderboardSlice';

const LeaderboardPage = () => {
  const dispatch = useDispatch();
  const { leaderboards } = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(fetchLeaderboards());
  }, [dispatch]);

  return leaderboards && leaderboards.length > 0 ? (
    <div className="min-h-screen max-w-4xl mx-auto p-4">
      <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
        <div className="flex items-center gap-3 mb-6">
          <Trophy size={28} className="text-yellow-500" />
          <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
        </div>
        <LeaderboardTable leaderboards={leaderboards} />
      </div>
    </div>
  ) : (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
        <h3 className="text-lg font-semibold text-white">Tidak ada data leaderboard</h3>
      </div>
    </div>
  );
};

export default LeaderboardPage;
