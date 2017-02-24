import React, { PropTypes } from 'react';
import theme from '../utils/theme';

const styles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: theme.spacing.desktopGutter,
  },
};

const CardWrapper = ({ children }) => (
  <div style={styles.wrapper}>
    {children}
  </div>
);

CardWrapper.propTypes = {
  children: PropTypes.node,
};

CardWrapper.defaultProps = {
  children: null,
};

export default CardWrapper;
