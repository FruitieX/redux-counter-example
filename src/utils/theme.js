import createPalette from 'material-ui/styles/palette';
import {
  blue,
  orange,
  red,
} from 'material-ui/styles/colors';

export default {
  // App spacing config. Sets the size of various components.
  spacing: {
    unit: 8,
  },

  // App color palette
  palette: createPalette({
    primary: blue,
    accent: orange,
    error: red,
    type: 'light',
  }),
};
