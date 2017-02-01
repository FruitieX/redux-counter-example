import React, { Component, PropTypes } from 'react';
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
    background: `linear-gradient(${theme.palette.primary1Color}, ${theme.palette.primary2Color})`
  },
  card: {
    margin: theme.spacing.desktopGutter,
    flex: 1,
    flexBasis: '450px'
  }
};

class HomeCard extends Component {
  render() {
    return(
      <Card style={styles.card}>
        <CardMedia
          overlay={
            <CardTitle
              title={ this.props.title }
              subtitle={ this.props.subtitle } />
          }
        >
          <div style={styles.headerBackground} />
        </CardMedia>
        <CardText>
          { this.props.children }
        </CardText>
      </Card>
    );
  }
};

HomeCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default HomeCard;
