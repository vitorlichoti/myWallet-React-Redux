import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveChanges } from '../redux/actions';

class WalletEditForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { expenses, idToEdit } = this.props;
    const filterToEdit = expenses.find((ex) => ex.id === idToEdit);
    this.setState({
      id: filterToEdit.id,
      value: filterToEdit.value,
      description: filterToEdit.description,
      currency: filterToEdit.currency,
      method: filterToEdit.method,
      tag: filterToEdit.tag,
      exchangeRates: filterToEdit.exchangeRates,
    });
  }

  handleFormInputs = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  saveChangesToGlobalState = () => {
    const { dispatch, expenses, idToEdit } = this.props;

    const filterToEdit = expenses.find((ex) => ex.id === idToEdit);
    const editIndex = expenses.indexOf(filterToEdit);
    const editedExpenses = expenses;
    editedExpenses.splice(editIndex, 1, this.state);
    console.log(editedExpenses);

    dispatch(saveChanges(false, editedExpenses));
    console.log(this.state, editedExpenses);
  };

  render() {
    const { currencies } = this.props;

    const { description, value, currency, method, tag } = this.state;

    return (
      <div className="rounded p-3 mb-2 bg-warning text-dark">
        <label htmlFor="despesa">
          Valor da Despesa
          <input
            className="rounded"
            type="text"
            name="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleFormInputs }
          />
        </label>
        <label htmlFor="descricaoDespesa">
          Descrição da Despesa
          <input
            className="rounded"
            type="text"
            name="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.handleFormInputs }
          />
        </label>
        <label htmlFor="tipoMoeda">
          Moeda:
          <select
            className="rounded"
            name="currency"
            value={ currency }
            onChange={ this.handleFormInputs }
            data-testid="currency-input"
          >
            { currencies.map((currencie, index) => (
              <option
                key={ `${currencie}${index}` }
                // data-testid="currency-input"
              >
                {currencie}
              </option>))}
          </select>
        </label>
        <label htmlFor="metodo">
          Método
          <select
            className="rounded"
            name="method"
            value={ method }
            onChange={ this.handleFormInputs }
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="categoriaDespesa">
          Categoria de Despesa
          <select
            className="rounded"
            name="tag"
            value={ tag }
            onChange={ this.handleFormInputs }
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          className="btn btn-primary"
          type="button"
          onClick={ this.saveChangesToGlobalState }
        >
          Editar despesa
        </button>
      </div>
    );
  }
}

WalletEditForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletEditForm);
