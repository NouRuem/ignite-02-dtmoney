import { createContext, useEffect, useState, ReactNode } from 'react';
import { api } from './services/api';

interface Transction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
};

interface TransctionsProviderProps {
  children: ReactNode;
};

export const TransationsContext = createContext<Transction[]>([]);

export function TransactionsProvider({ children }: TransctionsProviderProps) {
  const [transactions, setTransactions] = useState<Transction[]>([]);

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, []);

  return (
    <TransationsContext.Provider value={transactions}>
      {children}
    </TransationsContext.Provider>
  );
}
