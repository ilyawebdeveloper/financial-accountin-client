import { ITransaction } from './../types/types';
import { instant } from '../api/axios.api';
import { toast } from 'react-toastify';

export const homeLoader = async () => {
  const transactions = await instant.get<ITransaction[]>('transactions');

  const incomeTransactions = await instant.get<{
    total: number;
    transactions: ITransaction[];
  }>('transactions/income/find'); //vremennoe
  const expenseTransactions = await instant.get<{
    total: number;
    transactions: ITransaction[];
  }>('transactions/expense/find'); //vremennoe

  return {
    incomeTransactions: incomeTransactions.data,
    expenseTransactions: expenseTransactions.data,
    transactions: transactions.data,
  };
};
