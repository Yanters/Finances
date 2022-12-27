import { useContext, useEffect, useState} from 'react';
import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import ErrorOverview from '../components/UI/ErrorOverview';
import LoadingOverview from '../components/UI/LoadingOverview';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';

const RecentExpensesScreen = () => {
  const expensesCtx = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();


  useEffect(() => {

    const getExpenses = async () => {
      setIsFetching(true);
      try{
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      }
      catch(error){
        setError(error.message);
      }
      setIsFetching(false);
    };
    getExpenses();

  }, []);

  const errorHandler = () => {
    setError(null);
  };
  if(error&& !isFetching){
    return <ErrorOverview message={error} onPress={errorHandler} />;
  }

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
