import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import WalletForm from '../components/WalletForm';
import renderWithRouterAndRedux from './helpers/renderWith';

const EMAIL = 'test@test.com';
const PASSWORD = '1233456';

describe('Teste da Tela de Login', () => {
  it('Testa funcionalidades Campo EMAIL e SENHA', () => {
    const { history } = renderWithRouterAndRedux(<App />, ['/']);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByText('Entrar');
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('disabled');

    userEvent.type(email, EMAIL);
    userEvent.type(password, PASSWORD);
    expect(button).not.toHaveAttribute('disabled');

    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');

    const emailField = screen.getByTestId('email-field');
    const totalField = screen.getByTestId('total-field');
    const currencyField = screen.getByTestId('header-currency-field');
    expect(emailField).toBeInTheDocument();
    expect(totalField).toBeInTheDocument();
    expect(currencyField).toBeInTheDocument();
    expect(emailField).toHaveTextContent('test@test.com');
    expect(totalField).toHaveTextContent('0.00');
  });
  it('Testa funcionalidades no componente WalletForm', () => {
    renderWithRouterAndRedux(<WalletForm />, ['/carteira']);

    expect(screen.getByTestId('value-input')).toBeInTheDocument();
    expect(screen.getByTestId('description-input')).toBeInTheDocument();
    expect(screen.getByTestId('currency-input')).toBeInTheDocument();
    expect(screen.getByTestId('currency-input')).toHaveLength(0);
    expect(screen.getByTestId('method-input')).toBeInTheDocument();
    expect(screen.getByTestId('tag-input')).toBeInTheDocument();
    expect(screen.getByText('Adicionar despesa')).toBeInTheDocument();
  });
  it('', () => {});
  it('', () => {});
  it('', () => {});
  it('', () => {});
  it('', () => {});
  it('', () => {});
});

describe('', () => {
  it('', () => {});
  it('', () => {});
  it('', () => {});
  it('', () => {});
  it('', () => {});
});
