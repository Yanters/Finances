import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2022-01-05'),
  },
  {
    id: 'e3',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2021-12-01'),
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 14.99,
    date: new Date('2022-02-19'),
  },
  {
    id: 'e5',
    description: 'Another book',
    amount: 18.59,
    date: new Date('2022-02-18'),
  },
  {
    id: 'e6',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2021-12-01'),
  },
  {
    id: 'e7',
    description: 'A book',
    amount: 14.99,
    date: new Date('2022-02-19'),
  },
  {
    id: 'e8',
    description: 'Another book',
    amount: 18.59,
    date: new Date('2022-02-18'),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
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
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

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
