import { makeStyles, Paper, Typography } from '@material-ui/core'
import Chart from 'chart.js';
import React, { useEffect, useState } from 'react'
import { Category, Transaction } from '../../../../shared/types';
import DoughnutChart from '../../../components/DoughnutChart';
import { roundToDecimalsAsNumber } from '../../../utils/round';
import SummaryTable from './SummaryTable';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '20px',
    textAlign: 'center'
  },
  title: {
    padding: '20px',
    textAlign: 'left',
    backgroundColor: theme.palette.primary.dark,
  },
  subtitle: {
    padding: '26px 20px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  chart: {
    marginBottom: '20px',
  }
}))

interface Props {
  categories: Category[];
  transactions: Transaction[];
}

const SummaryContainer = ({ categories, transactions }: Props): JSX.Element | null => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [chartData, setChartData] = useState<Chart.ChartData>();
  const classes = useStyles();

  useEffect(() => {
    const incomeCategories = categories.filter(c => c.type === 'income').map(c => c.id);
    const expenseCategories = categories.filter(c => c.type === 'expense').map(c => c.id);
    const income = transactions.filter(tr => incomeCategories.includes(tr.categoryId)).reduce((acc, tr) => acc + tr.amount, 0);
    const expense = transactions.filter(tr => expenseCategories.includes(tr.categoryId)).reduce((acc, tr) => acc + tr.amount, 0);
    if (income > 0 || expense > 0) {
      setChartData({
        labels: ['Income Spent', 'Income Left'],
        datasets: [{
          data: [roundToDecimalsAsNumber(expense, 2), roundToDecimalsAsNumber(income-expense, 2)],
          backgroundColor: ['#66B088cc', '#EEEEEE33'],
          borderWidth: 0,
        }],
      })
    }
    else setChartData(undefined);
    setIncome(income);
    setExpense(expense);
  }, [categories, transactions])


  return (
    <Paper className={classes.root} elevation={6}>
      <Typography variant="h6" className={classes.title}>Summary</Typography>
      {chartData &&
        <>
          <div className={classes.subtitle}>Income Spent</div>
          <DoughnutChart className={classes.chart} data={chartData} />
        </>
      }
      <SummaryTable income={income} expense={expense} />
    </Paper>
  )
}

export default SummaryContainer
