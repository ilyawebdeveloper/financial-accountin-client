import { FC } from 'react';
import TransactionForm from '../components/TransactionForm.tsx';
import { useLoaderData } from 'react-router-dom';
import { ICategory, ITransaction } from '../types/types.ts';
import TransactionTable from '../components/TransactionTable.tsx';
import Chart from '../components/Chart.tsx';
import { formatToUsd } from '../helpers/currency.helper.ts';

interface LoaderData {
  categories: ICategory[];
  transactions: ITransaction[];
  totalIncome: number;
  totalExpense: number;
}

const Transactions: FC = () => {
  const { categories, transactions, totalIncome, totalExpense } =
    useLoaderData() as LoaderData;

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 pt-4 items-start">
        <div className="col-span-2 grid">
          <TransactionForm categories={categories} />
        </div>

        <div className="rounded-md bg-slate-800 p-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="uppercase text-md text-center font-bold">
                Total income
              </p>
              <p className="bg-green-600 p-1 rounded-sm text-center mt-2">
                {formatToUsd.format(totalIncome)}
              </p>
            </div>
            <div>
              <p className="uppercase text-md text-center font-bold">
                Total expence
              </p>
              <p className="bg-red-500 p-1 rounded-sm text-center mt-2">
                {formatToUsd.format(totalExpense)}
              </p>
            </div>
          </div>

          <Chart totalIncome={totalIncome} totalExpense={totalExpense} />
        </div>
      </div>

      <div className="my-5">
        <TransactionTable transactions={transactions} limit={5} />
      </div>
    </div>
  );
};

export default Transactions;
