import { FC } from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 font-roboto text-white justify-center items-center flex-col gap-10">
      <h1 className="text-rose-700"> Ooooooopps </h1>
      <h2 className="text-yellow-600">
        It looks like you are trying to navigate to a non-existent page
      </h2>
      <Link to=""> Back to main page </Link>
    </div>
  );
};

export default ErrorPage;
