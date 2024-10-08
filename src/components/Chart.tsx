import { FC } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

interface IChart {
  totalIncome: number;
  totalExpense: number;
}

interface IData {
  value: number;
  name: string;
}

const COLORS = ['#0088FE', '#FF8042'];

const Chart: FC<IChart> = ({ totalIncome, totalExpense }) => {
  const data: IData[] = [
    { name: 'Income', value: totalIncome },
    { name: 'Expense', value: totalExpense },
  ];

  return (
    <div>
      <PieChart width={240} height={240}>
        <Pie
          data={data}
          cx={'50%'}
          cy={'50%'}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default Chart;
