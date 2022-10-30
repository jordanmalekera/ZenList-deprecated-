import * as React from 'react';
import renderer from 'react-test-renderer';

import { OpenSansText } from '../StyledText';

it(`renders correctly`, () => {
  const tree = renderer.create(<OpenSansText>Snapshot test!</OpenSansText>).toJSON();

  expect(tree).toMatchSnapshot();
});
