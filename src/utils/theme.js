import * as Colors from 'material-ui/styles/colors';
import * as ColorManipulator from 'material-ui/utils/colorManipulator';

export default {
  // Spacing config of app. Sets the size of various components.
  spacing: {
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

  /*
  Palette of the app. Colors can be supplied as:
    - material-ui color codes (http://www.material-ui.com/#/customization/colors):
        Colors.green300
    - HTML hex color codes:
        '#123456'
    - RGBA colors:
        'rgba(255, 255, 255, 1) '
  */
  palette: {
    primary1Color: Colors.green600,
    primary2Color: Colors.green300,
    primary3Color: Colors.grey700,
    accent1Color: Colors.red600,
    accent2Color: Colors.grey200,
    accent3Color: Colors.grey600,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.grey50,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.yellow500,
    clockCircleColor: ColorManipulator.fade(Colors.darkBlack, 0.07),
    shadowColor: Colors.fullBlack,
  },
};
