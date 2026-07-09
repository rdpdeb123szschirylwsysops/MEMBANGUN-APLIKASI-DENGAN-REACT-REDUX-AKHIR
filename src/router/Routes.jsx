import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ThreadPageList from '../pages/ThreadPageList';
import ThreadPage from '../pages/ThreadPage';
import CreateThreadPage from '../pages/CreateThreadPage';
import LeaderboardPage from '../pages/LeaderboardPage';

const AppRoutes = ({ isLogged }) => {
  if (!isLogged) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<ThreadPageList />} />
      <Route path="/thread" element={<ThreadPageList />} />
      <Route path="/thread/:threadId" element={<ThreadPage />} />
      <Route path="/create-thread" element={<CreateThreadPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
