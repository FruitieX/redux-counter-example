import { Component } from 'react';

import {
  Card,
  CardText,
  CardTitle,
} from 'material-ui/Card';

import theme from '../utils/theme';

const styles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: theme.spacing.desktopGutter,
  },
  card: {
    margin: theme.spacing.desktopGutter,
    flex: 1,
    flexBasis: '450px',
  }
};

class Preferences extends Component {
  render() {
    return(
      <div style={styles.wrapper}>
        <Card style={styles.card}>
          <CardTitle
            title='Hello world!' />
          <CardText>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc turpis leo, ultrices et mollis ac, eleifend ut ligula. Aenean porttitor ullamcorper urna, ac tincidunt justo hendrerit dapibus. Quisque dapibus posuere consequat. Pellentesque tristique, ex non rutrum consectetur, lacus nulla tempor odio, quis consequat diam ipsum quis erat.</p>
            <p>Donec est ante, efficitur eget cursus id, viverra sit amet diam.</p>
            <ul>
              <li>Nulla facilisi.</li>
              <li>Curabitur faucibus, nibh mollis porttitor mollis, tellus ligula blandit erat, sit amet tempor magna ligula vitae massa.</li>
              <li>Sed turpis leo, sodales auctor ex quis, vehicula iaculis augue. Donec condimentum consequat augue, in bibendum nisl cursus vulputate. Aenean faucibus ex nec ligula euismod, et euismod magna eleifend.</li>
            </ul>
          </CardText>
        </Card>
      </div>
    );
  }
}

import { connect } from 'react-redux';

export default connect(
  (state) => ({}),
  (dispatch) => ({}),
)(Preferences);
