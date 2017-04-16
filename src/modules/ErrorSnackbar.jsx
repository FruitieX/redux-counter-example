// Disable prop type checking in modules
/* eslint-disable react/prop-types */

import React from 'react';

// Snackbar component not yet available in material-ui@next
/* eslint-disable import/no-extraneous-dependencies */
import Snackbar from 'material-ui-old/Snackbar';
/* eslint-enable import/no-extraneous-dependencies */

import { connect } from 'react-redux';
import {
  createAction,
  createReducer,
} from 'redux-act';

const mapStateToProps = state => ({
  err: state.err,
});

@connect(mapStateToProps)
export default class ErrorSnackbar extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      id: -1,
      message: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.err.id !== this.state.id) {
      this.setState({
        open: true,
        message: nextProps.err.msg,
        id: nextProps.err.id,
      });
    }
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { open, message } = this.state;

    return (<Snackbar
      open={open}
      message={message}
      autoHideDuration={4000}
      onRequestClose={this.handleRequestClose}
    />);
  }
}

// Action creators
export const showError = createAction('Show error message');

// Initial state
const initialState = {
  err: '',
  id: -1,
};

// Reducer
export const reducer = createReducer({
  [showError]: (state, payload) => ({
    msg: payload,
    id: state.id + 1,
  }),
}, initialState);
