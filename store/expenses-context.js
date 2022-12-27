import { createContext, useReducer } from 'react';

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  removeExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      const id = new Date().toString() + Math.random().toString();
      return [
        ...state,
        {
          id,
          ...action.payload,
        },
      ];
    case 'SET_EXPENSES':
      return action.payload;
    case 'REMOVE_EXPENSE':
      return state.filter((expense) => expense.id !== action.payload);
    case 'UPDATE_EXPENSE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedExpense = {
        ...updatableExpense,
        ...action.payload.data,
      };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedExpense;
      return updatedExpenses;
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  const addExpense = ({ description, amount, date }) => {
    dispatch({
      type: 'ADD_EXPENSE',
      payload: {
        description,
        amount,
        date,
      },
    });
  };

  const setExpenses = (expenses) => {
    dispatch({
      type: 'SET_EXPENSES',
      payload: expenses,
    });
  };

  const removeExpense = (id) => {
    dispatch({
      type: 'REMOVE_EXPENSE',
      payload: id,
    });
  };

  const updateExpense = (id, { description, amount, date }) => {
    dispatch({
      type: 'UPDATE_EXPENSE',
      payload: {
        id,
        data: {
          description,
          amount,
          date,
        },
      },
    });
  };

  const context = {
    expenses: expensesState,
    addExpense,
    setExpenses,
    removeExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={context}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
