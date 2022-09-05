import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Stack } from 'react-bootstrap';

class Header extends Component {
  // resgatar via props --> const {expenses} = this.props
  // fazer a conversão de moeda pegando da chave exchangeRates === currency
  // fazer um reduce e colocar no <p data-testid="total-field">{TOTAL VEM AQUI}</p>

  render() {
    const { email, expenses } = this.props;
    // const toNumber = expenses.map((el) => parseInt(el.value, 10));
    const calculator = expenses.map((e) => ({
      value: e.value,
      cotation: Object.values(e.exchangeRates)
        .filter((el) => el.code === e.currency)
        .map((actual) => parseFloat(actual.ask)),
    }));
    const total = calculator.reduce((a, b) => a + b.value * b.cotation[0], 0);

    return (
      <div>
        <Stack direction="vertical" gap={ 1 }>
          <h4
            className="mx-auto"
            data-testid="email-field"
          >
            {email}
          </h4>
          <p className="mx-auto" data-testid="total-field">
            R$:
            {' '}
            {
              total.toFixed(2)
            }
          </p>
          <p className="mx-auto" data-testid="header-currency-field">BRL</p>
        </Stack>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
