import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTransactionsByCategory } from '../services/transactionService';
import { Transaction } from '../types';

const TransactionsList = (): JSX.Element | null => {
  const { category } = useParams<{ category: string}>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  console.log(category);

  const populateTransactions = async () => {
    const trans = await getTransactionsByCategory(category);
    setTransactions(trans);
  }

  useEffect(() => {
    populateTransactions();
  }, [])

  if (!transactions) return null;

  return (
    <>
      <h3>{category}</h3>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.date}>{transaction.date} - {transaction.amount}</li>
        ))}
      </ul>
    </>
  )
}

export default TransactionsList;