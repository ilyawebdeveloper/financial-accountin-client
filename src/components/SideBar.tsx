import { FC } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  FaHouseUser,
  FaList,
  FaCcAmazonPay,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/user/userSlice';
import { removeTokenFromLocalStorage } from '../helpers/localStorage.helper';

const SideBar: FC = () => {
  const { isAuth } = useAuth();
  const dispath = useAppDispatch();
  const navigate = useNavigate();

  const handlerLogout = () => {
    removeTokenFromLocalStorage('token');
    dispath(logout());

    navigate('/auth', { replace: true });
  };

  return (
    <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900">
      <NavLink
        to={'/'}
        className={({ isActive }) =>
          isActive
            ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'
            : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white/50'
        }
      >
        <FaHouseUser />
        <div className="ml-4 font-bold">Home</div>
      </NavLink>

      <NavLink
        to={'/categories'}
        className={({ isActive }) =>
          isActive
            ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'
            : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white/50'
        }
      >
        <FaList />
        <div className=" ml-4 font-bold">Categories</div>
      </NavLink>

      <NavLink
        to={'/transactions'}
        className={({ isActive }) =>
          isActive
            ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'
            : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white/50'
        }
      >
        <FaCcAmazonPay />
        <div className="ml-4 font-bold">Transactions</div>
      </NavLink>
      <div className="my-4 bg-gray-600 h-[1px]"></div>
      {/* <div
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        // onClick="dropdown()"
      >
        <i className="bi bi-chat-left-text-fill"></i>
        <div className="flex justify-between w-full items-center">
          <span className="text-[15px] ml-4 text-gray-200 font-bold">
            Chatbox
          </span>
          <span className="text-sm rotate-180" id="arrow">
            <i className="bi bi-chevron-down"></i>
          </span>
        </div>
      </div>
      <div
        className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold"
        id="submenu"
      >
        <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
          Social
        </h1>
        <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
          Personal
        </h1>
        <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
          Friends
        </h1>
      </div> */}
      <div
        className={
          isAuth
            ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-white hover:bg-red-500'
            : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-white hover:bg-blue-500'
        }
      >
        {isAuth ? (
          <>
            <FaSignOutAlt />
            <button className="ml-4" onClick={handlerLogout}>
              <span>Log Out</span>
            </button>
          </>
        ) : (
          <Link to={'auth'} className="text-white/50 hover:text-white">
            Log In / Sig In
          </Link>
        )}
      </div>
    </div>
  );
};

export default SideBar;
