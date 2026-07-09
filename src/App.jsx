import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './features/auth/authSlice';
import Loading from './components/layout/Loading';
import Navbar from './components/layout/Navbar';
import Routes from './router/Routes';
import useGlobalLoading from './app/hooks';

const App = () => {
  const dispatch = useDispatch();
  const { isLogged, token, user } = useSelector((state) => state.auth);
  const loading = useGlobalLoading();

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUser());
    }
  }, [token, user, dispatch]);

  return (
    <>
      {loading && <Loading />}
      <Navbar isLogged={isLogged} />
      <Routes isLogged={isLogged} />
    </>
  );
};

export default App;
