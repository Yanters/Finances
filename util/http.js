import axios from 'axios';

// should be in .env file but for simplicity I put it here
const FIREBASE_URL =
  'https://react-native-b6ece-default-rtdb.europe-west1.firebasedatabase.app';

export const storeExpense = async (expense) => {
  const response = await axios.post(`${FIREBASE_URL}/expenses.json`, expense);
  const id = response.data.name;
  return id;
};

export const fetchExpenses = async () => {
  const response = await axios.get(`${FIREBASE_URL}/expenses.json`);
  const expenses = [];
  for (const key in response.data) {
    expenses.push({
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    });
  }
  return expenses;
};

export const updateExpense =  (id, expense) => {
  return axios.put(`${FIREBASE_URL}/expenses/${id}.json`, expense);
};

export const deleteExpense =  (id) => {
  return axios.delete(`${FIREBASE_URL}/expenses/${id}.json`);
};
