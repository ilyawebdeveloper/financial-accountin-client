import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { useAppDispatch } from './store/hooks';
import { getTokenFromLocalStorage } from './helpers/localStorage.helper';
import { AuthService } from './services/auth.service';
import { login, logout } from './store/user/userSlice';
import { useEffect } from 'react';

export default function App() {
  const dispath = useAppDispatch();

  const checkAuth = async () => {
    const token = getTokenFromLocalStorage();

    try {
      if (token) {
        const data = await AuthService.getProfile();

        if (data) {
          dispath(login(data));
        }
      }
    } catch (error) {
      console.log(error);

      dispath(logout());
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <RouterProvider router={router} />;
}
