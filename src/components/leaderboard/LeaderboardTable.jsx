import { Crown, Medal } from 'lucide-react';

const RANK_STYLES = [
  'bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 border-yellow-500/30 text-yellow-400',
  'bg-gradient-to-r from-gray-400/20 to-gray-400/5 border-gray-400/30 text-gray-300',
  'bg-gradient-to-r from-amber-600/20 to-amber-600/5 border-amber-600/30 text-amber-400',
];

const CARD_STYLES = [
  'bg-linear-to-r from-yellow-500/10 to-transparent border-yellow-500/20 hover:border-yellow-500/40',
  'bg-linear-to-r from-gray-400/10 to-transparent border-gray-400/20 hover:border-gray-400/40',
  'bg-linear-to-r from-amber-600/10 to-transparent border-amber-600/20 hover:border-amber-600/40',
];

const LeaderboardTable = ({ leaderboards }) => {
  const getRankStyle = (index) => RANK_STYLES[index] || 'border-neutral-700 text-neutral-400';
  const getCardStyle = (index) => CARD_STYLES[index] || 'bg-neutral-800/40 border-neutral-700/50 hover:border-neutral-600';

  const getRankIcon = (index) => {
    if (index === 0) return <Crown size={20} className="text-yellow-400" />;
    if (index === 1) return <Medal size={20} className="text-gray-400" />;
    if (index === 2) return <Medal size={20} className="text-amber-600" />;
    return null;
  };

  return (
    <div className="space-y-3">
      {leaderboards && leaderboards.length > 0 ? (
        leaderboards.map((item, index) => (
          <div
            key={item.user.id}
            className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${getCardStyle(index)}`}
          >
            <div className="shrink-0 w-10 text-center">
              <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full border text-sm font-bold ${getRankStyle(index)}`}>
                {index + 1}
              </span>
            </div>

            <div className="flex items-center gap-3 flex-1 min-w-0">
              <img src={item.user.avatar} alt={item.user.name} className="w-12 h-12 rounded-full ring-2 ring-neutral-700 shrink-0" />
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm font-medium text-white truncate">{item.user.name}</span>
                {getRankIcon(index)}
              </div>
            </div>

            <div className="shrink-0">
              <span className="text-xl font-bold text-white tabular-nums">{item.score}</span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-neutral-500 text-sm text-center">Belum ada data leaderboard.</p>
      )}
    </div>
  );
};

export default LeaderboardTable;
