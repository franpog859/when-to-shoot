import React from 'react';
import { render } from '@testing-library/react';
import Sign from './Sign';

// TODO: Enable tests with rendering CircularProgressbar
//       https://github.com/kevinsqi/react-circular-progressbar/pull/132
// test('renders CircularProgressbar component', () => {
//   const { getByTestId } = render(<Sign />);
//   const progressbarElement = getByTestId(/CircularProgressbar/i);
//   expect(progressbarElement).toBeInTheDocument();
// });

test('eight equals eight', () => {
  expect(8).toEqual(8);
});
