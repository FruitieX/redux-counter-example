import createPalette from 'material-ui/styles/palette';
import { indigo, pink, grey, red, blue, orange, black, white, green, lightGreen, deepOrange } from 'material-ui/styles/colors';

import * as Colors from 'material-ui-old/styles/colors';
import * as ColorManipulator from 'material-ui-old/utils/colorManipulator';

export default {
  // Spacing config of app. Sets the size of various components.
  spacing: {
    // New material-ui
    unit: 8,

    // Old material-ui
    iconSize: 24,
    desktopGutter: 24,
    desktopGutterMore: 32,
    desktopGutterLess: 16,
    desktopGutterMini: 8,
    desktopKeylineIncrement: 64,
    desktopDropDownMenuItemHeight: 32,
    desktopDropDownMenuFontSize: 15,
    desktopDrawerMenuItemHeight: 48,
    desktopSubheaderHeight: 48,
    desktopToolbarHeight: 56,
  },

  // Font config of app. Font must be included in `webpack/template.html`
  fontFamily: 'Roboto, sans-serif',

  palette: createPalette({
    primary: blue,
    accent: orange,
    error: red,
    type: 'light',
  }),

  /*
  Palette of the app. This is used by the old version of material-ui. Colors can be supplied as:
    - material-ui color codes (http://www.material-ui.com/#/customization/colors):
        Colors.green300
    - HTML hex color codes:
        '#123456'
    - RGBA colors:
        'rgba(255, 255, 255, 1) '
  */
  legacyPalette: {
    primary1Color: green[600],
    primary2Color: green[300],
    primary3Color: grey[700],
    accent1Color: red[600],
    accent2Color: grey[200],
    accent3Color: grey[600],
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: grey[50],
    borderColor: grey[300],
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.yellow500,
    clockCircleColor: ColorManipulator.fade(Colors.darkBlack, 0.07),
    shadowColor: Colors.fullBlack,
  },
};
