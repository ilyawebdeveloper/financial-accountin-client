import { FC, useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { ITransaction } from '../types/types';
import { formatDate } from '../helpers/date.helper';
import { formatToUsd } from '../helpers/currency.helper';
import { Form } from 'react-router-dom';
import { instant } from '../api/axios.api';
import ReactPaginate from 'react-paginate';

interface Props {
  transactions: ITransaction[];
  limit: number;
}

const TransactionTable: FC<Props> = ({ transactions, limit = 3 }) => {
  const [data, setData] = useState<ITransaction[]>([]);

  const [currentPage, setCurrentpage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const fetchTransaction = async (page: number) => {
    const response = await instant.get(
      `transactions/pagination?page=${page}&limit=${limit}`,
    );

    setData(response.data);
    setTotalPage(Math.ceil(transactions.length / limit));
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentpage(selectedItem.selected + 1);
  };

  useEffect(() => {
    fetchTransaction(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, transactions]);

  return (
    <>
      <div className="bg-slate-800 px-4 py-3 rounded-md">
        <table className="w-full">
          <thead>
            <tr>
              <td className="font-bold">№</td>
              <td className="font-bold">Title</td>
              <td className="font-bold">Amount($)</td>
              <td className="font-bold">Category</td>
              <td className="font-bold">Data</td>
              <td className="font-bold text-right">Action</td>
            </tr>
          </thead>
          <tbody>
            {data.map((transaction, index) => (
              <tr key={transaction.id}>
                <td>{index + 1}</td>
                <td>{transaction.title}</td>
                <td
                  className={
                    transaction.type === 'income'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }
                >
                  {transaction.type === 'income'
                    ? `+ ${formatToUsd.format(transaction.amount)}`
                    : `- ${formatToUsd.format(transaction.amount)}`}
                </td>
                <td
                  className={
                    transaction.category ? 'text-white/70' : 'text-red-500'
                  }
                >
                  {transaction.category?.title ?? 'Category Other'}
                </td>
                <td>{formatDate(transaction.createdAt)}</td>
                <td>
                  <Form className="flex" method="delete" action="/transactions">
                    <input type="hidden" value={transaction.id} name="id" />
                    <button className="btn hover:btn-red ml-auto" type="submit">
                      <FaTrash />
                    </button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          className="flex gap-3 mt-4 items-center justify-end"
          activeClassName="bg-blue-600 rounded-sm"
          pageLinkClassName="text-white text-xs py-1 px-2 rounded-sm"
          previousClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
          nextClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
          disabledClassName="text-white/50 cursor-not-allowed"
          disabledLinkClassName="text-slate-600 cursor-not-allowed"
          pageCount={totalPage}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default TransactionTable;
