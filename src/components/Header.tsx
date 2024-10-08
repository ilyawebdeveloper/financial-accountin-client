import { FC } from 'react';
import { FaBtc, FaSignOutAlt } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/user/userSlice';
import { removeTokenFromLocalStorage } from '../helpers/localStorage.helper';

const Header: FC = () => {
  const { isAuth } = useAuth();
  const dispath = useAppDispatch();
  const navigate = useNavigate();

  const handlerLogout = () => {
    removeTokenFromLocalStorage('token');
    dispath(logout());

    navigate('/auth', { replace: true });
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 shadow-sm bg-slate-800 backdrop-blur-sm">
      <Link to="/">
        <FaBtc size={20} />
      </Link>
      {isAuth && (
        <ul className="flex items-center gap-5 ml-auto mr-10">
          <li>
            <NavLink
              to={'/'}
              className={({ isActive }) =>
                isActive ? 'text-white' : 'text-white/50'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/categories'}
              className={({ isActive }) =>
                isActive ? 'text-white' : 'text-white/50'
              }
            >
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/transactions'}
              className={({ isActive }) =>
                isActive ? 'text-white' : 'text-white/50'
              }
            >
              Transactions
            </NavLink>
          </li>
        </ul>
      )}

      {isAuth ? (
        <button className="btn btn-red" onClick={handlerLogout}>
          <span>Log Out</span>
          <FaSignOutAlt />
        </button>
      ) : (
        <Link to={'auth'} className="py-2 text-white/50 hover:text-white">
          Log In / Sig In
        </Link>
      )}
    </header>
  );
};

export default Header;
