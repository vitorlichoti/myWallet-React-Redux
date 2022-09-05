import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import TableExpenses from '../components/Table';
import WalletEditForm from '../components/WalletEditForm';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  // fazer uma rendezação condicional num componente análogo ao walletForm

  render() {
    const { editor } = this.props;
    return (
      <div className="p-3 mb-2 bg-secondary text-white">
        <h1>myWallet</h1>
        <Header />
        {editor ? <WalletEditForm /> : <WalletForm />}

        <TableExpenses />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  editor: state.wallet.editor,
});

Wallet.propTypes = {
  editor: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Wallet);
