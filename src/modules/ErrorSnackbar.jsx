import React from 'react';
import Snackbar from 'material-ui-old/Snackbar';

import { connect } from 'react-redux';
import {
  createAction,
  createReducer,
} from 'redux-act';

class ErrorSnackbar extends React.Component {
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

export default connect(
  state => ({
    err: state.err,
  }),
)(ErrorSnackbar);

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
