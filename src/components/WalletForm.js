import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, getCurrencies, saveFormEntraces } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  async componentDidMount() {
    const data = await fetchAPI();
    const { dispatch } = this.props;
    // criar um dispatch para mandar o retorno de fetched pro reducer colocar no estado global
    const currenciesOptions = Object.keys(data).filter((key) => key !== 'USDT');
    dispatch(getCurrencies(currenciesOptions));
  }

  handleFormInputs = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  saveInfos = async (event) => {
    event.preventDefault();
    const data = await fetchAPI();
    this.setState({
      exchangeRates: data,
    });

    const { dispatch } = this.props;
    console.log(this.state);
    dispatch(saveFormEntraces(this.state));

    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    }));
  };

  render() {
    const { wallet } = this.props;

    const { description, value } = this.state;

    return (
      <div className="rounded p-3 mb-2 bg-info text-dark">
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
            onChange={ this.handleFormInputs }
            data-testid="currency-input"
          >
            { wallet.currencies.map((currencie, index) => (
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
          onClick={ this.saveInfos }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  wallet: {
    currencies: state.wallet.currencies,
  },
});

export default connect(mapStateToProps)(WalletForm);
