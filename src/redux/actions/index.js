// Coloque aqui suas actions
export const ADD_USER = 'ADD_USER';
export const ADD_CURRENCIES_ITEM = 'ADD_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';
export const SAVE_CHANGES = 'SAVE_CHANGES';

export const addUser = (email) => ({
  type: ADD_USER,
  email,
});

export const getCurrencies = (currencies) => ({
  type: ADD_CURRENCIES_ITEM,
  currencies,
});

export const saveFormEntraces = (entraces) => ({
  type: ADD_EXPENSES,
  entraces,
});

export const deleteExpenses = (id) => ({
  type: DELETE_EXPENSES,
  id,
});

export const editExpenses = (id) => ({
  type: EDIT_EXPENSES,
  id,
});

export const saveChanges = (editBool, editedExpenses) => ({
  type: SAVE_CHANGES,
  editBool,
  editedExpenses,
});

export const fetchAPI = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  // const currenciesOptions = Object.keys(data).filter((key) => key !== 'USDT');
  return data;
};
