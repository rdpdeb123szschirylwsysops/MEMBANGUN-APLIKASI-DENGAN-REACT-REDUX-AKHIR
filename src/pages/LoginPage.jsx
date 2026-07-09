import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../features/auth/authSlice';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useSelector } from 'react-redux';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);
  console.error(error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password })).unwrap();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-neutral-800/80 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700/50">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Selamat Datang</h1>
          <p className="text-neutral-400 text-sm mt-1">Masuk ke akun Anda</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1.5">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-900/50 border border-neutral-700/60 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                placeholder="Masukkan email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-900/50 border border-neutral-700/60 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                placeholder="Masukkan password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer"
          >
            <LogIn size={18} />
            Login
          </button>

          <p className="text-sm text-center text-neutral-400">
            Belum punya akun?{' '}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">
              Daftar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
