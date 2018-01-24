import React from 'react';

import Card, { CardContent, CardActions, CardMedia } from 'material-ui/Card';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import CardGridWrapper from '../components/CardGridWrapper';

import theme from '../utils/theme';

import chilicorn from '../assets/chilicorn/chilicorn_no_text-256.png';
import placeholder from '../assets/placeholder.png';
import styled from 'styled-components';

const Counter = styled.div`
  font-size: 32px;
  font-family: Roboto;
`;

/*
 * React
 */
class ReactCounter extends React.Component {
  state = { value: 0 };

  increment = () => this.setState(state => ({
    value: state.value + 1
  }));
  decrement = () => this.setState(state => ({
    value: state.value - 1
  }));

  render = () => <div>
    <Counter>{ this.state.value }</Counter>
    <Button onClick={this.increment}>
      Increment
    </Button>
    <Button onClick={this.decrement}>
      Decrement
    </Button>
  </div>;
};

/*
 * Redux
 *
 * NOTE: Often you may want to put actions & reducer in a separate file
 */

 // Actions
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });

const initialState = { value: 0 };
export const reducer = (state = initialState, action) => {
  if (action.type === INCREMENT) {
    return { ...state, value: state.value + 1 };
  } else if (action.type === DECREMENT) {
    return { ...state, value: state.value - 1 };
  }

  // Otherwise, don't touch state (by returning current state)
  return state;
}

const mapStateToProps = state => ({
  value: state.counter.value
});
const mapDispatchToProps = dispatch => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement()),
});

class ReduxCounter extends React.Component {
  render = () => <div>
    <Counter>{ this.props.value }</Counter>
    <Button onClick={this.props.increment}>
      Increment
    </Button>
    <Button onClick={this.props.decrement}>
      Decrement
    </Button>
  </div>;
};

const ConnectedReduxCounter = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxCounter);

export default class Home extends React.Component {
  renderReactCounter = () => (
    <Card>
      <CardContent>
        <Typography type="headline" component="h2">
          React Counter
        </Typography>
        <ReactCounter />
      </CardContent>
    </Card>
  );

  renderReduxCounter = () => (
    <Card>
      <CardContent>
        <Typography type="headline" component="h2">
          Redux Counter
        </Typography>
        <ConnectedReduxCounter />
      </CardContent>
    </Card>
  );

  render() {
    return (
      <CardGridWrapper>
        {this.renderReactCounter()}
        {this.renderReduxCounter()}
      </CardGridWrapper>
    );
  }
}
