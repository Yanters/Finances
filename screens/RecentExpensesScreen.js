import { useContext, useEffect, useState} from 'react';
import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import LoadingOverview from '../components/UI/LoadingOverview';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';

const RecentExpensesScreen = () => {
  const expensesCtx = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);


  useEffect(() => {

    const getExpenses = async () => {
      setIsFetching(true);
      const expenses = await fetchExpenses();
      setIsFetching(false);
      expensesCtx.setExpenses(expenses);
    };
    getExpenses();

  }, []);

  if (isFetching) {
    return <LoadingOverview/>
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo;
  });

  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod={'Last 7 days'} />
  );
};

export default RecentExpensesScreen;
