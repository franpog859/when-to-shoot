import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders components', () => {
  // given
  const { getByTestId } = render(<App />);

  // when
  const adElement = getByTestId(/Ad/i);
  const signElement = getByTestId(/Sign/i);
  const footerElement = getByTestId(/Footer/i);

  // then
  expect(adElement).toBeInTheDocument();
  expect(signElement).toBeInTheDocument();
  expect(footerElement).toBeInTheDocument();
});
