import React, { PropTypes } from 'react';
import {
  Card,
  CardText,
  CardTitle,
  CardMedia,
} from 'material-ui/Card';

import theme from '../utils/theme';

const styles = {
  headerBackground: {
    height: 240,
    background: theme.palette.primary1Color,
  },
  card: {
    margin: theme.spacing.desktopGutter,
    flex: 1,
    flexBasis: '450px',
  },
};

const HomeCard = ({ title, subtitle, children }) => (
  <Card style={styles.card}>
    <CardMedia
      overlay={
        <CardTitle
          title={title}
          subtitle={subtitle}
        />
      }
    >
      <div style={styles.headerBackground} />
    </CardMedia>
    <CardText>
      { children }
    </CardText>
  </Card>
);

HomeCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
};

HomeCard.defaultProps = {
  title: null,
  subtitle: null,
  children: null,
};

export default HomeCard;
