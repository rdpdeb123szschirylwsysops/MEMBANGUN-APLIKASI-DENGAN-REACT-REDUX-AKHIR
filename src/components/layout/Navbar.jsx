import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { MessageSquare, Trophy, LogOut, LogIn, UserPlus } from 'lucide-react';

const Navbar = ({ isLogged }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive(path)
        ? 'bg-blue-600/20 text-blue-400'
        : 'text-neutral-400 hover:text-white hover:bg-neutral-700/50'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-neutral-800/90 backdrop-blur-sm border-b border-neutral-700/50 px-6 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
          My Thread
        </Link>
        <div className="flex items-center gap-1">
          {isLogged ? (
            <>
              <Link to="/thread" className={navLinkClass('/thread')}>
                <MessageSquare size={18} />
                Thread
              </Link>
              <Link to="/leaderboard" className={navLinkClass('/leaderboard')}>
                <Trophy size={18} />
                Leaderboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all duration-200 cursor-pointer"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={navLinkClass('/login')}>
                <LogIn size={18} />
                Login
              </Link>
              <Link to="/register" className={navLinkClass('/register')}>
                <UserPlus size={18} />
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
