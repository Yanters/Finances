import { useContext } from 'react';
import { Text } from 'react-native';
import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

const AllExpensesScreen = () => {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod={'Total'} />
  );
};

export default AllExpensesScreen;
