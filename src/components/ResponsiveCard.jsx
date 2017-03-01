import React, { PropTypes } from 'react';
import stylePropType from 'react-style-proptype';
import { Card } from 'material-ui/Card';

import theme from '../utils/theme';

const cardStyles = {
  margin: theme.spacing.desktopGutter,
  flex: 1,
  flexBasis: 380,
};

const ResponsiveCard = ({ children, style, ...rest }) => (
  <Card style={{ ...cardStyles, ...style }} {...rest} >
    {children}
  </Card>
);

ResponsiveCard.propTypes = {
  children: PropTypes.node,
  style: stylePropType,
};

ResponsiveCard.defaultProps = {
  children: null,
  style: {},
};

export default ResponsiveCard;
