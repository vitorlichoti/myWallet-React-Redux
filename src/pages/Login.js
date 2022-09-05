import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { addUser } from '../redux/actions';

const SIX_NUMBER = 6;
const MAIL_FORMAT = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { history: { push }, dispatch } = this.props;

    push('/carteira');

    dispatch(addUser(email));
  };

  getLoginData = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { email, password } = this.state;
    const validEmail = MAIL_FORMAT.test(email);
    const validPassword = password.length >= SIX_NUMBER;
    const isDisabled = validEmail && validPassword;
    return (
      <div>
        <Form
          className="rounded p-3 mb-2 bg-secondary text-dark
        position-absolute top-50 start-50 translate-middle"
        >
          <h1 className="text-center">myWallet</h1>
          <h3 className="text-center">Login</h3>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={ email }
              data-testid="email-input"
              onChange={ this.getLoginData }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Senha</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={ password }
              data-testid="password-input"
              onChange={ this.getLoginData }
            />
          </Form.Group>
          <Button
            type="button"
            disabled={ !isDisabled }
            onClick={ this.handleSubmit }
          >
            Entrar
          </Button>
        </Form>
      </div>
    );
  }
}

export default connect()(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
