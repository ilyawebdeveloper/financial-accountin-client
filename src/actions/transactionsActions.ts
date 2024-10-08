import { ICategory, ITransaction } from './../types/types';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { instant } from '../api/axios.api';
import { toast } from 'react-toastify';

export const transactionsAction = async ({ request }: any) => {
  switch (request.method) {
    case 'POST': {
      const formData = await request.formData();
      const newTransaction = {
        title: formData.get('title'),
        amount: +formData.get('amount'),
        category: formData.get('category'),
        type: formData.get('type'),
      };

      await instant.post('transactions/create', newTransaction).then(() => {
        toast.success('Transaction created');
      });

      return null;
    }

    case 'PATCH': {
      const formData = await request.formData();
      const category = {
        title: formData.get('title'),
        id: formData.get('id'),
      };

      await instant.patch(`categories/category/${category.id}`, category);

      return null;
    }

    case 'DELETE': {
      const formData = await request.formData();
      const transactionId = formData.get('id');
      await instant
        .delete(`transactions/transaction/remove/${transactionId}`)
        .then(() => {
          toast.success('Transaction deleted');
        });

      return null;
    }
    default:
      throw new Error(`Unsupported method: ${request.metod}`);
  }
};

export const transactionsLoader = async () => {
  const categories = await instant.get<ICategory[]>('/categories');
  const transactions = await instant.get<ITransaction[]>('transactions');

  const totalIncome = await instant.get<{ total: number }>(
    'transactions/income/find',
  ); //vremennoe
  const totalExpense = await instant.get<{ total: number }>(
    'transactions/expense/find',
  ); //vremennoe

  return {
    totalIncome: totalIncome.data.total,
    totalExpense: totalExpense.data.total,
    categories: categories.data,
    transactions: transactions.data,
  };
};
