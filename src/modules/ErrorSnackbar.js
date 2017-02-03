import React from 'react';
import Snackbar from 'material-ui/Snackbar';

class ErrorSnackbar extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      id: -1,
      message: '',
    }
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.err.id !== this.state.id) {
      this.setState({
        open: true,
        message: nextProps.err.msg,
        id: nextProps.err.id,
      })
    }
  }

  render() {
    const { open, message } = this.state;

    return (<Snackbar
      open={ open }
      message={ message }
      autoHideDuration={ 4000 }
      onRequestClose={ this.handleRequestClose }
    />)
  }
}

import { connect } from 'react-redux';

export default connect(
  (state, ownProps) => ({
    err: state.err
  }),
  (dispatch) => ({
  })
)(ErrorSnackbar);

import {
  createAction,
  createReducer
} from 'redux-act';

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
