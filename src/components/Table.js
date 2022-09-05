import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux';
import { deleteExpenses, editExpenses } from '../redux/actions';

class TableExpenses extends Component {
  render() {
    const REAL = 'Real';
    const { expenses, dispatch } = this.props;
    const exchanges = expenses.map((e) => Object.values(e.exchangeRates)
      .find((el) => el.code === e.currency));
    return (
      <div>
        <Table className="p-3 mb-2 bg-light text-dark" responsive striped bordered hover>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((element, index) => (
              <tr key={ element.id }>
                <td>
                  {element.description}
                </td>
                <td>
                  {element.tag}
                </td>
                <td>
                  {element.method}
                </td>
                <td>
                  {(parseFloat(element.value)).toFixed(2)}
                </td>
                <td>
                  {exchanges[index].name}
                </td>
                <td>
                  {(parseFloat(exchanges[index].ask)).toFixed(2)}
                </td>
                <td>
                  {(element.value * parseFloat(exchanges[index].ask)).toFixed(2)}
                </td>
                <td>
                  {REAL}
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => dispatch(editExpenses(element.id)) }
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => dispatch(deleteExpenses(element.id)) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(TableExpenses);

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};
