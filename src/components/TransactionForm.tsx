import { FC, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Form } from 'react-router-dom';
import { ICategory } from '../types/types';
import CategoryModal from './CategoryModal';

interface Props {
  categories: ICategory[];
}

const TransactionForm: FC<Props> = ({ categories }) => {
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <div className="rounded-md bg-slate-800 p-4">
      <Form className="grid gap-2" method="post" action="/transactions">
        <label htmlFor="title" className="grid">
          <span>Title</span>
          <input
            type="text"
            name="title"
            id="title"
            className="input border-slate-600 placeholder:text-white/40"
            placeholder="Title..."
            required
          />
        </label>

        <label htmlFor="amount" className="grid">
          <span>Amount</span>
          <input
            type="number"
            name="amount"
            id="amount"
            className="input border-slate-600 placeholder:text-white/40"
            placeholder="Amount..."
            required
          />
        </label>

        {categories.length ? (
          <label htmlFor="category" className="grid">
            <span>Category</span>
            <select
              name="category"
              id="category"
              className="input border-slate-600"
              required
            >
              {categories.map((category) => (
                <option
                  value={category.id}
                  className="bg-slate-600"
                  key={category.createdAt}
                >
                  {category.title}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <h1 className="mt-1 text-red-400"> Please create category </h1>
        )}

        <button
          className="max-w-fit flex items-center gap-2 text-white/50 hover:text-white mt-2"
          onClick={() => {
            setVisibleModal(true);
          }}
        >
          <span>Manage categories:</span>
          <FaPlus />
        </button>

        <div className="flex gap-4 items-center">
          <label
            htmlFor="type"
            className=" cursor-pointer flex items-center gap-2"
          >
            <input
              type="radio"
              name="type"
              id="type"
              value="income"
              className="form-radio text-blue-600"
            />
            <span>Income</span>
          </label>

          <label
            htmlFor="type"
            className=" cursor-pointer flex items-center gap-2"
          >
            <input
              type="radio"
              name="type"
              id="type"
              value="expense"
              className="form-radio text-blue-600"
            />
            <span>Expense</span>
          </label>
        </div>

        <button className="btn btn-green max-w-fit mt-2" type="submit">
          Submit
        </button>
      </Form>

      {visibleModal && (
        <CategoryModal type="post" setVisibleModal={setVisibleModal} />
      )}
    </div>
  );
};

export default TransactionForm;
