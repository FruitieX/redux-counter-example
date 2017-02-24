import React, { PropTypes } from 'react';
import stylePropType from 'react-style-proptype';
import { Card } from 'material-ui/Card';

import theme from '../utils/theme';

const cardStyles = {
  margin: theme.spacing.desktopGutter,
  flex: 1,
  flexBasis: 380,
};

const ResponsiveCard = ({ children, styles, ...rest }) => (
  <Card style={{ ...cardStyles, ...styles }} {...rest} >
    {children}
  </Card>
);

ResponsiveCard.propTypes = {
  children: PropTypes.node,
  styles: stylePropType,
};

ResponsiveCard.defaultProps = {
  children: null,
  styles: {},
};

export default ResponsiveCard;
