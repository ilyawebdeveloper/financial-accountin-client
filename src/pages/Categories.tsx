import { FC, useState } from 'react';
import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { Form, useLoaderData } from 'react-router-dom';
import CategoryModal from '../components/CategoryModal';
import { ICategory, ITransaction } from '../types/types';
import { formatDate } from '../helpers/date.helper';
import { formatToUsd } from '../helpers/currency.helper';

const Categories: FC = () => {
  const categories = useLoaderData() as ICategory[];

  const [visibleModal, setVisibleModal] = useState(false);
  const [type, setType] = useState<'post' | 'patch'>('post');
  const [isEdit, setIsEdit] = useState(false);

  const [categoryId, setCategoryId] = useState<number | undefined>();

  const handleAdditionAmountTransition = (
    transactions: ITransaction[],
    type: 'income' | 'expense',
  ): number => {
    const filteredTransactions = transactions.filter(
      (transaction) => transaction.type === type,
    );
    const amounts = filteredTransactions.map(
      (transaction) => transaction.amount,
    );
    const totalAmount = amounts.reduce((acc, curr) => acc + curr, 0);

    return totalAmount;
  };

  return (
    <>
      <div className="p-4 rounded-md bg-slate-800">
        <h1 className="text-xl font-bold">Your Category list:</h1>
        <button
          className="max-w-fit flex items-center gap-2 text-white/50 hover:text-white mt-2"
          onClick={() => {
            setVisibleModal(true);
            setType('post');
          }}
        >
          <span>Create a new category</span>
          <FaPlus />
        </button>

        <div className="flex flex-wrap flex-shrink-3 gap-4 mt-4">
          {categories.map((category) => {
            const totalIncome = handleAdditionAmountTransition(
              category.transactions,
              'income',
            );

            const totalExpense = handleAdditionAmountTransition(
              category.transactions,
              'expense',
            );

            return (
              <div className="px-6 py-4 rounded-md bg-slate-600 flex flex-col min-w-[290px]">
                <div>
                  <p className="text-lg font-bold">{category.title}</p>
                </div>
                <div className="mt-2 flex gap-2">
                  <p className="font-bold">Created at:</p>
                  {formatDate(category.createdAt)}
                </div>
                <div className="mt-2 flex gap-2">
                  <p className="font-bold">Count transactions:</p>
                  {category.transactions.length}
                </div>
                <div className="mt-2 flex gap-2">
                  <p className="font-bold">Amount of receipts:</p>
                  <p className="text-green-400">
                    {formatToUsd.format(totalIncome)}
                  </p>
                </div>
                <div className="mt-2 flex gap-2">
                  <p className="font-bold">Cost amount:</p>
                  <p className="text-red-400">
                    {formatToUsd.format(totalExpense)}
                  </p>
                </div>

                <div className="mt-4 flex gap-2 justify-end">
                  <button
                    className="btn btn-green"
                    onClick={() => {
                      setVisibleModal(true);
                      setIsEdit(true);
                      setCategoryId(category.id);
                      setType('patch');
                    }}
                  >
                    <AiFillEdit />
                  </button>
                  <Form className="flex" method="delete" action="/categories">
                    <input type="hidden" value={category.id} name="id" />
                    <button type="submit" className="btn btn-red">
                      <AiFillCloseCircle />
                    </button>
                  </Form>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {visibleModal && (
        <CategoryModal type={type} setVisibleModal={setVisibleModal} />
      )}

      {visibleModal && isEdit && (
        <CategoryModal
          type={type}
          id={categoryId}
          setVisibleModal={setVisibleModal}
        />
      )}
    </>
  );
};

export default Categories;
