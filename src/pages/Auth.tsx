import { FC, useState } from 'react';
import { AuthService } from '../services/auth.service';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../store/hooks';
import { setTokenToLocalStorage } from '../helpers/localStorage.helper';
import { login } from '../store/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Auth: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const dispath = useAppDispatch();
  const navigate = useNavigate();

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await AuthService.registration({
        email,
        password,
      });

      if (data) {
        toast.success('Account has been registration');
        setIsLogin(!isLogin);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err.response?.data.message;

      toast.error(error.toString());
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await AuthService.login({
        email,
        password,
      });

      if (data) {
        setTokenToLocalStorage('token', data.token ?? '');
        dispath(login(data));

        toast.success('Account has been registration');

        navigate('/', { replace: true });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err.response?.data.message;

      toast.error(error.toString());
    }
  };

  return (
    <div className="pt-40 flex-col justify-center items-center bg-slate-900 text-white">
      <h1 className="text-center text-xl mb-10">
        {isLogin ? 'Login' : 'Registration'}
      </h1>

      <form
        className="flex w-1/3 flex-col mx-auto gap-5"
        onSubmit={isLogin ? handleLogin : handleRegistration}
      >
        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-green mx-auto" type="submit">
          Submit
        </button>
      </form>

      <div className="flex justify-center mt-5">
        {isLogin ? (
          <button
            className="text-slate-300 hover:text-white"
            onClick={() => {
              setIsLogin(!isLogin);
            }}
          >
            You don't have account?
          </button>
        ) : (
          <button
            className="text-slate-300 hover:text-white"
            onClick={() => {
              setIsLogin(!isLogin);
            }}
          >
            Alredy have an account?
          </button>
        )}
      </div>
    </div>
  );
};

export default Auth;
