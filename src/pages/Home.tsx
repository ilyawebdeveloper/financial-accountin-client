import { FC } from 'react';
import { useLoaderData } from 'react-router-dom';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { ITransaction } from '../types/types';
import { formatToUsd } from '../helpers/currency.helper';

interface LoaderData {
  transactions: ITransaction[];
  incomeTransactions: { total: number; transactions: ITransaction[] };
  expenseTransactions: { total: number; transactions: ITransaction[] };
}

const Home: FC = () => {
  const { incomeTransactions, expenseTransactions } =
    useLoaderData() as LoaderData;

  const transactionsDataIncome = incomeTransactions.transactions.map(
    (transaction) => ({
      name: transaction.title,
      income: transaction.amount,
      amt: transaction.amount,
    }),
  );

  const transactionsDataExpense = expenseTransactions.transactions.map(
    (transaction) => ({
      name: transaction.title,
      expense: transaction.amount,
      amt: transaction.amount,
    }),
  );

  const totalIncome = incomeTransactions.total;
  const totalExpense = expenseTransactions.total;

  return (
    <div className="w-full h-full">
      <h2>Income chart</h2>
      <AreaChart width={800} height={200} data={transactionsDataIncome}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis dataKey="amt" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="income"
          stackId="2"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
      <h2>Expense chart</h2>
      <AreaChart
        width={800}
        height={200}
        data={transactionsDataExpense}
        margin={{
          top: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis dataKey="amt" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="expense"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
      </AreaChart>

      

      <h2 className="mt-4">General statistics</h2>
      <div className="bg-slate-800 p-3 w-fit rounded-md mt-1">
        <div className="flex gap-2 items-center justify-start">
          Income:
          <p className="text-green-500 p-1 text-center">
            {formatToUsd.format(totalIncome)}
          </p>
        </div>

        <div className="flex gap-2 items-center justify-start">
          Income:
          <p className="text-red-500 p-1 text-center">
            {formatToUsd.format(totalExpense)}
          </p>
        </div>

        <div className="flex gap-2 items-center justify-start">
          <p>Net Worth:</p>
          <p
            className={
              totalIncome - totalExpense > 0
                ? 'text-green-500 p-1 text-center'
                : 'text-red-500 p-1 text-center'
            }
          >
            {formatToUsd.format(totalIncome - totalExpense)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
