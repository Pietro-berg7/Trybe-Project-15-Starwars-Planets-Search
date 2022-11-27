import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import planetsMock from './mock/planetsMock';

const mock = () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(planetsMock),
  });
};

describe('Testes da API', () => {
  it('Teste se é feita uma requisição à API', async () => {
    mock();
    await act(async () => {
      render(<App />);
    });
    expect(global.fetch).toHaveBeenCalled();
  });
});

describe('Testes do componente NameFilter', () => {
  it('Filtre um planeta pelo nome', async () => {
    mock();
    render(<App />);
    const nameInput = screen.getByTestId('name-filter');
    userEvent.type(nameInput, 'dagobah');
    await screen.findByRole('cell', { name: /dagobah/i });
  });

  it('Filtre os planetas que possuem a letra "oo" no nome', async () => {
    mock();
    render(<App />);
    const nameInput = screen.getByTestId('name-filter');
    userEvent.type(nameInput, 'oo');
    await screen.findByRole('cell', { name: /tatooine/i });
    await screen.findByRole('cell', { name: /naboo/i });
  });
});

describe('Testes do componente NumberFilter', () => {
  it('Filtre os planetas que possuem a população menor que 200000', async () => {
    mock();
    await act(async () => {
      render(<App />);
    });
    const numberInput = screen.getByTestId('value-filter');
    const button = screen.getByTestId('button-filter');

    userEvent.selectOptions(
      screen.getByTestId('column-filter'),
      screen.getByRole('option', { name: 'population' }),
    );
    userEvent.selectOptions(
      screen.getByTestId('comparison-filter'),
      screen.getByRole('option', { name: 'menor que' }),
    );
    userEvent.type(numberInput, '200000');
    userEvent.click(button);

    const result = screen.getByTestId('name-cell');
    expect(result.innerHTML).toBe('Yavin IV');
  });

  it('Filtre os planetas que possuem a população maior que 100000000000', async () => {
    mock();
    await act(async () => {
      render(<App />);
    });
    const numberInput = screen.getByTestId('value-filter');
    const button = screen.getByTestId('button-filter');

    userEvent.selectOptions(
      screen.getByTestId('column-filter'),
      screen.getByRole('option', { name: 'population' }),
    );
    userEvent.selectOptions(
      screen.getByTestId('comparison-filter'),
      screen.getByRole('option', { name: 'maior que' }),
    );
    userEvent.type(numberInput, '100000000000');
    userEvent.click(button);

    const result = screen.getByTestId('name-cell');
    expect(result.innerHTML).toBe('Coruscant');
  });

  it('Filtre os planetas que possuem a população maior que 200000', async () => {
    mock();
    await act(async () => {
      render(<App />);
    });
    const numberInput = screen.getByTestId('value-filter');
    const button = screen.getByTestId('button-filter');

    userEvent.selectOptions(
      screen.getByTestId('column-filter'),
      screen.getByRole('option', { name: 'population' }),
    );
    userEvent.selectOptions(
      screen.getByTestId('comparison-filter'),
      screen.getByRole('option', { name: 'igual a' }),
    );
    userEvent.type(numberInput, '200000');
    userEvent.click(button);

    const result = screen.getByTestId('name-cell');
    expect(result.innerHTML).toBe('Tatooine');
  });
});
