// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_USER,
  ADD_CURRENCIES_ITEM,
  ADD_EXPENSES, DELETE_EXPENSES,
  EDIT_EXPENSES,
  SAVE_CHANGES,
} from '../actions';

const initialState = {
  email: '', // string que armazena o email da pessoa usuária
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      email: action.email,
    };
  case ADD_CURRENCIES_ITEM:
    return {
      ...state,
      currencies: action.currencies,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.entraces],
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses.filter((el) => el.id !== action.id)],
    };
  case EDIT_EXPENSES:
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
    };
  case SAVE_CHANGES:
    return {
      ...state,
      expenses: [...action.editedExpenses],
      editor: action.editBool,
    };
  default:
    return state;
  }
};

export default wallet;
